<template>
  <div id="results" class="box">

    <div class="has-centered-text">
      <div class="content has-text-centered">
        <h4 class="title is-4">Results: {{this.resultCount}}</h4>
      </div>
    </div>

    <div class="columns" v-if="messages.error">
      <div class="column">
        <div class="notification is-danger" >
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
          <a class="button is-success is-outlined" @click="showDownloadModal = true">
            <span class="icon">
              <i class="fa fa-download"></i>
            </span>
            <span>Download</span>
          </a>
        </div>
      </nav>

      <pagination
        :current="currentPage"
        :total="resultCount"
        :itemsPerPage="perPage"
        :onChange="onPageChange">
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
                <template v-if="column.value === 'id' && type !== 'groups'">
                  <a target="blank" :href="result.url" >{{result[column.value]}}</a>
                </template>
                <template v-else>{{result[column.value]}}</template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <pagination
        :current="currentPage"
        :total="resultCount"
        :itemsPerPage="perPage"
        :onChange="onPageChange">
      </pagination>

    </div>

    <download-modal
      :show="showDownloadModal"
      :onClose="() => showDownloadModal = false"
      :url="url">
    </download-modal>

  </div>
</template>

<script>
import DownloadModal from './DownloadModal.vue'
import Pagination from 'vue-2-bulma-pagination'
import bus from '../../common/bus.js'
import config from '../../common/config.js'
import Sideload from '../../common/sideload.js'

export default {
  name: 'results',
  props: {
    columns: {
      default: () => [],
      type: Array
    },
    results: {
      default: () => [],
      type: Array
    },
    type: {
      type: String
    },
    resultCount: {
      type: Number,
      default: 0
    },
    perPage: {
      type: Number,
      default: 30
    },
    onDelete: {
      type: Function
    },
    onResultsChange: {
      type: Function
    }
  },
  data () {
    return {
      selected: [],
      messages: {
        error: ''
      },
      showDownloadModal: false,
      showWarningModal: false,
      currentPage: 1,
      url: '',
      isSearch: false
    }
  },
  components: { DownloadModal, Pagination },
  computed: {
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
      this.messages.error = ''
    }
  },
  methods: {
    deleteSelected () {
      mixpanel.track(`Deleting type: ${this.type}.`)
      this.showWarningModal = false

      this.onDelete(this.selected)
      this.selected = []
    },
    onPageChange (page) {
      mixpanel.track(`Fetching new page of results.`)
      let url = this.url + (this.isSearch ? `&page=${page}` : `?page=${page}`)
      client.request({
        type: 'GET',
        url: url
      }).then(data => {
        this.currentPage = page
        if (data.hasOwnProperty(this.type)) this.onResultsChange(data[this.type])
        else this.onResultsChange(data.results)
      }).catch(error => {
        this.messages.error = error
      })
    },
    toggleWarningModal () {
      this.showWarningModal = !this.showWarningModal
    }
  },
  mounted () {
    bus.$on('url', url => this.url = url)
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
