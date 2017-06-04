<template>
  <div id="status-filter">

    <div class="field-label">
      <label class="label">Status</label>
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
                <option value="new">New</option>
                <option value="open">Open</option>
                <option value="pending">Pending</option>
                <option value="hold">On-hold</option>
                <option value="solved">Solved</option>
                <option value="closed">Closed</option>
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
  name: 'status-filter',
  data () {
    return {
      status: {
        operator: '',
        value: ''
      }
    }
  },
  methods: {
    update (key, value) {
      this.status[key] = value
      bus.$emit('statusChanged', this.status)
    }
  }
}
</script>

<style scoped>
.field-label {
  text-align: left;
}
</style>
