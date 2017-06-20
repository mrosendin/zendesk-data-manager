<template>
  <div id="download-modal">
    <div :class="['modal', { 'is-active': show }]">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Download</p>
          <button class="delete" @click="onClose"></button>
        </header>
        <section class="modal-card-body">
          <div class="notification is-warning" v-if="warningMessage">
            <button class="delete" @click="warningMessage = ''"></button>
            {{ warningMessage }}
          </div>
          <div class="columns">
            <div class="column is-4 is-offset-2">
              <div class="field">
                <label class="label">File Type</label>
                <p class="control has-icons-left">
                  <span class="select">
                    <select v-model="fileType">
                      <option value="csv" selected>CSV</option>
                      <option value="json">JSON</option>
                      <option value="xml">XML</option>
                    </select>
                  </span>
                  <span class="icon is-small is-left">
                    <i class="fa fa-file-o"></i>
                  </span>
                </p>
              </div>
            </div>
            <div class="column is-4">
              <div class="field">
                <label class="label">Filename</label>
                <div class="field has-addons">
                  <p class="control">
                    <input class="input" type="text" v-model="filename">
                  </p>
                  <p class="control">
                    <a class="button is-static">
                      {{ fileExtension }}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="columns" v-if="inProgress">
            <div class="column has-text-centered">
              <p class="is-small">{{ progress }}% done. Please wait for the file processing to complete.</p>
              <progress class="progress is-success" :value="progress" max="100"></progress>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot pull-right">
          <a class="button is-success" @click="start" :disabled="inProgress">Start</a>
          <a class="button" @click="cancel">Cancel</a>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import config from '../../common/config.js'
import format from '../../common/format.js'

export default {
  name: 'download-modal',
  props: {
    show: {
      default: false,
      type: Boolean
    },
    onClose: {
      type: Function
    },
    url: {
      type: String
    },
    columns: {
      type: Array
    }
  },
  data () {
    return {
      filename: '',
      fileType: 'csv',
      warningMessage: '',
      inProgress: false,
      progress: 0
    }
  },
  methods: {
    start () {
      if (!this.filename) {
        this.warningMessage = 'You must set a file name to begin the download.'
        return
      }

      this.inProgress = true

      let url = `https://${config.currentAccount.subdomain}.zendesk.com` + this.url

      client.request(url).then(data => {
        let perPage = Object.keys(data).includes('articles') ? 30 : 100
        let totalPages = Math.ceil(data.count/perPage)
        let currentPage = 1
        this.progress = ((currentPage/totalPages)*100).toPrecision(3)

        format(data[this.getKey(Object.keys(data))], null, this.columns).then(results => {
          this.extend(results, data.next_page, totalPages, currentPage, results => {
            let filename, link, data, mimeType

            switch (this.fileType) {
              case 'csv':
                filename = this.filename + '.csv'
                mimeType = "text/csv"
                data = this.convertToCSV(results)
                break
              case 'json':
                filename = this.filename + '.json'
                mimeType = "text/json"
                data = JSON.stringify(results)
                break
              case 'xml':
                filename = this.filename + '.xml'
                mimeType = "text/xml"
                let x2js = new X2JS()
                data = x2js.json2xml_str(results)
                break
            }
            if (window.Blob && window.navigator.msSaveOrOpenBlob) {
              let ab = new ArrayBuffer(data.length)
              let ia = new Uint8Array(ab)
              for (let i = 0; i < data.length; i++) {
                ia[i] = data.charCodeAt(i);
              }
              let blobObject = new Blob([ab], { type: mimeType })
              window.navigator.msSaveOrOpenBlob(blobObject, filename)
            } else if (document.createElement('a').download !== undefined) {
              data = encodeURI('data:text/csv;charset=utf-8,' + data)
              link = document.createElement('a')
              link.setAttribute('href', data)
              link.setAttribute('download', filename)
              document.body.appendChild(link)
              link.click()
              document.body.removeChild(link)
            }
            this.progress = 0
            this.inProgress = false
            this.onClose()
          })
        })
      })
    },
    cancel () {
      this.inProgress = false
      this.onClose()
    },
    convertToCSV (results) {
      let result, counter
      let keys = []
      let header = []

      if (results == null || !results.length) {
        new Error('The results passed into convertToCSV are null or 0 length.')
      }

      this.columns.forEach(column => {
        if (column.selected) {
          header.push(column.name)
          keys.push(column.value)
        }
      })

      result = ''
      result += header.join(',')
      result += '\n'

      results.forEach(r => {
        counter = 0
        keys.forEach(key => {
          if (counter > 0) result += ','
          if (r[key]) {
            if (typeof r[key] == 'string') {
              r[key] = r[key].replace(/"/g, '""')  // Escape commas and quotes
              if (r[key].search(/("|,|\n)/g) >= 0) r[key] = '"' + r[key] + '"'
            }
            result += r[key];
          }
          counter++;
        })
        result += '\n'
      })
      return result
    },
    extend (results, nextPage, totalPages, currentPage, callback) {
      if (nextPage != null && this.inProgress) {
        client.request(nextPage).then((data) => {
          currentPage += 1;
          format(data[this.getKey(Object.keys(data))], null, this.columns).then(newResults => {
            results = results.concat(newResults);
            this.progress = ((currentPage/totalPages)*100).toPrecision(3)
            this.extend(results, data.next_page, totalPages, currentPage++, callback)
          });
        });
      } else {
        callback(results);
      }
    },
    getKey (keys) {
      let validKeys = ['articles', 'tickets', 'users', 'organizations', 'groups', 'users', 'results', 'views', 'automations', 'triggers', 'macros']
      let key = keys.find(key => {
        return validKeys.includes(key)
      })
      return key
    }
  },
  computed: {
    fileExtension () {
      return `.${this.fileType}`
    }
  }
}
</script>

<style scoped>
.pull-right {
  justify-content: flex-end;
}
@media screen and (min-width: 769px) {
  .modal-content, .modal-card {
    margin: 0 20px !important;
  }
}
</style>
