<template>
  <div id="groups">

    <div class="box">
      <div class="content has-text-centered">
        <h4 class="title is-4">Group Filters</h4>
      </div>

      <div class="columns">
        <div class="center-inline-filters">
          <date-filter></date-filter>
        </div>
      </div>

      <div class="columns">
        <div class="column is-4 is-offset-4">
          <div class="field">
            <label class="label">Name</label>
            <p class="control">
              <input class="input" type="text" v-model="filters.name">
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <column-selection :columns="columns"></column-selection>
      </div>
    </div>

    <advanced-search type="group" :filters="filters" :onFetch="onFetch"></advanced-search>

    <div class="columns" v-if="messages.success">
      <div class="column">
        <div class="notification is-success">
          <button class="delete" @click="messages.success = ''"></button>
            {{messages.success}}
        </div>
      </div>
    </div>

    <div class="columns" v-if="messages.error">
      <div class="column">
        <div class="notification is-danger">
          <button class="delete" @click="messages.error = ''"></button>
            {{messages.error}}
        </div>
      </div>
    </div>

    <div class="columns results">
      <div class="column">
        <results :columns="this.columns"
          :results="results"
          type="groups"
          :resultCount="resultCount"
          :perPage="perPage"
          :onDelete="onDelete"
          :onResultsChange="onResultsChange"
          :isSearch="isSearch">
        </results>
      </div>
    </div>
  </div>
</template>

<script>
import DateFilter from './filters/DateFilter.vue'
import ColumnSelection from '../shared/ColumnSelection.vue'
import AdvancedSearch from './shared/AdvancedSearch.vue'
import Results from '../shared/Results.vue'
import bus from '../../common/bus.js'
import columns from '../../common/columns.js'
import format from '../../common/format.js'

export default {
  name: 'groups',
  components: {
    DateFilter,
    ColumnSelection,
    Results,
    AdvancedSearch
  },
  data () {
    return {
      columns: columns.groupColumns,
      results: [],
      resultCount: 0,
      perPage: 100,
      messages: {
        success: '',
        error: ''
      },
      isSearch: false,
      filters: {
        name: ''
      }
    }
  },
  methods: {
    onFetch (results, resultCount) {
      this.isSearch = true
      format(results, 'groups', this.columns).then(results => {
        this.results = results
        this.resultCount = resultCount
        this.perPage = 100
      })
    },
    onDelete (ids) {
      let deleteSelectedPromise = new Promise((resolve, reject) => {
        let count = 0
        ids.forEach((id) => {
          client.request({
            url: `/api/v2/groups/${id}.json`,
            method: 'DELETE'
          }).then(() => {
            this.resultCount--
            count += 1
            this.results = this.results.filter((result) => {
              return result.id !== id
            })
            if (count === ids.length) {
              if (count > 1) this.messages.success = `${count} groups have been deleted.`
              else this.messages.success = `${count} group has been deleted.`
            }
          })
        })
      })
    },
    onResultsChange (results) {
      format(results, 'groups', this.columns).then(results => {
        this.results = results
      }).catch(error => {
        console.log(error)
      })
    }
  },
  mounted () {
    let url = '/api/v2/groups.json'
    bus.$emit('url', url)
    client.request(url).then(data => {
      format(data.groups, 'groups', this.columns).then(results => {
        this.results = results
        this.resultCount = data.count
        this.perPage = 100
      })
    }).catch(error => {
      console.log(error)
    })
  }
}
</script>
