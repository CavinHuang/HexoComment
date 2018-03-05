// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import iView from 'iview'
import App from './App'
import router from './router'
import store from './store'
import '@/assets/css/index.css'
// import '@/assets/css/common.css'
import '@/errorLog' // error log
import {post, fetch, patch, put} from './utils/http'
import 'element-ui/lib/theme-chalk/index.css'

import Add from './components/add'
import Spots from './components/spots'
import Header from './components/header'
import Loading from './components/loading'
import Placeholder from './components/placeholder'
import KeyboardShort from './components/keyboard-short'

Vue.component(Add.name, Add)
Vue.component(Spots.name, Spots)
Vue.component(Header.name, Header)
Vue.component(Loading.name, Loading)
Vue.component(Placeholder.name, Placeholder)
Vue.component(KeyboardShort.name, KeyboardShort)

Vue.use(iView)
Vue.use(require('v-click-outside'))
Vue.use(require('vue-shortkey'), {
  prevent: ['input', 'textarea']
})

Vue.config.productionTip = true
// 定义全局变量
Vue.prototype.$post = post
Vue.prototype.$fetch = fetch
Vue.prototype.$patch = patch
Vue.prototype.$put = put

Vue.mixin({
  data () {
    return {
      pageAnimated: false
    }
  },
  mounted () {
    this.pageAnimated = true
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
