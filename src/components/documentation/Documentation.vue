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
            <!-- <li>
              <router-link to="/documentation/importing-data" active-class="is-active">Importing Data</router-link>
              <ul>
                <li><router-link to="/documentation/importing-data#limitations" active-class="is-active">Limitations</router-link></li>
                <li><router-link to="/documentation/importing-data#formatting" active-class="is-active">Formatting</router-link></li>
                <li><router-link to="/documentation/importing-data#examples" active-class="is-active">Examples</router-link></li>
              </ul>
            </li> -->
            <li>
              <router-link to="/documentation/examples" active-class="is-active">Advanced Search</router-link>
              <ul>
                <li><router-link to="/documentation/examples#exact-wording" active-class="is-active">Exact wording</router-link></li>
                <li><router-link to="/documentation/examples#term-exclusion" active-class="is-active">Term exclusion</router-link></li>
                <li><router-link to="/documentation/examples#logical-and" active-class="is-active">Logical AND</router-link></li>
                <li><router-link to="/documentation/examples#logical-or" active-class="is-active">Logical OR</router-link></li>
                <li><router-link to="/documentation/examples#wildcard-operator" active-class="is-active">Wildcard operator</router-link></li>
                <li><router-link to="/documentation/examples#shorthand-values" active-class="is-active">Shorthand values</router-link></li>
              </ul>
            </li>
            <li>
              <router-link to="/documentation/release-notes" active-class="is-active">Release Notes</router-link>
            </li>
          </ul>
          <p class="menu-label">
            Help
          </p>
          <ul class="menu-list">
            <li><router-link to="/documentation/contact" active-class="is-active">Contact</router-link></li>
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
