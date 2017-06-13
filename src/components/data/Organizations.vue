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

    <advanced-search type="organization" :filters="filters" :onFetch="onFetch"></advanced-search>

    <div class="columns" v-if="messages.success">
      <div class="column">
        <div class="notification is-success">
          <button class="delete" @click="messages.success = ''"></button>
            {{messages.success}}
        </div>
      </div>
    </div>

    <div class="columns" v-if="messages.error">
      <div class="column">
        <div class="notification is-danger">
          <button class="delete" @click="messages.error = ''"></button>
            {{messages.error}}
        </div>
      </div>
    </div>

    <div class="columns results">
      <div class="column">
        <results :columns="this.columns.concat(this.customFields)"
          :results="results"
          type="organizations"
          :resultCount="resultCount"
          :perPage="perPage"
          :onDelete="onDelete">
        </results>
      </div>
    </div>
  </div>
</template>

<script>
import DateFilter from './filters/DateFilter.vue'
import Typeahead from 'vue-bulma-typeahead'
import ColumnSelection from '../shared/ColumnSelection.vue'
import AdvancedSearch from './shared/AdvancedSearch.vue'
import Results from '../shared/Results.vue'
import bus from '../../common/bus.js'
import columns from '../../common/columns.js'
import format from '../../common/format.js'

export default {
  name: 'organizations',
  components: {
    DateFilter,
    Typeahead,
    ColumnSelection,
    AdvancedSearch,
    Results
  },
  data () {
    return {
      columns: columns.organizationColumns,
      results: [],
      resultCount: 0,
      perPage: 30,
      messages: {
        success: '',
        error: ''
      },
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
    onFetch (results, resultCount) {
      format(results, 'organizations', this.columns).then(results => {
        this.results = results
        this.resultCount = resultCount
        this.perPage = 100
      })
    },
    onDelete (ids) {
      let count = ids.length
      ids.forEach((id) => {
        client.request({
          url: `/api/v2/organizations/destroy_many.json?ids=${ids.join(',')}`,
          method: 'DELETE'
        }).then(() => {
          this.resultCount--
          this.results = this.results.filter((result) => {
            return !ids.includes(result.id)
          })
          if (count > 1) this.messages.success = `${count} organizations have been deleted.`
          else this.messages.success = `${count} organization has been deleted.`
        })
      })
    },
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
    bus.$emit('url', url)
    client.request(url).then(data => {
      format(data.organizations, 'organizations', this.columns).then(results => {
        this.results = results
        this.resultCount = data.count
        this.perPage = 30
      })
    }).catch(error => {
      console.log(error)
    })
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
