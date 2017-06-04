<template>
  <div id="priority-filter">

    <div class="field-label">
      <label class="label">Priority</label>
    </div>
    <div class="field is-horizontal">
      <div class="field-body">
        <div class="field is-grouped is-narrow">
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

        <div class="field is-narrow">
          <div class="control">
            <div class="select is-fullwidth">
              <select @change="update('value', $event.target.value)">
                <option></option>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="normal">Normal</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import bus from '../bus.js'

export default {
  name: 'priority-filter',
  data () {
    return {
      priority: {
        operator: '',
        value: ''
      }
    }
  },
  methods: {
    update (key, value) {
      this.priority[key] = value
      bus.$emit('priorityChanged', this.priority)
    }
  }
}
</script>

<style scoped>
.field-label {
  text-align: left;
}
</style>
