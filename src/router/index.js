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
  console.log('from', from.path, 'to', to.path)
  if (store.state.Roles.length==0&&Cookies.get('login-token')) {
    // 有Cookie但是没有role
    store.commit('setToken', Cookies.get('login-token'))
    try {
      const current = await store.dispatch('currentAction')
      // console.log(current.data)
      store.commit('setUserInfo', current.data)
      if(!store.state.status){
        store.commit('altStatus')
      }
      const getRole = await store.dispatch('getRoleAction', {
        id: store.state.userInfo.id
      })
      await store.dispatch('addRoutes')
    } catch(err) {
      Cookies.remove('login-token')
      store.commit('resetToken')
      store.dispatch('addRoutes')
      next('/login')
    }
    // 如果获取用户信息成功
    if(store.state.userInfo) {
      next({...to})
    } else {
      store.commit('resetToken')
      store.dispatch('addRoutes')
      next('/login')
    }
  } else if(store.state.Roles.length>0) {
    // 有role
    if(to.path=="/register" || to.path=="/login") {
      next('/')
      return
    }
    next()
  } else {
    // 没cookie没role
    store.dispatch('addRoutes')
    // if (to.path=="/login" || to.path=="/register" || to.path=="/") {
    //   next()
    // } else {
    //   next('/login')
    // }
    next()
  }
})

router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
})

// 错误处理函数（主要处理Loding chunk 加载js文件失败）
router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = router.history.pending.fullPath;
  if (isChunkLoadFailed) {
   router.replace(targetPath);
  }
 });

export default router


