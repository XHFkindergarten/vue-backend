import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Hello from '@/components/HelloWorld'
import NotFound from '@/layouts/404'
import NoPermission from '@/layouts/403'
import Test from '@/components/Test'
import Cookies from 'js-cookie'

Vue.use(Router)

// 同步挂载路由
export const constantRouterMap =  [
  {
    path: '/',
    name: 'Main',
    component: Main,
    hidden: true
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login,
    hidden: true
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register,
    hidden: true
  },
  {
    path: '/404',
    name: '404',
    component: NotFound,
    hidden: true
  },
  {
    path: '/403',
    name: '403',
    component: NoPermission,
    hidden: true
  },
  {
    path: '/test1',
    name: 'Test1',
    label: '一级路由1',  // 显示的按钮名称
    icon: 'edit', // 显示的图标
    component:Test,
    hidden: false,
    children: [
      {
        path: '/test1/test1-1',
        name: 'Test1-1',
        hidden: false,
        label: '二级路由',
        icon: 'refresh',
        children: [
          {
            path: '/test1/test1-1/test1-1-1',
            name: 'Test1-1-1',
            label: '三级路由',
            icon: 'setting',
            hidden: false,
            component: Test
          }
        ]
      }
    ]
  },
  {
    path: '/test2',
    name: 'Test2',
    label: '一级路由2',  // 显示的按钮名称
    icon: 'edit', // 显示的图标
    hidden: false,
    children: [
      {
        path: '/test2/test2',
        name: 'Test2-2',
        hidden: false,
        label: '二级路由2',
        icon: 'refresh',
        component: Hello
      }
    ]
  }
]


let router =  new Router({
  routes: constantRouterMap
})

import store from '@/vuex'
import keys from '@/common';
// 挂载全局前置钩子函数
router.beforeEach( async (to,from,next) => {
  console.log(from.path, to.path)
  // 如果没有加载路由菜单，那么加载路由菜单
  if (store.state.routes.length==0) {
    store.dispatch('addRoutes')
    next(to.path)
  }
  if (to.path=='/403' || to.path=='/404') {
    next()
  }
  if (store.state.Roles.length==0) {
    const token = Cookies.get('login-token')
    if (token!=''&&token!=undefined) {
      store.commit('setToken', token)
      console.log('alt1')
      await store.dispatch('currentAction')
        .then(() => {
          next(to.path)
        })
        .catch(() => {
          if (to.path=='/login' || to.path=='/register' || whiteList.indexOf(to.path)>=0) {
            next()
          }
        })
      
    } else {
      if (to.path=="/login" || to.path=="/register" || keys.whiteList.indexOf(to.path)>=0) {
        next()
      } else {
        if (store.getters.getRoutesPath.indexOf(to.path)>=0) {
          if(store.state.routesPaths.indexOf(to.path)<0) {
            next('/403')
          } else {
            next()
          }
        } else {
          next('/404')
        }
      }
    }
  } else {
    if (to.path=='/login' || to.path=='/register') {
      next('/',{replace:true})  //TODO 始终无法跳转到/路由
    }
    if (to.path=='/') {
      next()
    }
    if (store.getters.getRoutesPath.indexOf(to.path)>=0) {
      if(store.state.routesPaths.indexOf(to.path)<0) {
        next('/403')
      } else {
        next()
      }
    } else {
      next('/404')
    }
  }
})

export default router


// 异步挂载路由
// 动态需要根据权限加载的路由表
export const asyncRouterMap = [
  {
    path: '/permission',
    component: Hello,
    name: '权限测试',
    label: 'admin权限test',
    icon: 'circle-plus',
    meta: { role: [0,1] }, //页面需要的权限，这也是vue-router文档推荐的做法,
    hidden: false,
    children: [
      {
        path: '/permission/permission1',
        meta: { role: [0] },
        label: 'permission1',
        children: [
          {
            path: '/permission/permission1/permission1-1',
            label: 'permission1-1',
            meta: { role: [0] }
          },{
            path: '/permission/permission1/permission1-2',
            label: 'permission1-2',
            meta: { role: [1] }
          }
        ]
      },{
        path: '/permission2',
        label: 'permission2',
        component: Hello,
        meta: { role: [0]}
      }
    ]
  },
  {
    path: '/superPermission',
    component: Hello,
    label: '管理员权限',
    icon: 'refresh',
    name: 'super',
    meta: { role: [2] }, //页面需要的权限，这也是vue-router文档推荐的做法
    hidden: false
  },
  // 404必须最后加载
  // {
  //   path: '*',
  //   redirect: '/404',
  //   hidden: true
  // }
]
