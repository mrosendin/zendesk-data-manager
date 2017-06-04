<template>
  <div id="groups">

    <heading>
      <h4 slot="header" class="title is-4">Group Filters</h4>
    </heading>

    <div class="columns">
      <div class="center-inline-filters">
        <date-filter></date-filter>
      </div>
    </div>

    <div class="columns">
      <div class="column is-4 is-offset-4">
        <div class="field">
          <label class="label">Name</label>
          <p class="control">
            <input class="input" type="text" v-model="filters.name">
          </p>
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <column-selection :columns="columns"></column-selection>
      </div>
    </div>

    <advanced-search type="group" :filters="filters"></advanced-search>
  </div>
</template>

<script>
import Heading from './Heading.vue'
import DateFilter from './DateFilter.vue'
import ColumnSelection from './ColumnSelection.vue'
import AdvancedSearch from './AdvancedSearch.vue'
import Results from './Results.vue'
import bus from '../bus.js'

export default {
  name: 'groups',
  components: { Heading, DateFilter, ColumnSelection, AdvancedSearch, Results },
  data () {
    return {
      columns: [
        { name: 'Id', value: 'id', selected: true },
        { name: 'Result Type', value: 'result_type', selected: true },
        { name: 'Name', value: 'name', selected: true },
        { name: 'Created At', value: 'created_at', selected: true },
        { name: 'Updated At', value: 'updated_at', selected: true }
      ],
      filters: {
        name: ''
      }
    }
  },
  mounted () {
    // Need to set the columns, since in other files this is normally triggered
    // when getting custom fields
    bus.$emit('columnToggled', this.columns)
  },
  updated () {
    bus.$emit('columnToggled', this.columns)
  }
}
</script>

<style scoped></style>
