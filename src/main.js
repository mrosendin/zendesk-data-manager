import App from './App.vue'
import Articles from './components/Articles.vue'
import Automations from './components/Automations.vue'
import Documentation from './components/Documentation.vue'
import Groups from './components/Groups.vue'
import Macros from './components/Macros.vue'
import Organizations from './components/Organizations.vue'
import Tickets from './components/Tickets.vue'
import Users from './components/Users.vue'

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/articles' },
    { path: '/articles', component: Articles },
    { path: '/automations', component: Automations },
    { path: '/documentation', component: Documentation },
    { path: '/groups', component: Groups },
    { path: '/macros', component: Macros },
    { path: '/organizations', component: Organizations },
    { path: '/tickets', component: Tickets },
    { path: '/users', component: Users }
  ]
})

new Vue({
  el: '#root',
  router,
  components: { App },
  template: '<App/>'
})
