// 同步挂载路由
const Main = () => import('@/components/Main')
const Login = () => import('@/components/Login')
const Register = () => import('@/components/Register')
const NoPermission = () => import('@/layouts/403')
const Test = () => import('@/components/Test')
const Test2 = () => import('@/components/Test2')
const AppContainer = () => import('@/layouts/AppContainer')

export const constantRouterMap =  [
  {
    path: '/main',
    label: 'main',
    name: 'main',
    hidden: false,
    meta: { role: [0, 1]},
    component: AppContainer,
    children: [
      {
        path: '',
        name: '主页',
        component: Main,
        hidden: true
      },
      {
        path: 'me',
        name: '我的',
        component: () => import('@/components/Me'),
        hidden: true,
        meta: { role: [0, 1, 2] }
      },
      {
        path: 'Login',
        name: '登录',
        component: Login,
        hidden: true
      },
      {
        path: 'Register',
        name: '注册',
        component: Register,
        hidden: true
      },
      {
        path: '403',
        name: '没有访问权限',
        component: NoPermission,
        hidden: true
      },
      {
        path: 'test1',
        name: 'Test1',
        label: '0权限路由1',  // 显示的按钮名称
        icon: 'gift', // 显示的图标
        component:Test,
        hidden: false,
        children: [
          {
            path: 'test1-1',
            name: 'Test1-1',
            hidden: false,
            label: '二级路由',
            icon: 'verticalright',
            component: Test2,
            children: [
              {
                path: 'test1-1-1',
                name: 'Test1-1-1',
                label: '三级路由',
                icon: 'car',
                hidden: false,
                component: Test
              }
            ]
          }
        ]
      }
    ]
  },{
    path: '',
    redirect: '/main'
  },
]