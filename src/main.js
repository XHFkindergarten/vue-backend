// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
// 引入axios
import axios from 'axios'
import qs from 'qs'
import keys from './common'
if(process.env.NODE_ENV == 'development'){
  // 开发环境的后台请求URL
  axios.defaults.baseURL = keys.devHost
}else {
  // 线上环境的后台请求URL
  axios.defaults.baseURL = ''
}
console.log(keys.devHost)
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
// 引入全局配置(请求地址)


Vue.config.productionTip = false

// 引入vuex store
import store from './vuex'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
