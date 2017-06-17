<template>
  <div id="articles">

    <div class="box">
      <div class="content has-text-centered">
        <h4 class="title is-4">Article Filters</h4>
      </div>

      <div class="columns">
        <div class="center-inline-filters">
          <date-filter></date-filter>
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <column-selection :columns="columns"></column-selection>
      </div>
    </div>

    <advanced-search type="article" :onFetch="onFetch"></advanced-search>

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
        <results :columns="columns"
          :results="results"
          type="articles"
          :resultCount="resultCount"
          :perPage="perPage"
          :onDelete="onDelete"
          :onResultsChange="onResultsChange">
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
  name: 'articles',
  components: { DateFilter, ColumnSelection, AdvancedSearch, Results },
  data () {
    return {
      columns: columns.articleColumns,
      results: [],
      resultCount: 0,
      perPage: 30,
      messages: {
        success: '',
        error: ''
      }
    }
  },
  methods: {
    onFetch (results, resultCount) {
      format(results, 'articles', this.columns).then(results => {
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
            url: `/api/v2/help_center/articles/${id}.json`,
            method: 'DELETE'
          }).then(() => {
            this.resultCount--
            count += 1
            this.results = this.results.filter((result) => {
              return result.id !== id
            })
            if (count === ids.length) {
              if (count > 1) this.messages.success = `${count} articles have been archived.`
              else this.messages.success = `${count} article has been archived.`
            }
          })
        })
      })
    },
    onResultsChange (results) {
      format(results, 'articles', this.columns).then(results => {
        this.results = results
      })
    }
  },
  mounted () {
    let url = '/api/v2/help_center/articles.json'
    bus.$emit('url', url)
    client.request(url).then(data => {
      format(data.articles, 'articles', this.columns).then(results => {
        this.results = results
        this.resultCount = data.count
        this.perPage = 30
      })
    }).catch(error => {
      console.log(error)
    })
  }
}
</script>
