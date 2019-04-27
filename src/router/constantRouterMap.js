// 同步挂载路由
import Main from '@/components/Main'
import Login from '@/components/Login'
import Register from '@/components/Register'
import NotFound from '@/layouts/404'
import NoPermission from '@/layouts/403'
import Hello from '@/components/HelloWorld'
import Test from '@/components/Test'
import Test2 from '@/components/Test2'


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
        path: 'test1-1',
        name: 'Test1-1',
        hidden: false,
        label: '二级路由',
        icon: 'refresh',
        component: Test2,
        children: [
          {
            path: 'test1-1-1',
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
]