<template>
  <div id="articles">

    <div class="box">
      <heading>
        <h4 slot="header" class="title is-4">Article Filters</h4>
      </heading>

      <div class="columns">
        <div class="center-inline-filters">
          <date-filter></date-filter>
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <column-selection :columns="columns"></column-selection>
      </div>
    </div>

    <advanced-search type="article"></advanced-search>
  </div>
</template>

<script>
import Heading from './Heading.vue'
import DateFilter from './DateFilter.vue'
import ColumnSelection from './ColumnSelection.vue'
import AdvancedSearch from './AdvancedSearch.vue'
import bus from '../bus.js'

export default {
  name: 'articles',
  components: { Heading, DateFilter, ColumnSelection, AdvancedSearch },
  data () {
    return {
      columns: [
        { name: 'Id', value: 'id', selected: true },
        { name: 'Result Type', value: 'result_type', selected: true },
        { name: 'Title', value: 'title', selected: true },
        { name: 'Locale', value: 'locale', selected: true },
        { name: 'Brand Name', value: 'brand_name', selected: true },
        { name: 'Brand Id', value: 'brand_id', selected: true },
        { name: 'Created At', value: 'created_at', selected: true },
        { name: 'Updated At', value: 'updated_at', selected: true },
        { name: 'Brand Id', value: 'brand_id', selected: true },
        { name: 'Created At', value: 'created_at', selected: true },
        { name: 'Updated At', value: 'updated_at', selected: true },
        { name: 'Brand Id', value: 'brand_id', selected: true },
        { name: 'Created At', value: 'created_at', selected: true },
        { name: 'Updated At', value: 'updated_at', selected: true }
      ]
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
