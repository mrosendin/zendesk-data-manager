<template>
  <div id="results" v-if="complete" class="box">

    <div class="has-centered-text">
      <heading>
        <h4 slot="header" class="title is-4">{{count}} Result(s)</h4>
      </heading>
    </div>

    <div v-if="results.length">

      <nav class="level">
        <div class="level-left">
          <div class="level-item">
            <a class="button is-danger is-outlined" :disabled="deleteDisabled" @click="deleteSelected">
              <span>Delete</span>
              <span class="icon is-small">
                <i class="fa fa-times"></i>
              </span>
            </a>
          </div>
        </div>

        <div class="level-right">
          <a class="button is-success is-outlined">
            <span class="icon">
              <i class="fa fa-download"></i>
            </span>
            <span>Download</span>
          </a>
        </div>
      </nav>

      <div id="table-scroll">
        <table class="table is-bordered">
          <thead>
            <tr>
              <th><input type="checkbox" v-model="selectAll"></th>
              <th v-for="column in columns" v-if="column.selected">{{column.name}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="result in results">
              <td><input type="checkbox" v-model="selected" :value="result.id" number></td>
              <td v-for="column in columns" v-if="column.selected">
                <template v-if="column.value === 'id' && type !== 'group'">
                  <a target="blank" :href="buildUrl(result)" >{{result[column.value]}}</a>
                </template>
                <template v-else>{{result[column.value]}}</template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>
</template>

<script>
import Heading from './Heading.vue'
import bus from '../bus.js'
import config from '../config.js'

export default {
  name: 'results',
  props: {
    columns: {
      default: () => [],
      type: Array
    }
  },
  data () {
    return {
      results: [],
      complete: false,
      selected: []
    }
  },
  components: {
    Heading
  },
  computed: {
    count () {
      return this.results.length
    },
    selectAll: {
      get () {
        return this.results ? this.selected.length === this.results.length : false;
      },
      set (value) {
        let selected = []
        if (value) this.results.forEach((result) => selected.push(result.id))
        this.selected = selected
      }
    },
    deleteDisabled () {
      return this.selected.length === 0
    }
  },
  watch: {
    '$route' () {
      console.log('Route changed. Setting complete to false.')
      this.complete = false
    }
  },
  methods: {
    buildUrl (result) {
      console.log('Method call to buildUrl()')
      let base = `https://${config.currentAccount.subdomain}.zendesk.com`
      if (this.type === 'article') return `${base}/hc/articles/${result.id}-${result.title.split(' ').join('-')}`
      if (this.type === 'organization') return `${base}/agent/organizations/${result.id}`
      if (this.type === 'ticket') return `${base}/agent/tickets/${result.id}`
      if (this.type === 'user') return `${base}/agent/users/${result.id}`
      return `${base}/agent/admin/${this.type}/${result.id}`
    },
    deleteSelected () {
      console.log('Method call to deleteSelected()')
    }
  },
  created () {
    bus.$on('results-fetched', (results, type) => {
      this.results = results
      this.type = type
      this.complete = true
      console.log(this.results)
    })
  }
}
</script>

<style scoped>
#table-scroll {
  overflow: auto;
  white-space: pre;
  width: 100%;
}
table tr {
  white-space: nowrap;
}
.fa-circle-o-notch {
  color: #00D1B2;
}
.box {
  margin-bottom: 15px;
}
</style>
