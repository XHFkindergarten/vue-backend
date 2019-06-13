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

import $ from 'jquery'

// 引入axios
// import axios from 'axios'
import qs from 'qs'
import service from '@/axios'
Vue.prototype.$axios = service
Vue.prototype.$qs = qs


import hljs from 'highlight.js'
import 'highlight.js/styles/googlecode.css' //样式文件
Vue.directive('highlight',function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block)=>{
    hljs.highlightBlock(block)
  })
})


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
