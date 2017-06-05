import App from './App.vue'
import Articles from './components/Articles.vue'
import Automations from './components/Automations.vue'
import Documentation from './components/Documentation.vue'
import Groups from './components/Groups.vue'
import Importer from './components/Importer.vue'
import Macros from './components/Macros.vue'
import Organizations from './components/Organizations.vue'
import Tickets from './components/Tickets.vue'
import Triggers from './components/Triggers.vue'
import Users from './components/Users.vue'
import Views from './components/Views.vue'

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/articles' },
    { path: '/articles', component: Articles },
    { path: '/automations', component: Automations },
    { path: '/documentation', component: Documentation },
    { path: '/groups', component: Groups },
    { path: '/importer', component: Importer },
    { path: '/macros', component: Macros },
    { path: '/organizations', component: Organizations },
    { path: '/tickets', component: Tickets },
    { path: '/triggers', component: Triggers },
    { path: '/users', component: Users },
    { path: '/views', component: Views },
  ]
})

new Vue({
  el: '#root',
  router,
  components: { App },
  template: '<App/>'
})
