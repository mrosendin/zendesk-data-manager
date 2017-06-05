<template>
  <div id="search">

    <div class="columns">
      <div class="column is-4 is-offset-4">
        <div class="field">
          <p class="control has-icons-right">
            <input v-model="title" class="input is-medium" type="text" placeholder="Enter title">
            <span class="icon is-small is-right">
              <i class="fa fa-search fa-3x"></i>
            </span>
          </p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import bus from '../bus.js'

export default {
  name: 'search',
  data () {
    return {
      title: ''
    }
  },
  beforeDestroy () {
    // TODO: May want to create a seprate event name for clearing out the
    // search results when the route is changed.
    bus.$emit('results-fetched', [])
  },
  watch: {
    title: function (newTitle) {
      this.search()
    }
  },
  methods: {
    search: _.debounce(function () {
      if (!this.title) return
      console.log(`Searching for ${this.type}`)

      client.request(`/api/v2/${this.type}/search.json?query=${encodeURIComponent(this.title)}`)
        .then((data) => {
          bus.$emit('results-fetched', data[this.type])
        }).catch((error) => {
          this.error = error.responseJSON.description
        })
    }, 300)
  },
  props: {
    type: {
      type: String
    }
  }
}
</script>
