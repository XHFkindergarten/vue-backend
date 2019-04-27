import Vue from 'vue'
import Router from 'vue-router'
// 引入同步路由
import { constantRouterMap } from './constantRouterMap'
// 引入异步路由
import { asyncRouterMap } from './asyncRouterMap'


import Cookies from 'js-cookie'

Vue.use(Router)




let router =  new Router({
  routes: constantRouterMap
})

import store from '@/vuex'
import keys from '@/common';
// 挂载全局前置钩子函数

router.beforeEach( async (to, from, next) => {
  console.log(from.path, to.path) 
  if (store.state.Roles.length==0&&Cookies.get('login-token')) {
    // 有Cookie但是没有role
    store.commit('setToken', Cookies.get('login-token'))
    const userInfo = await store.dispatch('currentAction')
    if(userInfo) {
      console.log('get info')
      next({...to})
    } else {
      store.commit('resetToken')
      store.dispatch('addRoutes')
      next('/login')
    }
  } else if(store.state.Roles.length>0) {
    console.log('here')
    // 有role
    console.log(to.path)
    if(to.path=="/register" || to.path=="/login") {
      next('/')
      return
    }
    next()
  } else {
    // 没cookie没role
    if (to.path=="/login") {
      next()
    } else {
      next('/login')
    }
  }
})

// router.beforeEach((to,from,next) => {
//   console.log(from.path, to.path)
//   // 如果没有加载路由菜单，那么加载路由菜单
//   if (store.state.routes.length==0) {
//     store.dispatch('addRoutes')
//     next({...to})
//   }
//   if (to.path=='/403' || to.path=='/404') {
//     next({...to})
//   }
//   console.log(store.state.Roles)
//   if (store.state.Roles.length==0) {
//     const token = Cookies.get('login-token')
//     if (token!=''&&token!=undefined) {
//       store.commit('setToken', token)
//       if(store.state.userInfo.name==undefined) {
//         store.dispatch('currentAction')
//           .then(res => {
//             next({...to})
//           })
//           .catch(() => {
//             store.commit('resetToken')
//             Cookies.remove('login-token')
//             if (to.path=='/login' || to.path=='/register' || whiteList.indexOf(to.path)>=0) {
//               next({...to})
//             }
//           })
//       }
//     } else {
//       // 有token了，也就是有role的情况下
//       next({...to})
//       // if (to.path=="/login" || to.path=="/register" || keys.whiteList.indexOf(to.path)>=0) {
//       //   next()
//       // } else {
//       //   // 没有token,没有role
//       //   next()
//       //   // if (store.getters.getRoutesPath.indexOf(to.path)>=0) {
//       //   //   if(store.state.routesPaths.indexOf(to.path)<0) {
//       //   //     next('/403')
//       //   //   } else {
//       //   //     next()
//       //   //   }
//       //   // } else {
//       //   //   next('/404')
//       //   // }
//       // }
//     }
//   } else {
//     if (to.path=='/login' || to.path=='/register') {
//       next('/',{replace:true})  //TODO 始终无法跳转到/路由
//     }
//     if (to.path=='/') {
//       next()
//     }
//     next()
//     // if (store.getters.getRoutesPath.indexOf(to.path)>=0) {
//     //   if(store.state.routesPaths.indexOf(to.path)<0) {
//     //     next('/403')
//     //   } else {
//     //     next()
//     //   }
//     // } else {
//     //   next('/404')
//     // }
//   }
// })

export default router


