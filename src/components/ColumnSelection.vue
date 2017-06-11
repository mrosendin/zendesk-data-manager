<template>
  <div id="column-selection" class="box">

    <div class="content has-text-centered">
      <h4 class="title is-4" class="header">Column Selection</h4>
    </div>

    <h5 class="title is-5">System Fields</h5>
    <div class="columns">
      <div class="column">
        <div class="field is-horizontal">
          <div class="field-body wrap">
            <div class="field is-grouped no-grow" v-for="column in columns">
              <p class="control">
                <label class="checkbox">
                  <input type="checkbox" v-model="column.selected">
                  {{column.name}}
                </label>
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
                  <label class="checkbox">
                    <input type="checkbox" v-model="customField.selected">
                    {{customField.name}}
                  </label>
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
export default {
  name: 'column-selection',
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
