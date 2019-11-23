<template>
  <div id="advanced-search" class="has-text-centered">

    <div class="columns">
      <div class="center-inline-filters">

        <div id="sortBy">
          <div class="field-label">
            <label class="label">Sort by</label>
          </div>
          <div class="field is-horizontal">
            <div class="field-body">
              <div class="field is-narrow">
                <div class="control">
                  <div class="select is-fullwidth">
                    <select v-model="sortBy">
                      <option value="relevance">Relevance</option>
                      <option value="created_at">Created At</option>
                      <option value="updated_at">Updated At</option>
                      <option value="priority" v-if="type === 'ticket'">Priority</option>
                      <option value="status" v-if="type === 'ticket'">Status</option>
                      <option value="ticket_type" v-if="type === 'ticket'">Ticket Type</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="order">
          <div class="field-label">
            <label class="label">Order</label>
          </div>
          <div class="field is-horizontal">
            <div class="field-body">
              <div class="field is-narrow">
                <div class="control">
                  <div class="select is-fullwidth">
                    <select v-model="order">
                      <option value="asc">Ascending</option>
                      <option value="desc">Descending</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="keywords">
          <div class="field-label">
            <label class="label">Keywords</label>
          </div>
          <div class="field is-horizontal">
            <div class="field-body">
              <div class="field is-narrow">
                <p class="control">
                  <input v-model="keywords" class="input" type="text" placeholder="Enter keywords">
                </p>
              </div>
            </div>
          </div>
        </div>

        <div id="search">
          <div class="field-label">
            <label class="label">&nbsp;</label>
          </div>
          <div class="field is-horizontal">
            <div class="field-body">
              <div class="field is-narrow">
                <p class="control">
                  <a class="button is-primary" @click="search">
                    Search
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div class="columns">
      <div class="column">
        <template v-if="query">
          Search string: <code>{{query}}</code>
        </template>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <div class="notification is-danger" v-if="error">
          <button class="delete" @click="error = ''"></button>
            {{error}}
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import bus from "../../../common/bus.js";

const reduce = Function.bind.call(Function.call, Array.prototype.reduce);
const isEnumerable = Function.bind.call(
  Function.call,
  Object.prototype.propertyIsEnumerable
);
const concat = Function.bind.call(Function.call, Array.prototype.concat);
const keys = Reflect.ownKeys;

if (!Object.values) {
  Object.values = function values(O) {
    return reduce(
      keys(O),
      (v, k) =>
        concat(v, typeof k === "string" && isEnumerable(O, k) ? [O[k]] : []),
      []
    );
  };
}

export default {
  name: "advanced-search",
  data() {
    return {
      keywords: "",
      error: "",
      date1: "",
      date2: "",
      status: "",
      priority: "",
      ticketType: "",
      role: "",
      sortBy: "",
      order: ""
    };
  },
  computed: {
    query() {
      let result = [`type:${this.type}`];
      if (this.keywords) result.push(`${this.keywords}`);
      if (this.date1) result.push(`${this.date1}`);
      if (this.date2) result.push(`${this.date2}`);
      if (this.status) result.push(`${this.status}`);
      if (this.priority) result.push(`${this.priority}`);
      if (this.ticketType) result.push(`${this.ticketType}`);
      if (this.role) result.push(`${this.role}`);
      for (var key in this.filters) {
        if (this.filters[key]) result.push(`${key}:${this.filters[key]}`);
      }
      result = `${result.join(" ")}`;
      return result;
    }
  },
  created() {
    let temp;
    bus.$on("dateChanged", date => {
      let index = date.index;
      delete date.index;
      if (date.operator && date.type && date.value) {
        this[`date${index}`] = Object.values(date).join("");
      } else {
        this[`date${index}`] = "";
      }
    });
    bus.$on("statusChanged", status => {
      if (status.operator && status.value) {
        temp = Object.values(status);
        temp.unshift("status");
        this.status = temp.join("");
      } else {
        this.status = "";
      }
    });
    bus.$on("priorityChanged", priority => {
      if (priority.operator && priority.value) {
        temp = Object.values(priority);
        temp.unshift("priority");
        this.priority = temp.join("");
      } else {
        this.priority = "";
      }
    });
    bus.$on("ticketTypeChanged", ticketType => {
      if (ticketType) {
        this.ticketType = `ticket_type:${ticketType}`;
      } else {
        this.ticketType = "";
      }
    });
    bus.$on("roleChanged", role => {
      if (role) {
        this.role = `role:${role}`;
      } else {
        this.role = "";
      }
    });
  },
  methods: {
    search() {
      mixpanel.track(`Searching for ${this.type}`);

      let url = `/api/v2/search.json?query=${encodeURIComponent(this.query)}`;
      if (this.sortBy) url += `&sort_by=${this.sortBy}`;
      if (this.order) url += `&sort_order=${this.order}`;
      bus.$emit("url", url);
      client
        .request(url)
        .then(data => {
          this.onFetch(data.results, data.count);
        })
        .catch(error => {
          this.error = error.responseJSON.description;
        });
    }
  },
  props: {
    type: {
      type: String
    },
    filters: {
      type: Object,
      default: () => {}
    },
    onFetch: {
      type: Function
    }
  }
};
</script>

<style scoped>
#sortBy,
#order,
#search {
  border: none !important;
  width: 150px;
}
#keywords {
  border: none !important;
  width: 250px;
}
.field-label {
  text-align: left;
}
</style>
