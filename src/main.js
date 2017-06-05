import App from './App.vue'
import Articles from './components/Articles.vue'
import Automations from './components/Automations.vue'
import Contact from './components/documentation/Contact.vue'
import Documentation from './components/documentation/Documentation.vue'
import Groups from './components/Groups.vue'
import Importer from './components/Importer.vue'
import Introduction from './components/documentation/Introduction.vue'
import Macros from './components/Macros.vue'
import Organizations from './components/Organizations.vue'
import Tickets from './components/Tickets.vue'
import Triggers from './components/Triggers.vue'
import Users from './components/Users.vue'
import Views from './components/Views.vue'

const router = new VueRouter({
  mode: 'history',
  scrollBehavior: function(to, from, savedPosition) {
    if (to.hash) return { selector: to.hash }
    else return { x: 0, y: 0 }
  },
  routes: [
    { path: '/index.html', redirect: '/articles' },
    { path: '/', redirect: '/articles' },
    { path: '/articles', component: Articles },
    { path: '/automations', component: Automations },
    { path: '/documentation', component: Documentation, children: [
      { path: '/', redirect: '/introduction' },
      { path: '/contact', component: Contact },
      { path: '/introduction', component: Introduction }
    ] },
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
