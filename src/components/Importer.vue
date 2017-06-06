<template>
  <div id="importer">

    <heading>
      <h4 slot="header" class="title is-4">Import Data</h4>
    </heading>

    <dropzone id="vue-dropzone" :use-font-awesome="true" :language="{dictDefaultMessage: '<br>Drop files here to upload (CSV or JSON supported)'}" :acceptedFileTypes="'application/json,text/csv'" url="http://locahost:3000/api/data-manager/import" v-on:vdropzone-success="showSuccess = true">
      <input type="hidden" name="token" value="K91qBvmpEJzgvlgqPSBF">
    </dropzone>

    <div class="notification is-success" v-if="showSuccess">
      <button class="delete" @click="showSuccess = false"></button>
      Success! The file has been imported to your account.
    </div>

  </div>
</template>

<script>
import Heading from './Heading.vue'
import Dropzone from 'vue2-dropzone'

// See https://github.com/rowanwins/vue-dropzone for more information.

export default {
  name: 'importer',
  components: { Heading, Dropzone }
}
</script>
