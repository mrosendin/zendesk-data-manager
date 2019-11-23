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
          <datepicker wrapper-class="control is-expanded" @selected="onDefaultDatepickerSelected" input-class="input" placeholder="Choose a date" v-if="!useDefault"></datepicker>
          <p class="control is-expanded has-icons-left" v-if="useDefault">
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
import bus from "../../../common/bus.js";
import Datepicker from "vuejs-datepicker";

export default {
  name: "date-filter",
  components: { Datepicker },
  data() {
    return {
      date: {
        type: "",
        operator: "",
        value: ""
      },
      useDefault: true
    };
  },
  methods: {
    update(key, value) {
      this.date[key] = value;
      this.date.index = this.index;
      bus.$emit("dateChanged", this.date);
    },
    onDefaultDatepickerSelected(date) {
      date = date.toISOString().split("T")[0];
      this.date.value = date;
      bus.$emit("dateChanged", this.date);
    }
  },
  created() {
    // Detect missing browser features and update as necessary
    if (!Modernizr.inputtypes.date) {
      this.useDefault = false;
    }
  },
  props: {
    index: Number
  }
};
</script>

<style scoped>
.field-label {
  text-align: left;
}
#date-filter {
  width: 430px;
}
</style>
