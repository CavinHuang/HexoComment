import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/home/index.vue'
import login from '@/pages/home/login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    }, {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
