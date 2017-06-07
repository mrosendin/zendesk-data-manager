<template>
  <div id="documentation">
    <div class="columns">
      <div class="column is-2">
        <aside class="menu">
          <p class="menu-label">
            General
          </p>
          <ul class="menu-list">
            <li>
              <router-link to="/documentation/introduction" active-class="is-active">Introduction</router-link>
              <ul>
                <li><router-link to="/documentation/introduction#features" active-class="is-active">Features</router-link></li>
              </ul>
            </li>
            <li>
              <router-link to="/documentation/importing-data" active-class="is-active">Importing Data</router-link>
              <ul>
                <li><router-link to="/documentation/importing-data#limitations" active-class="is-active">Limitations</router-link></li>
                <li><router-link to="/documentation/importing-data#formatting" active-class="is-active">Formatting</router-link></li>
                <li><router-link to="/documentation/importing-data#examples" active-class="is-active">Examples</router-link></li>
              </ul>
            </li>
            <li>
              <router-link to="/documentation/examples" active-class="is-active">Search Examples</router-link>
              <ul>
                <li><router-link to="/documentation/examples#articles" active-class="is-active">Articles</router-link></li>
                <li><router-link to="/documentation/examples#automations" active-class="is-active">Automations</router-link></li>
                <li><router-link to="/documentation/examples#groups" active-class="is-active">Groups</router-link></li>
                <li><router-link to="/documentation/examples#macros" active-class="is-active">Macros</router-link></li>
                <li><router-link to="/documentation/examples#organizations" active-class="is-active">Organizations</router-link></li>
                <li><router-link to="/documentation/examples#tickets" active-class="is-active">Tickets</router-link></li>
                <li><router-link to="/documentation/examples#triggers" active-class="is-active">Triggers</router-link></li>
                <li><router-link to="/documentation/examples#users" active-class="is-active">Users</router-link></li>
                <li><router-link to="/documentation/examples#views" active-class="is-active">Views</router-link></li>
                <li><router-link to="/documentation/examples#views" active-class="is-active">Views</router-link></li>
              </ul>
            </li>
          </ul>
          <p class="menu-label">
            Help
          </p>
          <ul class="menu-list">
            <li><router-link to="/contact" active-class="is-active">Contact</router-link></li>
          </ul>
        </aside>
      </div>
      <div class="column is-10">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'documentation'
}
</script>
