import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Hello from '@/components/HelloWorld'
import NotFound from '@/layouts/404'
import Test from '@/components/Test'

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
    path: '/login',
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
    path: '/test1',
    name: 'Test1',
    label: '一级路由1',  // 显示的按钮名称
    icon: 'edit', // 显示的图标
    component:Test,
    hidden: false,
    children: [
      {
        path: 'test1',
        name: 'Test1',
        hidden: false,
        label: '二级路由',
        icon: 'refresh',
        children: [
          {
            path: 'test1-1',
            name: 'Test1-1',
            label: '三级路由',
            icon: 'setting',
            hidden: false,
            component: Hello
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
    component:Test,
    hidden: false,
    children: [
      {
        path: 'test2',
        name: 'Test2',
        hidden: false,
        label: '二级路由2',
        icon: 'refresh'
      }
    ]
  }
]


const router =  new Router({
  routes: constantRouterMap
})

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
        path: '/permission1',
        meta: { role: [0] },
        label: 'permission1',
        children: [
          {
            path: '/permission1-1',
            label: 'permission1-1',
            meta: { role: [0] }
          },{
            path: '/permission1-2',
            label: 'permission1-2',
            meta: { role: [1] }
          }
        ]
      },{
        path: '/permission2',
        label: 'permission2',
        meta: { role: [1]}
      }
    ]
  },
  {
    path: '/superPermission',
    component: Hello,
    name: 'super',
    meta: { role: [2] }, //页面需要的权限，这也是vue-router文档推荐的做法
    hidden: false
  },
  // 404必须最后加载
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]
