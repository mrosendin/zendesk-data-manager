<template>
  <div id="metadata-search">
    <div class="columns">
      <div class="center-inline-filters">

        <div id="active">
          <div class="field-label">
            <label class="label">Active</label>
          </div>
          <div class="field is-horizontal">
            <div class="field-body">
              <div class="field">
                <div class="select is-fullwidth">
                  <select v-model="active">
                    <option></option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="sortBy">
          <div class="field-label">
            <label class="label">Sort by</label>
          </div>
          <div class="field is-horizontal">
            <div class="field-body">
              <div class="field is-narrow">
                <div class="control">
                  <div class="select is-fullwidth">
                    <select v-model="sortBy">
                      <option value="relevance">Relevance</option>
                      <option value="alphabetical">Alphabetical</option>
                      <option value="created_at">Created At</option>
                      <option value="updated_at">Updated At</option>
                      <option value="position">Position</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="order">
          <div class="field-label">
            <label class="label">Order</label>
          </div>
          <div class="field is-horizontal">
            <div class="field-body">
              <div class="field is-narrow">
                <div class="control">
                  <div class="select is-fullwidth">
                    <select v-model="order">
                      <option value="asc">Ascending</option>
                      <option value="desc">Descending</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="search">
          <div class="field is-horizontal">
            <div class="field-body">
              <div class="field is-narrow">
                <p class="control has-icons-right">
                  <input v-model="title" class="input" type="text" placeholder="Enter title">
                  <span class="icon is-small is-right">
                    <i class="fa fa-search fa-3x"></i>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div class="columns">
      <div class="column">
        <div class="notification is-danger" v-if="error">
          <button class="delete" @click="error = ''"></button>
            {{error}}
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import bus from '../../../common/bus.js'

export default {
  name: 'search',
  data () {
    return {
      title: '',
      active: true,
      sortBy: '',
      order: ''
    }
  },
  watch: {
    title: function (newTitle) {
      this.search()
    }
  },
  methods: {
    search: _.debounce(function () {
      if (!this.title) {
        return new Promise((resolve, reject) => {
          let url = `/api/v2/${this.type}.json`
          client.request(url).then(data => {
            this.onFetch(data[this.type], data.count)
          }).catch(error => {
            this.error = error
          })
        })
      }
      mixpanel.track(`Searching for ${this.type}`)

      let url = `/api/v2/${this.type}/search.json?query=${encodeURIComponent(this.title)}`
      if (this.sortBy) url += `&sort_by=${this.sortBy}`
      if (this.order) url += `&sort_order=${this.order}`
      if (this.active) url += `&active=${this.active}`
      bus.$emit('url', url)
      client.request(url).then((data) => {
        this.onFetch(data[this.type], data.count)
      }).catch((error) => {
        this.error = error
      })
    }, 300)
  },
  props: {
    type: {
      type: String
    },
    onFetch: {
      type: Function
    }
  }
}
</script>

<style scoped>
#active, #sortBy, #order, #search {
  border: none !important;
}
.field-label {
  text-align: left;
}
</style>
