<template>
  <div id="users">

    <heading>
      <h4 slot="header" class="title is-4">User Filters</h4>
    </heading>

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
          <p class="control">
            <input class="input" type="text" v-model="filters.name">
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
          <p class="control">
            <input class="input" type="text" v-model="filters.organization">
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
          <p class="control">
            <input class="input" type="text" v-model="filters.tags">
          </p>
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
import Heading from './Heading.vue'
import DateFilter from './DateFilter.vue'
import RoleFilter from './RoleFilter.vue'
import ColumnSelection from './ColumnSelection.vue'
import AdvancedSearch from './AdvancedSearch.vue'
import bus from '../bus.js'

export default {
  name: 'users',
  components: { Heading, DateFilter, RoleFilter, ColumnSelection, AdvancedSearch },
  data () {
    return {
      columns: [
        { name: 'Id', value: 'id', selected: true },
        { name: 'Name', value: 'name', selected: true },
        { name: 'Email', value: 'email', selected: true },
        { name: 'Phone', value: 'phone', selected: true },
        { name: 'Organization Id', value: 'organization_id', selected: true, sideload: {type: 'organizations'} },
        { name: 'Role', value: 'role', selected: true },
        { name: 'Tags', value: 'tags', selected: true },
        { name: 'Created At', value: 'created_at', selected: true },
        { name: 'Updated At', value: 'updated_at', selected: true },
        { name: 'External Id', value: 'external_id', selected: false },
        { name: 'Active', value: 'active', selected: false },
        { name: 'Chat Only', value: 'chat_only', selected: false },
        { name: 'Last Login At', value: 'last_login_at', selected: false },
        { name: 'Notes', value: 'notes', selected: false },
        { name: 'Time Zone', value: 'time_zone', selected: false },
        { name: 'Locale', value: 'locale', selected: false },
        { name: 'Verified', value: 'verified', selected: false }
      ],
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
      }
    }
  },
  updated () {
    bus.$emit('columnToggled', this.columns.concat(this.customFields))
  },
  beforeCreate () {
    client.request('/api/v2/user_fields.json').then((data) => {
      this.customFields = data.user_fields.map((field) => {
        return {
          name: field.title,
          value: `custom_field_${field.id}`,
          selected: false
        }
      })
    })
  }
}
</script>

<style scoped></style>
