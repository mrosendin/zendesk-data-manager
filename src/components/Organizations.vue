<template>
  <div id="organizations">

    <div class="box">
      <heading>
        <h4 slot="header" class="title is-4">Organization Filters</h4>
      </heading>

      <div class="columns">
        <div class="center-inline-filters">
          <date-filter></date-filter>
        </div>
      </div>

      <div class="columns">
        <div class="column is-4 is-offset-2">
          <div class="field">
            <label class="label">Name</label>
            <p class="control">
              <input class="input" type="text" v-model="filters.name">
            </p>
          </div>
        </div>
        <div class="column is-4">
          <div class="field">
            <label class="label">Tags</label>
            <p class="control">
              <input class="input" type="text" v-model="filters.tags">
            </p>
          </div>
        </div>
      </div>

      <div class="columns">
        <div class="column is-4 is-offset-2">
          <div class="field">
            <label class="label">Notes</label>
            <p class="control">
              <input class="input" type="text" v-model="filters.notes">
            </p>
          </div>
        </div>
        <div class="column is-4">
          <div class="field">
            <label class="label">Details</label>
            <p class="control">
              <input class="input" type="text" v-model="filters.details">
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <column-selection :columns="columns" :customFields="customFields"></column-selection>
      </div>
    </div>

    <advanced-search type="organization" :filters="filters"></advanced-search>
  </div>
</template>

<script>
import Heading from './Heading.vue'
import DateFilter from './DateFilter.vue'
import ColumnSelection from './ColumnSelection.vue'
import AdvancedSearch from './AdvancedSearch.vue'
import bus from '../bus.js'

export default {
  name: 'organizations',
  components: { Heading, DateFilter, ColumnSelection, AdvancedSearch },
  data () {
    return {
      columns: [
        { name: 'Id', value: 'id', selected: true },
        { name: 'Name', value: 'name', selected: true },
        { name: 'Details', value: 'details', selected: true },
        { name: 'Tags', value: 'tags', selected: true },
        { name: 'Created At', value: 'created_at', selected: true },
        { name: 'Updated At', value: 'updated_at', selected: true },
        { name: 'External Id', value: 'external_id', selected: false },
        { name: 'Group Id', value: 'group_id', selected: false },
        { name: 'Notes', value: 'notes', selected: false },
      ],
      customFields: [],
      filters: {
        name: '',
        notes: '',
        details: '',
        tags: ''
      }
    }
  },
  mounted () {
    let url = '/api/v2/organizations.json'
    client.request(url).then(data => {
      bus.$emit('results-fetched', data.organizations, 'organizations', url, 100, data.count, false)
    }).catch(error => {
      console.log(error)
    })
  },
  updated () {
    bus.$emit('columnToggled', this.columns.concat(this.customFields))
  },
  beforeCreate () {
    client.request('/api/v2/organization_fields.json').then((data) => {
      this.customFields = data.organization_fields.map((field) => {
        return {
          name: field.title,
          value: field.key,
          selected: false
        }
      })
    }).catch((error) => {
      console.log(error)
    })
  }
}
</script>

<style scoped></style>
