<template>
  <div id="results" v-if="complete" class="box">

    <div class="has-centered-text">
      <heading>
        <h4 slot="header" class="title is-4">{{this.pagination.total}} Result(s)</h4>
      </heading>
    </div>

    <div class="columns">
      <div class="column">
        <div class="notification is-success" v-if="messages.success">
          <button class="delete" @click="messages.success = ''"></button>
            {{messages.success}}
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <div class="notification is-danger" v-if="messages.error">
          <button class="delete" @click="messages.error = ''"></button>
            {{messages.error}}
        </div>
      </div>
    </div>

    <div class="modal" :class="{'is-active': showWarningModal}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <section class="modal-card-body">
          Are you sure you want to continue?
        </section>
        <footer class="modal-card-foot">
          <a class="button is-warning" @click="deleteSelected">Continue</a>
          <a class="button" @click="toggleWarningModal">Cancel</a>
        </footer>
      </div>
    </div>

    <div v-if="results.length">

      <nav class="level">
        <div class="level-left">
          <div class="level-item">
            <a class="button is-danger is-outlined" :disabled="deleteDisabled" @click="toggleWarningModal">
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

      <pagination
        :current="pagination.current"
        :total="pagination.total"
        :itemsPerPage="pagination.itemsPerPage"
        :onChange="onChange">
      </pagination>

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
                <template v-if="column.value === 'id' && type !== 'groups' && type !== 'group'">
                  <a target="blank" :href="result.url" >{{result[column.value]}}</a>
                </template>
                <template v-else>{{result[column.value]}}</template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <pagination
        :current="pagination.current"
        :total="pagination.total"
        :itemsPerPage="pagination.itemsPerPage"
        :onChange="onChange">
      </pagination>

    </div>
  </div>
</template>

<script>
import Heading from './Heading.vue'
import Pagination from 'vue-2-bulma-pagination'
import bus from '../bus.js'
import config from '../config.js'
import Sideload from '../sideload.js'

let pagination = {
  current: 1,
  total: 0,
  itemsPerPage: 100
}

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
      selected: [],
      messages: {
        success: '',
        error: ''
      },
      showWarningModal: false,
      pagination: pagination,
      url: '',
      isSearch: false
    }
  },
  components: { Heading, Pagination },
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
      this.complete = false
      this.messages.success = ''
      this.messages.error = ''
    }
  },
  methods: {
    buildUrl (result) {
      let base = `https://${config.currentAccount.subdomain}.zendesk.com`
      if (this.type === 'articles') return `${base}/hc/articles/${result.id}-${result.title.split(' ').join('-')}`
      if (this.type === 'organizations') return `${base}/agent/organizations/${result.id}`
      if (this.type === 'tickets') return `${base}/agent/tickets/${result.id}`
      if (this.type === 'users') return `${base}/agent/users/${result.id}`
      return `${base}/agent/admin/${this.type}/${result.id}`
    },
    deleteSelected () {
      this.showWarningModal = false
      // Delete articles
      if (this.type === 'article') {
        let deleteSelectedPromise = new Promise((resolve, reject) => {
          let count = 0
          this.selected.forEach((id) => {
            client.request({
              url: `/api/v2/help_center/articles/${id}.json`,
              method: 'DELETE'
            }).then(() => {
              count += 1
              this.results = this.results.filter((result) => {
                return result.id !== id
              })
              if (count === this.selected.length) {
                if (count > 1) this.messages.success = `${count} articles have been archived.`
                else this.messages.success = `${count} article has been archived.`
                this.selected = []
              }
            })
          })
        })
      } else if (this.type !== 'group') {
        // Bulk deletions
        if (this.type.substr(this.type.length-1) !== 's') this.type += 's'  // pluralize
        let count = this.selected.length
        this.selected.forEach((id) => {
          client.request({
            url: `/api/v2/${this.type}/destroy_many.json?ids=${this.selected.join(',')}`,
            method: 'DELETE'
          }).then(() => {
            this.results = this.results.filter((result) => {
              return !this.selected.includes(result.id)
            })
            if (count > 1) this.messages.success = `${count} ${this.type} have been deleted.`
            else this.messages.success = `${count} ${this.type.slice(0, -1)} has been deleted.`
            this.selected = []
          })
        })
      } else {
        // Single delete (group only)
        let deleteSelectedPromise = new Promise((resolve, reject) => {
          let count = 0
          this.selected.forEach((id) => {
            client.request({
              url: `/api/v2/groups/${id}.json`,
              method: 'DELETE'
            }).then(() => {
              count += 1
              this.results = this.results.filter((result) => {
                return result.id !== id
              })
              if (count === this.selected.length) {
                if (count > 1) this.messages.success = `${count} groups have been deleted.`
                else this.messages.success = `${count} group has been deleted.`
                this.selected = []
              }
            })
          })
        })
      }
    },
    format (results) {
      console.log(`Displaying ${results.length} results.`)
      return new Promise((resolve, reject) => {
        // Basic formatting
        results.forEach((result, index) => {
          for (let key in result) {
            if (key === 'id') result.url = this.buildUrl(result)
            if (['actions', 'restriction', 'execution', 'conditions'].includes(key)) result[key] = JSON.stringify(result[key])  // format array of objects
            if (key === 'custom_fields') {
              result[key].map(customField => {
                result[`custom_field_${customField.id}`] = customField.value
              })
            }
            if (Array.isArray(result[key])) result[key] = result[key].join(', ')
            if (key === 'created_at' || key === 'updated_at') result[key] = new Date(result[key]).toLocaleString()
          }
        })

        // Sideloading, if enabled
        if (config.settings.sideloads && results.length) {
          console.log("Sideloading enabled.")
          let sideloadableColumns = []
          for (let column of this.columns) {
            if (column.selected && column.hasOwnProperty('sideload')) {
              sideloadableColumns.push(column)
            }
          }
          console.log("Starting Sideload.replaceIdsWithNames.")
          Sideload.replaceIdsWithNames(results, sideloadableColumns).then(results => {
            console.log("Resolving promise in processResults.")
            resolve(results)
          }).catch(error => {
            this.messages.error = error
            reject()
          })
        } else {
          resolve(results)
        }
      })
    },
    onChange (page) {
      let url = this.url + (this.isSearch ? `&page=${page}` : `?page=${page}`)
      client.request({
        type: 'GET',
        url: url
      }).then(data => {
        if (data.hasOwnProperty(this.type)) this.results = data[this.type]
        else this.results = data.results
        this.pagination.current = page
      }).catch(error => {
        this.messages.error = error
      })
    },
    toggleWarningModal () {
      this.showWarningModal = !this.showWarningModal
    }
  },
  created () {
    bus.$on('results-fetched', (results, type, url = '', itemsPerPage = 30, total = null, search = false) => {
      this.type = type
      this.format(results).then(results => {
        this.results = results
        this.isSearch = search
        this.url = url
        this.complete = true
        this.pagination.current = 1
        this.pagination.itemsPerPage = itemsPerPage
        this.pagination.total = total
      })
    })
  }
}
</script>

<style scoped>
#table-scroll {
  overflow: auto;
  white-space: pre;
  width: 100%;
  margin-bottom: 15px;
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
#pagination {
  margin-bottom: 15px;
}
</style>
