<template>
  <div id="articles">

    <div class="box">
      <div class="content has-text-centered">
        <h4 class="title is-4" class="header">Article Filters</h4>
      </div>

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
import DateFilter from './filters/DateFilter.vue'
import ColumnSelection from '../shared/ColumnSelection.vue'
import AdvancedSearch from './shared/AdvancedSearch.vue'
import bus from '../../common/bus.js'

export default {
  name: 'articles',
  components: { DateFilter, ColumnSelection, AdvancedSearch },
  data () {
    return {
      columns: [
        { name: 'Id', value: 'id', selected: true },
        { name: 'Title', value: 'title', selected: true },
        { name: 'Locale', value: 'locale', selected: true },
        { name: 'Brand Name', value: 'brand_name', selected: true },
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
    let url = '/api/v2/help_center/articles.json'
    client.request(url).then(data => {
      bus.$emit('results-fetched', data.articles, 'articles', url, data.per_page, data.count, false)
    }).catch(error => {
      console.log(error)
    })
  },
  updated () {
    bus.$emit('columnToggled', this.columns)
  }
}
</script>

<style scoped></style>
