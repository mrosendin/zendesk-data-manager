<template>
  <div id="results" v-if="complete">

    <div class="has-centered-text">
      <heading>
        <h4 slot="header" class="title is-4">{{count}} Result(s)</h4>
      </heading>
    </div>

    <div id="table-scroll" v-if="results.length">
      <table class="table is-bordered">
        <thead>
          <tr>
            <th v-for="column in columns" v-if="column.selected">{{column.name}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="result in results">
            <td v-for="column in columns" v-if="column.selected">{{result[column.value]}}</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
import Heading from './Heading.vue'
import bus from '../bus.js'

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
      complete: false
    }
  },
  components: {
    Heading
  },
  computed: {
    count () {
      return this.results.length
    }
  },
  created () {
    bus.$on('results-fetched', (results) => {
      this.results = results
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
</style>
