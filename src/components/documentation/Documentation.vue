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
              <router-link to="/introduction" active-class="is-active">Introduction</router-link>
              <ul>
                <li><router-link to="/introduction#features" active-class="is-active">Features</router-link></li>
                <li><router-link to="/introduction#limitations" active-class="is-active">Limitations</router-link></li>
              </ul>
            </li>
            <li><router-link to="/importing-data" active-class="is-active">Importing Data</router-link></li>
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
</template>

<script>
export default {
  name: 'documentation'
}
</script>
