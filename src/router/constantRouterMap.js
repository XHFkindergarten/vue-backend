// 同步挂载路由
const Main = () => import('@/components/Main')
const Login = () => import('@/components/Login')
const Register = () => import('@/components/Register')
const NewRegister = () => import('@/components/NewRegister')
const NoPermission = () => import('@/layouts/403')
const Test = () => import('@/components/Test')
const Test2 = () => import('@/components/Test2')
const AppContainer = () => import('@/layouts/AppContainer')
const HeaderContainer = () => import('@/layouts/HeaderContainer')
const Me = () => import('@/components/Me')

export const constantRouterMap =  [
  {
    path: '/main',
    alias: '/',
    hidden: false,
    meta: { role: [0, 1]},
    component: AppContainer,
    children: [
      {
        path: '',
        component: Main,
        meta: {},
        hidden: true
      },
      {
        path: 'login',
        alias: '/login',
        name: '登录',
        component: Login,
        meta: {},
        hidden: true
      },
      {
        path: 'register',
        alias: '/register',
        name: '注册',
        component: Register,
        meta: {},
        hidden: true
      },
      {
        path: 'articleList',
        alias: '/articleList',
        meta: {},
        hidden: true,
        redirect: '/noheader/list'
      },
      {
        path: '403',
        alias: '/403',
        name: '没有访问权限',
        meta: {},
        component: NoPermission,
        hidden: true
      },
      {
        path: 'read',
        label: '朗读',
        icon: 'read',
        meta: {},
        component: () => import('@/layouts/Empty'),
        hidden: true,
        children: [
          {
            path: 'readFile',
            icon: 'read',
            alias: '/readFile', 
            label: '阅读文档',
            meta: {},
            component: () => import('@/components/ReadFile'),
            hidden: true
          }
        ]
      },{
        path: 'daily',
        alias: '/daily',
        meta: {},
        component: () => import('@/components/daily'),
        hidden: true
      },
      {
        path: 'test1',
        name: 'Test1',
        label: '0权限路由1',  // 显示的按钮名称
        icon: 'gift', // 显示的图标
        component:Test,
        hidden: false,
        meta: {},
        children: [
          {
            path: 'test1-1',
            name: 'Test1-1',
            hidden: false,
            label: '二级路由',
            icon: 'verticalright',
            component: Test2,
            meta: {},
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
    path: '/noheader',
    name: 'nohead',
    component: HeaderContainer,
    children:[
      {
        alias: '/me',
        path: 'me',
        component: Me
      },{
        path: 'person',
        alias: '/person',
        component: () => import('@/components/Person'),
        props: (route) => ({id: route.query.id})
      },{
        path: 'list',
        component: () => import('@/components/ArticleList')
      },
      {
        path: 'article',
        alias: '/article',
        meta: {gray: true},
        component: () => import('@/components/ArticleOne'),
        props: (route) => ({id: route.query.id})
      },
      {
        alias: '/smallscreen',
        path: 'smallscreen',
        component: () => import('@/layouts/SmallScreen')
      }
    ]
  },
//   {
//     path: '/grayheader',
//     name: 'grayheader',
//     component: GrayContainer,
//     children: [
//       {
//         path: 'article',
//         alias: '/article',
//         component: () => import('@/components/ArticleOne'),
//         props: (route) => ({id: route.query.id})
//       }
//     ]
//   }
]