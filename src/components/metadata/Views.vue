<template>
  <div id="views">

    <div class="content has-text-centered">
      <h4 class="title is-4">Views</h4>
    </div>

    <div class="columns">
      <div class="column">
        <column-selection :columns="columns"></column-selection>
      </div>
    </div>

    <search type="views" :onFetch="onFetch"/>

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
          type="views"
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
import ColumnSelection from '../shared/ColumnSelection.vue'
import Search from './shared/Search.vue'
import Results from '../shared/Results.vue'
import bus from '../../common/bus.js'
import columns from '../../common/columns.js'
import format from '../../common/format.js'

export default {
  name: 'views',
  components: {
    ColumnSelection,
    Search,
    Results
  },
  data () {
    return {
      columns: columns.viewColumns,
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
      format(results, 'macros', this.columns).then(results => {
        this.results = results
        this.resultCount = resultCount
        this.perPage = 100
      })
    },
    onDelete (ids) {
      let count = ids.length
      ids.forEach((id) => {
        client.request({
          url: `/api/v2/macros/destroy_many.json?ids=${ids.join(',')}`,
          method: 'DELETE'
        }).then(() => {
          this.resultCount--
          this.results = this.results.filter((result) => {
            return !ids.includes(result.id)
          })
          if (count > 1) this.messages.success = `${count} macros have been deleted.`
          else this.messages.success = `${count} macros has been deleted.`
        })
      })
    },
    onResultsChange (results) {
      format(results, 'views', this.columns).then(results => {
        this.results = results
      })
    }
  },
  mounted () {
    let url = '/api/v2/views.json'
    bus.$emit('url', url)
    client.request(url).then(data => {
      format(data.views, 'views', this.columns).then(results => {
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
