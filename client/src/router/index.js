import Vue from 'vue'
import Router from 'vue-router'
import {Message} from 'element-ui'
import index from '@/pages/home/index.vue'
import login from '@/pages/home/login.vue'
import usercenter from '@/pages/home/usercenter.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      meta: {
        requireLogin: false
      }
    }, {
      path: '/login',
      name: 'login',
      component: login
    }, {
      path: '/usercenter',
      name: 'usercenter',
      component: usercenter
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireLogin)) {
    // 判断是否需要登录权限
    if (window.localStorage.getItem('loginUserBaseInfo')) {
      // 判断是否登录
      let lifeTime =
        JSON.parse(window.localStorage.getItem('loginUserBaseInfo')).lifeTime *
        1000
      let nowTime = (new Date()).getTime() // 当前时间的时间戳
      if (nowTime < lifeTime) {
        next()
      } else {
        Message({
          showClose: true,
          message: '登录状态信息过期,请重新登录',
          type: 'error'
        })
        next({
          path: '/login'
        })
      }
    } else {
      // 没登录则跳转到登录界面
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})

export default router
