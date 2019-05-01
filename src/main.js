// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

// 引入路由实例
import router from './router'

// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// // 引入 markdown编辑器 mevon-editor
import mavonEditor from 'mavon-editor'
// // 引入样式
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)


// 引入全局配置(请求地址)
import keys from './common'

// 引入axios
// import axios from 'axios'
import qs from 'qs'
// if(process.env.NODE_ENV == 'development'){
//   // 开发环境的后台请求URL
//   axios.defaults.baseURL = keys.devHost
// }else {
//   // 线上环境的后台请求URL
//   axios.defaults.baseURL = keys.prdHost
// }
// axios.defaults.timeout = 5000 // 请求超时时间
import service from '@/axios'
Vue.prototype.$axios = service
Vue.prototype.$qs = qs


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
