<template>
  <div id="import">

    <div class="content has-text-centered">
      <h4 class="title is-4" class="header">Import Data</h4>
    </div>

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
import Dropzone from 'vue2-dropzone'

// See https://github.com/rowanwins/vue-dropzone for more information.

export default {
  name: 'import',
  components: { Dropzone }
}
</script>
