<template>
  <div id="download-modal">
    <div :class="['modal', { 'is-active': show }]">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Download Results</p>
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
          <div class="columns">
            <div class="column">
              <progress class="progress is-success" value="60" max="100">60%</progress>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot pull-right">
          <a class="button is-success" @click="start">Start</a>
          <a class="button" @click="onClose">Cancel</a>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import config from '../../common/config.js'

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
    }
  },
  data () {
    return {
      filename: '',
      fileType: 'csv',
      warningMessage: ''
    }
  },
  methods: {
    start () {
      console.log('Start clicked.')
      if (!this.filename) {
        this.warningMessage = 'You must set a file name to begin the download.'
        return
      }
      // get email/token, encrypt, create request and send as header
      // send the search url with parameters as body
      // poll the status endpoint and update progress bar
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
</style>
