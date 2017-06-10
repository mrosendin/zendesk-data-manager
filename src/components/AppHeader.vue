<template>
  <div id="app-header">
    <section class="hero is-primary is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Data Manager
          </h1>
          <h2 class="subtitle">
            {{ tab }}
          </h2>
        </div>
      </div>
      <div class="hero-foot">
        <nav class="tabs is-centered is-boxed">
          <div class="container">
            <ul>
              <router-link to="/primary" tag="li" active-class="is-active"><a href="#">Primary</a></router-link>
              <router-link to="/metadata" tag="li" active-class="is-active"><a href="#">Metadata</a></router-link>
              <router-link to="/importer" tag="li" active-class="is-active"><a href="#"><i class="fa fa-cloud-upload"></i>&nbsp;Import</a></router-link>
              <router-link to="/documentation" tag="li" active-class="is-active"><a href="#"><i class="fa fa-book"></i>&nbsp;Documentation</a></router-link>
            </ul>
          </div>
        </nav>
      </div>
    </section>
    <nav class="nav has-shadow">
      <div class="container">
        <div class="nav-center">
          <template v-if="$route.path.indexOf('primary') > -1">
            <router-link to="/primary/tickets" class="nav-item is-tab" active-class="is-active">Tickets</router-link>
            <router-link to="/primary/users" class="nav-item is-tab" active-class="is-active">Users</router-link>
            <router-link to="/primary/organizations" class="nav-item is-tab" active-class="is-active">Organizations</router-link>
            <router-link to="/primary/groups" class="nav-item is-tab" active-class="is-active">Groups</router-link>
            <router-link to="/primary/articles" class="nav-item is-tab" active-class="is-active">Articles</router-link>
          </template>

          <template v-if="$route.path.indexOf('metadata') > -1">
            <router-link to="/metadata/automations" class="nav-item is-tab" active-class="is-active">Automations</router-link>
            <router-link to="/metadata/macros" class="nav-item is-tab" active-class="is-active">Macros</router-link>
            <router-link to="/metadata/triggers" class="nav-item is-tab" active-class="is-active">Triggers</router-link>
            <router-link to="/metadata/views" class="nav-item is-tab" active-class="is-active">Views</router-link>
          </template>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'app-header',
  data () {
    return {
      tab: 'Primary'
    }
  }
}
</script>

<style scoped>
#app-header {
  margin-bottom: 15px;
}
</style>
