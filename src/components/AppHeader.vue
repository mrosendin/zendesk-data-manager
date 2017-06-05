<template>
  <div id="app-header">
    <nav class="nav has-shadow">
      <div class="container">
        <div class="nav-left">
          <router-link to="/articles" class="nav-item is-tab" active-class="is-active">Articles</router-link>
          <router-link to="/automations" class="nav-item is-tab" active-class="is-active">Automations</router-link>
          <router-link to="/groups" class="nav-item is-tab" active-class="is-active">Groups</router-link>
          <router-link to="/macros" class="nav-item is-tab" active-class="is-active">Macros</router-link>
          <router-link to="/organizations" class="nav-item is-tab" active-class="is-active">Organizations</router-link>
          <router-link to="/tickets" class="nav-item is-tab" active-class="is-active">Tickets</router-link>
          <router-link to="/triggers" class="nav-item is-tab" active-class="is-active">Triggers</router-link>
          <router-link to="/users" class="nav-item is-tab" active-class="is-active">Users</router-link>
          <router-link to="/views" class="nav-item is-tab" active-class="is-active">Views</router-link>
          <router-link to="/importer" class="nav-item is-tab" active-class="is-active"><i class="fa fa-cloud-upload"></i>&nbsp;Import</router-link>
          <router-link to="/documentation" class="nav-item is-tab" active-class="is-active"><i class="fa fa-book"></i>&nbsp;Documentation</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'app-header'
}
</script>

<style scoped>
#app-header {
  margin-bottom: 15px;
}
</style>
