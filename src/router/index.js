import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Login from '@/components/Login'
import Register from '@/components/Register'

Vue.use(Router)


const router =  new Router({
  // beforeEach,
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      // 挂载单个路由钩子函数
      // beforeEnter: (to, from, next) => {

      // },
      // beforeLeave: (to, from, next) => {

      // }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    }
  ]
})

import store from '../vuex'

// 挂载全局前置钩子函数
router.beforeEach((to,from,next) => {
  // if (store.state.token) {
  //   if (to.path=="/login") {
  //     next('login')
  //   } else {
  //   }
  // }
  // store.dispatch('getRoleAction')
  next()
})

export default router
