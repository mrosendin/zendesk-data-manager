<template>
  <div id="triggers">

    <div class="content has-text-centered">
      <h4 class="title is-4" class="header">Triggers</h4>
    </div>

    <div class="columns">
      <div class="column">
        <column-selection :columns="columns"></column-selection>
      </div>
    </div>

    <search type="triggers"/>
  </div>
</template>

<script>
import ColumnSelection from '../shared/ColumnSelection.vue'
import Search from './shared/Search.vue'
import bus from '../../common/bus.js'

export default {
  name: 'triggers',
  components: { ColumnSelection, Search },
  data () {
    return {
      columns: [
        { name: 'Id', value: 'id', selected: true },
        { name: 'Title', value: 'title', selected: true },
        { name: 'Active', value: 'active', selected: true },
        { name: 'Description', value: 'description', selected: true },
        { name: 'Position', value: 'position', selected: true },
        { name: 'Conditions', value: 'conditions', selected: true },
        { name: 'Actions', value: 'actions', selected: true },
        { name: 'Updated At', value: 'updated_at', selected: true },
        { name: 'Created At', value: 'created_at', selected: true }
      ]
    }
  },
  mounted () {
    bus.$emit('columnToggled', this.columns)
    let url = '/api/v2/triggers.json'
    client.request(url).then(data => {
      bus.$emit('results-fetched', data.triggers, 'triggers', url, 30, data.count, false)
    }).catch(error => {
      console.log(error)
    })
  },
  updated () {
    bus.$emit('columnToggled', this.columns)
  }
}
</script>
