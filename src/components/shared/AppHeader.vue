<template>
  <div id="app-header">
    <section class="hero is-primary is-bold">
      <div class="hero-body">
        <div class="container"></div>
      </div>
      <div class="hero-foot">
        <nav class="tabs is-centered is-boxed">
          <div class="container">
            <ul>
              <router-link to="/data" tag="li" active-class="is-active"><a href="#"><i class="fa fa-database"></i>&nbsp;Data</a></router-link>
              <router-link to="/metadata" tag="li" active-class="is-active"><a href="#"><i class="fa fa-cubes"></i>&nbsp;Metadata</a></router-link>
              <!-- <router-link to="/import" tag="li" active-class="is-active"><a href="#"><i class="fa fa-cloud-upload"></i>&nbsp;Import</a></router-link> -->
              <router-link to="/documentation" tag="li" active-class="is-active"><a href="#"><i class="fa fa-book"></i>&nbsp;Docs</a></router-link>
            </ul>
          </div>
        </nav>
      </div>
    </section>
    <nav class="nav has-shadow">
      <div class="container">
        <div class="nav-center">
          <template v-if="$route.path.indexOf('data') === 1">
            <router-link to="/data/tickets" class="nav-item is-tab" active-class="is-active">Tickets</router-link>
            <router-link to="/data/users" class="nav-item is-tab" active-class="is-active">Users</router-link>
            <router-link to="/data/organizations" class="nav-item is-tab" active-class="is-active">Organizations</router-link>
            <router-link to="/data/groups" class="nav-item is-tab" active-class="is-active">Groups</router-link>
            <!-- <router-link to="/data/articles" class="nav-item is-tab" active-class="is-active">Articles</router-link> -->
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
  name: 'app-header'
}
</script>

<style scoped>
#app-header {
  margin-bottom: 15px;
}
</style>
