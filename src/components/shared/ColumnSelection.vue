<template>
  <div id="column-selection" class="box">

    <div class="content has-text-centered">
      <h4 class="title is-4">Column Selection</h4>
    </div>

    <h5 class="title is-5">System Fields</h5>
    <div class="columns">
      <div class="column">
        <div class="field is-horizontal">
          <div class="field-body wrap">
            <div class="field is-grouped no-grow" v-for="column in columns">
              <p class="control">
                <column-button :selected="column.selected" @click.native="column.selected = !column.selected">
                  {{ column.name }}
                </column-button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <template v-if="customFields.length">
      <h5 class="title is-5">Custom Fields</h5>
      <div class="columns">
        <div class="column">
          <div class="field is-horizontal">
            <div class="field-body wrap">
              <div class="field is-grouped no-grow" v-for="customField in customFields">
                <p class="control">
                  <column-button :selected="customField.selected" @click.native="customField.selected = !customField.selected">
                    {{ customField.name }}
                  </column-button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

  </div>
</template>

<script>
import ColumnButton from './ColumnButton.vue'

export default {
  name: 'column-selection',
  components: { ColumnButton },
  props: {
    columns: {
      default: () => [],
      type: Array
    },
    customFields: {
      default: () => [],
      type: Array
    }
  }
}
</script>

<style scoped>
.wrap {
  flex-wrap: wrap;
}
.no-grow {
  flex-grow: 0 !important;
}
</style>
