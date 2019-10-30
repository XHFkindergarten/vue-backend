import Vue from 'vue'
import Router from 'vue-router'
// 引入同步路由
import { constantRouterMap } from './constantRouterMap'
// 引入异步路由
import { asyncRouterMap } from './asyncRouterMap'


import Cookies from 'js-cookie'

Vue.use(Router)




let router =  new Router({
  routes: constantRouterMap,
  // !!使用了组件的keep-alive缓存机制就不需要这个滚动条高度了
  // // 控制滚动条位置
  // scrollBehavior(to, from, savePosition) {
  //   // saveProsition只有在history前进或后退时不为null
  //   // 如果浏览器没有pushState对象的话就打扰了 ^ ^
  //   // 值为上一个/下一个页面上一次滚动条停留的位置

  //   /*
  //   * 以下路由的页面高度和内容是异步加载的，所以这里通过Promise异步移动
  //   */
  //   if (savePosition && ['/daily', '/articleList', '/article'].indexOf(to.path)>=0) {
  //     return new Promise((resolve, reject) => {
  //       setTimeout(() => {
  //         resolve(savePosition)
  //       }, 1000)
  //     })
  //   } else if (savePosition) {
  //     // 非异步页面直接滚动
  //     return savePosition
  //   } else return {x:0, y:0}
  // }
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

// router.afterEach((to,from,next) => {
//   window.scrollTo(0,0);
// })


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


