<template>
  <div id="advanced-search" class="has-text-centered">

    <div class="columns">
      <div class="column">
        <div class="field has-addons flex-center">
          <p class="control">
            <input v-model="keywords" class="input is-medium" type="text" placeholder="Enter keywords">
          </p>
          <p class="control">
            <a class="button is-info is-medium" @click="search">
              Search
            </a>
          </p>
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <template v-if="query">
          Search string: <code>{{query}}</code>
        </template>
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
import bus from '../bus.js'

export default {
  name: 'advanced-search',
  data () {
    return {
      keywords: '',
      error: '',
      date: '',
      status: '',
      priority: '',
      ticketType: '',
      role: ''
    }
  },
  computed: {
    query () {
      let result = [`type:${this.type}`]
      if (this.keywords) result.push(`${this.keywords}`)
      if (this.date) result.push(`${this.date}`)
      if (this.status) result.push(`${this.status}`)
      if (this.priority) result.push(`${this.priority}`)
      if (this.ticketType) result.push(`${this.ticketType}`)
      if (this.role) result.push(`${this.role}`)
      for (var key in this.filters) {
        if (this.filters[key]) result.push(`${key}:"${this.filters[key]}"`);
      }
      result = `${result.join(' ')}`
      return result
    }
  },
  created () {
    let temp
    bus.$on('dateChanged', (date) => {
      this.date = Object.values(date).join('')
    })
    bus.$on('statusChanged', (status) => {
      temp = Object.values(status)
      temp.unshift('status')
      this.status = temp.join('')
    })
    bus.$on('priorityChanged', (priority) => {
      temp = Object.values(priority)
      temp.unshift('priority')
      this.priority = temp.join('')
    })
    bus.$on('ticketTypeChanged', (ticketType) => {
      this.ticketType = `ticket_type:${ticketType}`
    })
    bus.$on('roleChanged', (role) => {
      this.role = `role:${role}`
    })
  },
  beforeDestroy () {
    // TODO: May want to create a seprate event name for clearing out the
    // search results when the route is changed.
    bus.$emit('results-fetched', [])
  },
  methods: {
    search () {
      console.log(`Searching for ${this.type}`)

      let url = `/api/v2/search.json?query=${encodeURIComponent(this.query)}`
      client.request(url)
        .then((data) => {
          console.log(data)
          let itemsPerPage = 100
          bus.$emit('results-fetched', data.results, this.type, url, itemsPerPage, data.count, true)
        }).catch((error) => {
          this.error = error.responseJSON.description
        })
    }
  },
  props: {
    type: {
      type: String
    },
    filters: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style scoped>
.flex-center {
  justify-content: center
}
</style>
