<template>
  <div id="views">

    <div class="content has-text-centered">
      <h4 class="title is-4" class="header">Views</h4>
    </div>

    <div class="columns">
      <div class="column">
        <column-selection :columns="columns"></column-selection>
      </div>
    </div>

    <search type="views"/>
  </div>
</template>

<script>
import ColumnSelection from '../shared/ColumnSelection.vue'
import Search from './shared/Search.vue'
import bus from '../../common/bus.js'

export default {
  name: 'views',
  components: { ColumnSelection, Search },
  data () {
    return {
      columns: [
        { name: 'Id', value: 'id', selected: true },
        { name: 'Title', value: 'title', selected: true },
        { name: 'Active', value: 'active', selected: true },
        { name: 'Position', value: 'position', selected: true },
        { name: 'Execution', value: 'execution', selected: true },
        { name: 'Conditions', value: 'conditions', selected: true },
        { name: 'Restriction', value: 'restriction', selected: true }
      ]
    }
  },
  mounted () {
    bus.$emit('columnToggled', this.columns)
    let url = '/api/v2/views.json'
    client.request(url).then(data => {
      bus.$emit('results-fetched', data.views, 'views', url, 30, data.count, false)
    }).catch(error => {
      console.log(error)
    })
  },
  updated () {
    bus.$emit('columnToggled', this.columns)
  }
}
</script>
