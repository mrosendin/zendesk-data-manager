<template>
  <div id="app">
    <div class="container is-fluid">

      <app-header/>

      <div class="columns">
        <div class="column">
          <router-view></router-view>
        </div>
      </div>

      <div class="columns results">
        <div class="column">
          <results :columns="columns"></results>
        </div>
      </div>

    </div>

    <app-footer/>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import Results from './components/Results.vue'
import AppFooter from './components/AppFooter.vue'
import bus from './bus.js'

export default {
  name: 'app',
  components: { AppHeader, Results, AppFooter },
  data () {
    return {
      columns: [],
      menuOpen: false
    }
  },
  methods: {
    toggleMenu () {
      this.menuOpen = !this.menuOpen
      bus.$emit('menuToggled', this.menuOpen)
    }
  },
  watch: {
    '$route' () {
      console.log('Route changed. Clearing columns.')
      this.columns = []
    }
  },
  created () {
    console.log(this.$route)
    bus.$on('columnToggled', (columns) => {
      this.columns = columns
    })
  }
}
</script>

<style>
.heading {
  text-transform: none;
}
.results {
  display: block !important;
}
.center-inline-filters {
  margin: 0 auto;
}
.center-inline-filters > * {
  display: inline-block;
  margin: 10px;
  padding: 10px;
  border: 1px solid #eee;
}
</style>
