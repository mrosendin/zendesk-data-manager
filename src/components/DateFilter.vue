<template>
  <div id="date-filter">

    <div class="field-label">
      <label class="label">Date</label>
    </div>
    <div class="field is-horizontal">
      <div class="field-body">
        <div class="field is-grouped is-narrow">
          <div class="control">
            <div class="select is-fullwidth">
              <select @change="update('type', $event.target.value)">
                <option></option>
                <option value="created">Created</option>
                <option value="updated">Updated</option>
              </select>
            </div>
          </div>
        </div>

        <div class="field is-narrow">
          <div class="control">
            <div class="select is-fullwidth">
              <select @change="update('operator', $event.target.value)">
                <option></option>
                <option value=":"> = </option>
                <option value=">"> &gt; </option>
                <option value="<"> &lt; </option>
              </select>
            </div>
          </div>
        </div>

        <div class="field">
          <p class="control is-expanded has-icons-left">
            <input class="input" type="date" @change="update('value', $event.target.value)">
            <span class="icon is-small is-left">
              <i class="fa fa-calendar"></i>
            </span>
          </p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import bus from '../bus.js'

export default {
  name: 'date-filter',
  data () {
    return {
      date: {
        type: '',
        operator: '',
        value: ''
      }
    }
  },
  methods: {
    update (key, value) {
      this.date[key] = value
      bus.$emit('dateChanged', this.date)
    }
  }
}
</script>

<style scoped>
.field-label {
  text-align: left;
}
</style>
