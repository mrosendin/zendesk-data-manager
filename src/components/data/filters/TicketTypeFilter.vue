<template>
  <div id="ticket-type-filter">

    <div class="field-label">
      <label class="label">Type</label>
    </div>
    <div class="field is-horizontal">
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control">
            <div class="select is-fullwidth">
              <select @change="update($event.target.value)">
                <option></option>
                <option value="question">Question</option>
                <option value="problem">Problem</option>
                <option value="incident">Incident</option>
                <option value="task">Task</option>
              </select>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import bus from '../../../common/bus.js'

export default {
  name: 'ticket-type-filter',
  data () {
    return {
      ticketType: ''
    }
  },
  methods: {
    update (value) {
      this.ticketType = value
      bus.$emit('ticketTypeChanged', this.ticketType)
    }
  }
}
</script>

<style scoped>
.field-label {
  text-align: left;
}
#ticket-type-filter {
  width: 145px;
}
</style>
