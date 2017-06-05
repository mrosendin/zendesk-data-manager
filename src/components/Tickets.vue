<template>
  <div id="tickets">

    <div class="box">
      <heading>
        <h4 slot="header" class="title is-4">Ticket Filters</h4>
      </heading>

      <div class="columns">
        <div class="center-inline-filters">
          <status-filter></status-filter>
          <priority-filter></priority-filter>
          <date-filter></date-filter>
          <ticket-type-filter></ticket-type-filter>
        </div>
      </div>

      <div class="columns">
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
            <label class="label">Commenter</label>
            <p class="control">
              <input class="input" type="text" v-model="filters.commenter">
            </p>
          </div>
        </div>
        <div class="column is-3">
          <div class="field">
            <label class="label">Subject</label>
            <p class="control">
              <input class="input" type="text" v-model="filters.subject">
            </p>
          </div>
        </div>
      </div>

      <div class="columns">
        <div class="column is-3">
          <div class="field">
            <label class="label">Tags</label>
            <p class="control">
              <input class="input" type="text" v-model="filters.tags">
            </p>
          </div>
        </div>
        <div class="column is-3">
          <div class="field">
            <label class="label">Assignee</label>
            <p class="control">
              <input class="input" type="text" v-model="filters.assignee">
            </p>
          </div>
        </div>
        <div class="column is-3">
          <div class="field">
            <label class="label">Requester</label>
            <p class="control">
              <input class="input" type="text" v-model="filters.requester">
            </p>
          </div>
        </div>
        <div class="column is-3">
          <div class="field">
            <label class="label">Collaborator(s)</label>
            <p class="control">
              <input class="input" type="text" v-model="filters.cc">
            </p>
          </div>
        </div>
      </div>

      <div class="columns">
        <div class="column is-3">
          <div class="field">
            <label class="label">Description</label>
            <p class="control">
              <input class="input" type="text" v-model="filters.description">
            </p>
          </div>
        </div>
        <div class="column is-3">
          <div class="field">
            <label class="label">Channel</label>
            <div class="control">
              <div class="select is-fullwidth">
                <select v-model="filters.via">
                  <option></option>
                  <option></option>
                  <option value="mail">E-Mail</option>
                  <option value="get_satisfaction">Get Satisfaction</option>
                  <option value="dropbox">Dropbox</option>
                  <option value="chat">Chat</option>
                  <option value="twitter_dm">Twitter DM</option>
                  <option value="twitter_fav">Twitter Fav</option>
                  <option value="twitter_like">Twitter Like</option>
                  <option value="twitter">Twitter</option>
                  <option value="voicemail">Voicemail</option>
                  <option value="phone_call_inbound">Phone Call Inbound</option>
                  <option value="phone_call_outbound">Phone Call Outbound</option>
                  <option value="phone">Phone</option>
                  <option value="sms">SMS</option>
                  <option value="api">API</option>
                  <option value="logmein">LogMeIn</option>
                  <option value="facebook_post">Facebook Post</option>
                  <option value="facebook_message">Facebook Message</option>
                  <option value="facebook">Facebook</option>
                  <option value="web">Web</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-3">
          <div class="field">
            <label class="label">Brand</label>
            <p class="control">
              <input class="input" type="text" v-model="filters.brand">
            </p>
          </div>
        </div>
        <div class="column is-3">
          <div class="field">
            <label class="label">Field Value</label>
            <p class="control">
              <input class="input" type="text" v-model="filters.fieldvalue">
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

    <advanced-search type="ticket" :filters="filters"></advanced-search>
</template>

<script>
import Heading from './Heading.vue'
import DateFilter from './DateFilter.vue'
import StatusFilter from './StatusFilter.vue'
import PriorityFilter from './PriorityFilter.vue'
import TicketTypeFilter from './TicketTypeFilter.vue'
import ColumnSelection from './ColumnSelection.vue'
import AdvancedSearch from './AdvancedSearch.vue'
import bus from '../bus.js'

export default {
  name: 'tickets',
  components: { Heading, StatusFilter, PriorityFilter, TicketTypeFilter, DateFilter, ColumnSelection, AdvancedSearch },
  data () {
    return {
      columns: [
        { name: 'Id', value: 'id', selected: true },
        { name: 'Subject', value: 'subject', selected: true },
        { name: 'Type', value: 'type', selected: true },
        { name: 'Group Id', value: 'group_id', selected: true },
        { name: 'Assignee Id', value: 'assignee_id', selected: true, sideload: {type: 'users'} },
        { name: 'Requester Id', value: 'requester_id', selected: true, sideload: {type: 'users'} },
        { name: 'Status', value: 'status', selected: true },
        { name: 'Priority', value: 'priority', selected: true },
        { name: 'Created At', value: 'created_at', selected: true },
        { name: 'Updated At', value: 'updated_at', selected: true },
        { name: 'External Id', value: 'external_id', selected: false },
        { name: 'Channel', value: 'channel', selected: false },
        { name: 'Description', value: 'description', selected: false },
        { name: 'Recipient', value: 'recipient', selected: false },
        { name: 'Submitter Id', value: 'submitter_id', selected: false, sideload: {type: 'users'} },
        { name: 'Organization Id', value: 'organization_id', selected: false, sideload: {type: 'organizations'} },
        { name: 'Collaborator Ids', value: 'collaborator_ids', selected: false, sideload: {type: 'users'} },
        { name: 'Forum Topic Id', value: 'forum_topic_id', selected: false },
        { name: 'Problem Id', value: 'problem_id', selected: false },
        { name: 'Due At', value: 'due_at', selected: false },
        { name: 'Brand Id', value: 'brand_id', selected: false },
        { name: 'Has Incidents', value: 'has_incidents', selected: false },
        { name: 'Tags', value: 'tags', selected: false },
        { name: 'Satisfaction Rating', value: 'satisfaction_rating', selected: false }
      ],
      customFields: [],
      filters: {
        group: '',
        organization: '',
        commenter: '',
        subject: '',
        tags: '',
        assignee: '',
        requester: '',
        cc: '',
        description: '',
        via: '',
        brand: '',
        fieldvalue: ''
      }
    }
  },
  updated () {
    bus.$emit('columnToggled', this.columns.concat(this.customFields))
  },
  beforeCreate () {
    let defaultFields = ['subject', 'description', 'status', 'tickettype', 'priority', 'group', 'assignee'];
    client.request('/api/v2/ticket_fields.json').then((data) => {
      let customFields = data.ticket_fields.filter((field) => {
        return !defaultFields.includes(field.type) && field.active;
      });
      this.customFields = customFields.map((field) => {
        return {
          name: field.title,
          value: `custom_field_${field.id}`,
          selected: false
        };
      });
    });
  }
}
</script>
