<template>
  <div id="organizations">

    <div class="box">
      <div class="content has-text-centered">
        <h4 class="title is-4">Organization Filters</h4>
      </div>

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
            <p class="control has-icons-left">
             <typeahead :source="autocomplete.tags" :onSelect="onSelect" :onChange="onChange" :limit="5" name="tags"></typeahead>
             <span class="icon is-small is-left">
               <i class="fa fa-magic"></i>
             </span>
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
import DateFilter from './filters/DateFilter.vue'
import Typeahead from 'vue-bulma-typeahead'
import ColumnSelection from '../shared/ColumnSelection.vue'
import AdvancedSearch from './shared/AdvancedSearch.vue'
import bus from '../../common/bus.js'
import columns from '../../common/columns.js'

export default {
  name: 'organizations',
  components: { DateFilter, Typeahead, ColumnSelection, AdvancedSearch },
  data () {
    return {
      columns: columns.organizationColumns,
      customFields: [],
      filters: {
        name: '',
        notes: '',
        details: '',
        tags: ''
      },
      autocomplete: {
        tags: []
      }
    }
  },
  methods: {
    onChange (value, name) {
      this.filters[name] = value

      client.request(`/api/v2/autocomplete/tags.json?name=${value}`).then(response => {
        this.autocomplete.tags = response.tags
      }).catch(error => {
        console.log(error)
      })
    },
    onSelect (value, name) {
      this.filters[name] = value
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
