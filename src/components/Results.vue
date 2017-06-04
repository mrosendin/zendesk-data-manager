<template>
  <div id="results" v-if="complete">

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
              <td v-for="column in columns" v-if="column.selected">{{result[column.value]}}</td>
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
  methods: {
    deleteSelected () {
      console.log('Method call to deleteSelected()')
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
