<template>
  <div id="sidebar">
    <aside class="menu">
      <p class="menu-label">
        Manage
      </p>
      <ul class="menu-list">
        <li><router-link to="articles" active-class="is-active">Articles</router-link></li>
        <li><router-link to="automations" active-class="is-active">Automations</router-link></li>
        <li><router-link to="groups" active-class="is-active">Groups</router-link></li>
        <li><router-link to="macros" active-class="is-active">Macros</router-link></li>
        <li><router-link to="organizations" active-class="is-active">Organizations</router-link></li>
        <li><router-link to="tickets" active-class="is-active">Tickets</router-link></li>
        <li><router-link to="triggers" active-class="is-active">Triggers</router-link></li>
        <li><router-link to="users" active-class="is-active">Users</router-link></li>
        <li><router-link to="views" active-class="is-active">Views</router-link></li>
      </ul>
      <p class="menu-label">
        Import
      </p>
      <ul class="menu-list">
        <li><router-link to="import" active-class="is-active">New</router-link></li>
      </ul>
    </aside>
  </div>
</template>

<script>
export default {
  name: 'sidebar'
}
</script>

<style scoped></style>
