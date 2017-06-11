<template>
  <div id="macros">

    <div class="content has-text-centered">
      <h4 class="title is-4" class="header">Macros</h4>
    </div>

    <div class="columns">
      <div class="column">
        <column-selection :columns="columns"></column-selection>
      </div>
    </div>

    <search type="macros"/>
  </div>
</template>

<script>
import ColumnSelection from './ColumnSelection.vue'
import Search from './Search.vue'
import bus from '../bus.js'

export default {
  name: 'macros',
  components: { ColumnSelection, Search },
  data () {
    return {
      columns: [
        { name: 'Id', value: 'id', selected: true },
        { name: 'Title', value: 'title', selected: true },
        { name: 'Active', value: 'active', selected: true },
        { name: 'Description', value: 'description', selected: true },
        { name: 'Position', value: 'position', selected: true },
        { name: 'Actions', value: 'actions', selected: true },
        { name: 'Restriction', value: 'restriction', selected: true }
      ]
    }
  },
  mounted () {
    bus.$emit('columnToggled', this.columns)
    let url = '/api/v2/macros.json'
    client.request(url).then(data => {
      bus.$emit('results-fetched', data.macros, 'macros', url, 30, data.count, false)
    }).catch(error => {
      console.log(error)
    })
  },
  updated () {
    bus.$emit('columnToggled', this.columns)
  }
}
</script>
