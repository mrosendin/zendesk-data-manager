import App from './App.vue'
import Articles from './components/Articles.vue'
import Groups from './components/Groups.vue'
import Organizations from './components/Organizations.vue'
import Tickets from './components/Tickets.vue'
import Users from './components/Users.vue'

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/articles' },
    { path: '/articles', component: Articles },
    { path: '/groups', component: Groups },
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
