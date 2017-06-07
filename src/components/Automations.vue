<template>
  <div id="automations">

    <heading>
      <h4 slot="header" class="title is-4">Automations</h4>
    </heading>

    <div class="columns">
      <div class="column">
        <column-selection :columns="columns"></column-selection>
      </div>
    </div>

    <search type="automations"/>
  </div>
</template>

<script>
import Heading from './Heading.vue'
import ColumnSelection from './ColumnSelection.vue'
import Search from './Search.vue'
import bus from '../bus.js'

export default {
  name: 'automations',
  components: { Heading, ColumnSelection, Search },
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
