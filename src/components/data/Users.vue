<template>
  <div id="users">

    <div class="box">
      <div class="content has-text-centered">
        <h4 class="title is-4">User Filters</h4>
      </div>

      <div class="columns">
        <div class="center-inline-filters">
          <date-filter></date-filter>
          <role-filter></role-filter>
        </div>
      </div>

      <div class="columns">
        <div class="column is-3">
          <div class="field">
            <label class="label">Name</label>
            <p class="control has-icons-left">
             <typeahead :source="autocomplete.users" :onSelect="onSelect" :onChange="onChange" :limit="5" name="name"></typeahead>
             <span class="icon is-small is-left">
               <i class="fa fa-magic"></i>
             </span>
            </p>
          </div>
        </div>
        <div class="column is-3">
          <div class="field">
            <label class="label">Group</label>
            <p class="control">
              <input class="input" type="text" v-model="filters.group">
            </p>
          </div>
        </div>
        <div class="column is-3">
          <div class="field">
            <label class="label">Organization</label>
            <p class="control has-icons-left">
             <typeahead :source="autocomplete.organizations" :onSelect="onSelect" :onChange="onChange" :limit="5" name="organization"></typeahead>
             <span class="icon is-small is-left">
               <i class="fa fa-magic"></i>
             </span>
           </p>
          </div>
        </div>
        <div class="column is-3">
          <div class="field">
            <label class="label">Notes</label>
            <p class="control">
              <input class="input" type="text" v-model="filters.notes">
            </p>
          </div>
        </div>
      </div>

      <div class="columns">
        <div class="column is-3">
          <div class="field">
            <label class="label">Details</label>
            <p class="control">
              <input class="input" type="text" v-model="filters.details">
            </p>
          </div>
        </div>
        <div class="column is-3">
          <div class="field">
            <label class="label">External Id</label>
            <p class="control">
              <input class="input" type="text" v-model="filters.external_id">
            </p>
          </div>
        </div>
        <div class="column is-3">
          <div class="field">
            <label class="label">Phone</label>
            <p class="control">
              <input class="input" type="text" v-model="filters.phone">
            </p>
          </div>
        </div>
        <div class="column is-3">
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
    </div>

    <div class="columns">
      <div class="column">
        <column-selection :columns="columns" :customFields="customFields"></column-selection>
      </div>
    </div>

    <advanced-search type="user" :filters="filters"></advanced-search>
  </div>
</template>

<script>
import DateFilter from './filters/DateFilter.vue'
import RoleFilter from './filters/RoleFilter.vue'
import Typeahead from 'vue-bulma-typeahead'
import ColumnSelection from '../shared/ColumnSelection.vue'
import AdvancedSearch from './shared/AdvancedSearch.vue'
import bus from '../../common/bus.js'
import columns from '../../common/columns.js'

export default {
  name: 'users',
  components: { DateFilter, RoleFilter, Typeahead, ColumnSelection, AdvancedSearch },
  data () {
    return {
      columns: columns.userColumns,
      customFields: [],
      filters: {
        name: '',
        group: '',
        organization: '',
        notes: '',
        details: '',
        external_id: '',
        phone: '',
        tags: ''
      },
      autocomplete: {
        organizations: [],
        users: [],
        tags: []
      }
    }
  },
  methods: {
    onChange (value, name) {
      this.filters[name] = value

      let url;
      let resource;

      if (name === 'tags') {
        resource = 'tags'
        url = `/api/v2/autocomplete/tags.json?name=${value}`
      } else {
        resource = (name === 'organization' ? 'organizations' : 'users')
        url = `/api/v2/${resource}/autocomplete.json?name=${value}`
      }

      client.request(url).then(response => {
        this.autocomplete[resource] = (response[resource][0].hasOwnProperty('name') ? response[resource].map(item => item.name) : response[resource])
      }).catch(error => {
        console.log(error)
      })
    },
    onSelect (value, name) {
      this.filters[name] = value
    }
  },
  mounted () {
    let url = '/api/v2/users.json'
    client.request(url).then(data => {
      bus.$emit('results-fetched', data.users, 'users', url, 100, data.count, false)
    }).catch(error => {
      console.log(error)
    })
  },
  updated () {
    bus.$emit('columnToggled', this.columns.concat(this.customFields))
  },
  beforeCreate () {
    client.request('/api/v2/user_fields.json').then((data) => {
      this.customFields = data.user_fields.map((field) => {
        return {
          name: field.title,
          value: field.key,
          selected: false
        }
      })
    })
  }
}
</script>

<style scoped></style>