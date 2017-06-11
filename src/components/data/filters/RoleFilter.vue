<template>
  <div id="role-filter">

    <div class="field-label">
      <label class="label">Role</label>
    </div>
    <div class="field is-horizontal">
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control">
            <div class="select is-fullwidth">
              <select @change="update($event.target.value)">
                <option></option>
                <option value="end-user">End-user</option>
                <option value="agent">Agent</option>
                <option value="admin">Admin</option>
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
  name: 'role-filter',
  data () {
    return {
      role: ''
    }
  },
  methods: {
    update (value) {
      this.role = value
      bus.$emit('roleChanged', this.role)
    }
  }
}
</script>

<style scoped>
.field-label {
  text-align: left;
}
</style>
