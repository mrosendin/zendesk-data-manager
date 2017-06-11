<template>
  <div id="automations">

    <div class="content has-text-centered">
      <h4 class="title is-4" class="header">Automations</h4>
    </div>

    <div class="columns">
      <div class="column">
        <column-selection :columns="columns"></column-selection>
      </div>
    </div>

    <search type="automations"/>
  </div>
</template>

<script>
import ColumnSelection from '../shared/ColumnSelection.vue'
import Search from './shared/Search.vue'
import bus from '../../common/bus.js'

export default {
  name: 'automations',
  components: { ColumnSelection, Search },
  data () {
    return {
      columns: [
        { name: 'Id', value: 'id', selected: true },
        { name: 'Title', value: 'title', selected: true },
        { name: 'Active', value: 'active', selected: true },
        { name: 'Actions', value: 'actions', selected: true },
        { name: 'Conditions', value: 'conditions', selected: true },
        { name: 'Created At', value: 'created_at', selected: true },
        { name: 'Updated At', value: 'updated_at', selected: true },
        { name: 'Highlights', value: 'highlights', selected: false },
        { name: 'Position', value: 'position', selected: false }
      ]
    }
  },
  mounted () {
    bus.$emit('columnToggled', this.columns)
    let url = '/api/v2/automations.json'
    client.request(url).then(data => {
      bus.$emit('results-fetched', data.automations, 'automations', url, 30, data.count, false)
    }).catch(error => {
      console.log(error)
    })
  },
  updated () {
    bus.$emit('columnToggled', this.columns)
  }
}
</script>
