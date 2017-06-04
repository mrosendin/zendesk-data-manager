<template>
  <div id="app">
    <div class="container is-fluid">

      <div class="columns">
        <div class="column is-2" v-if="menuOpen">
          <sidebar></sidebar>
        </div>
        <div class="column">
          <p class="field">
            <a class="button" @click="toggleMenu">
              <span class="icon is-small">
                <i class="fa fa-bars"></i>
              </span>
            </a>
          </p>
          <router-view></router-view>
        </div>
      </div>

      <hr>

      <div class="columns results">
        <div class="column">
          <results :columns="columns"></results>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue'
import Results from './components/Results.vue'
import bus from './bus.js'

export default {
  name: 'app',
  components: { Sidebar, Results },
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
  created () {
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
