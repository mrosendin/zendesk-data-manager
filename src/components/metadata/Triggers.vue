<template>
  <div id="triggers">

    <div class="content has-text-centered">
      <h4 class="title is-4">Triggers</h4>
    </div>

    <div class="columns">
      <div class="column">
        <column-selection :columns="columns"></column-selection>
      </div>
    </div>

    <search type="triggers" :onFetch="onFetch"/>

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
          type="triggers"
          :resultCount="resultCount"
          :perPage="perPage"
          :onDelete="onDelete">
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
  name: 'triggers',
  components: {
    ColumnSelection,
    Search,
    Results
  },
  data () {
    return {
      columns: columns.triggerColumns,
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
  },
  mounted () {
    client.request('/api/v2/triggers.json').then(data => {
      format(data.triggers, 'triggers', this.columns).then(results => {
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
