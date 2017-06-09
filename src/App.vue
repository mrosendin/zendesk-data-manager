<template>
  <div id="app">
    <div class="container is-fluid">

      <app-header/>

      <div class="columns">
        <div class="column">
          <router-view></router-view>
        </div>
      </div>

      <div class="columns results">
        <div class="column">
          <results :columns="columns"></results>
        </div>
      </div>

    </div>

    <app-footer/>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import Results from './components/Results.vue'
import AppFooter from './components/AppFooter.vue'
import bus from './bus.js'
import config from './config.js'

export default {
  name: 'app',
  components: { AppHeader, Results, AppFooter },
  data () {
    return {
      columns: [],
      menuOpen: false
    }
  },
  watch: {
    '$route' () {
      mixpanel.track(`Route changed to ${this.$route.path}.`)
      this.columns = []
    }
  },
  created () {
    // Get subdomain, current user information, etc.
    client.get('currentAccount').then(data => {
      config.currentAccount = data['currentAccount']
      client.get('currentUser').then(data => {
        config.currentUser = data['currentUser']
        mixpanel.identify(config.currentUser.id)
        mixpanel.people.set({
          '$email': config.currentUser.email,
          '$name': config.currentUser.name,
          '$role': config.currentUser.role,
          '$locale': config.currentUser.locale,
          '$avatar': config.currentUser.avatarUrl,
          '$subdomain': config.currentAccount.subdomain,
          '$plan_name': config.currentAccount.planName,
          '$last_login': new Date()
        })
        client.metadata().then(metadata => {
          config.settings = metadata.settings
          let token = localStorage.getItem('DataManagerToken')
          if (token) {
            console.log('Token is stored.')
            config.token = JSON.parse(token).full_token
          } else {
            let data = {
              token: {
                client_id: "63627",
                scopes: ["read", "write"]
              }
            }
            client.request({
              method: 'POST',
              url: `/api/v2/oauth/tokens.json`,
              contentType: 'application/json',
              data: JSON.stringify(data)
            }).then(data => {
              localStorage.setItem('DataManagerToken', JSON.stringify(data.token))
            }).catch(error => {
              console.log(error)
            })
          }
        })
      })
    })

    bus.$on('columnToggled', (columns) => {
      this.columns = columns
    })
  }
}
</script>

<style>
body {
  margin-top: 15px;
}
.heading {
  text-transform: none;
}
.results {
  display: block !important;
}
.center-inline-filters {
  margin: 0 auto;
}
.center-inline-filters > * {
  display: inline-block;
  margin: 10px;
  padding: 10px;
  border: 1px solid #eee;
}
</style>
