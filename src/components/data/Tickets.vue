<template>
  <div id="tickets">

    <div class="box">
      <div class="content has-text-centered">
        <h4 class="title is-4">Ticket Filters</h4>
      </div>

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
            <label class="label">Commenter</label>
            <p class="control">
              <p class="control has-icons-left">
               <typeahead :source="autocomplete.users" :onSelect="onSelect" :onChange="onChange" :limit="5" name="commenter"></typeahead>
               <span class="icon is-small is-left">
                 <i class="fa fa-magic"></i>
               </span>
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
            <p class="control has-icons-left">
             <typeahead :source="autocomplete.tags" :onSelect="onSelect" :onChange="onChange" :limit="5" name="tags"></typeahead>
             <span class="icon is-small is-left">
               <i class="fa fa-magic"></i>
             </span>
            </p>
          </div>
        </div>
        <div class="column is-3">
          <div class="field">
            <label class="label">Assignee</label>
            <p class="control">
              <p class="control has-icons-left">
               <typeahead :source="autocomplete.users" :onSelect="onSelect" :onChange="onChange" :limit="5" name="assignee" :async="true"></typeahead>
               <span class="icon is-small is-left">
                 <i class="fa fa-magic"></i>
               </span>
            </p>
          </div>
        </div>
        <div class="column is-3">
          <div class="field">
            <label class="label">Requester</label>
            <p class="control">
              <p class="control has-icons-left">
               <typeahead :source="autocomplete.users" :onSelect="onSelect" :onChange="onChange" :limit="5" name="requester" :async="true"></typeahead>
               <span class="icon is-small is-left">
                 <i class="fa fa-magic"></i>
               </span>
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

    <advanced-search type="ticket" :filters="filters" :onFetch="onFetch"></advanced-search>

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
        <results :columns="columns.concat(this.customFields)"
          :results="results"
          type="tickets"
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
import StatusFilter from './filters/StatusFilter.vue'
import PriorityFilter from './filters/PriorityFilter.vue'
import TicketTypeFilter from './filters/TicketTypeFilter.vue'
import Typeahead from 'vue-bulma-typeahead'
import ColumnSelection from '../shared/ColumnSelection.vue'
import AdvancedSearch from './shared/AdvancedSearch.vue'
import Results from '../shared/Results.vue'
import bus from '../../common/bus.js'
import columns from '../../common/columns.js'
import format from '../../common/format.js'

export default {
  name: 'tickets',
  components: {
    StatusFilter,
    PriorityFilter,
    TicketTypeFilter,
    DateFilter,
    Typeahead,
    ColumnSelection,
    AdvancedSearch,
    Results
  },
  data () {
    return {
      columns: columns.ticketColumns,
      results: [],
      resultCount: 0,
      perPage: 30,
      messages: {
        success: '',
        error: ''
      },
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
      },
      autocomplete: {
        organizations: [],
        users: [],
        tags: []
      }
    }
  },
  methods: {
    onFetch (results, resultCount) {
      format(results, 'tickets', this.columns).then(results => {
        this.results = results
        this.resultCount = resultCount
        this.perPage = 100
      })
    },
    onDelete (ids) {
      let count = ids.length
      ids.forEach((id) => {
        client.request({
          url: `/api/v2/tickets/destroy_many.json?ids=${ids.join(',')}`,
          method: 'DELETE'
        }).then(() => {
          this.resultCount--
          this.results = this.results.filter((result) => {
            return !ids.includes(result.id)
          })
          if (count > 1) this.messages.success = `${count} tickets have been deleted.`
          else this.messages.success = `${count} ticket has been deleted.`
        })
      })
    },
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
        if (response[resource].length) {
          this.autocomplete[resource] = (response[resource][0].hasOwnProperty('name') ? response[resource].map(item => item.name) : response[resource])
        }
      }).catch(error => {
        console.log(error)
      })
    },
    onSelect (value, name) {
      this.filters[name] = value
    }
  },
  mounted () {
    client.request('/api/v2/tickets.json').then(data => {
      format(data.tickets, 'tickets', this.columns).then(results => {
        this.results = results
        this.resultCount = data.count
        this.perPage = 30
      })
    }).catch(error => {
      console.log(error)
    })
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
