// 异步挂载路由
// 动态需要根据权限加载的路由表

// import EchartsDemo from '@/components/EchartsDemo'

// role
// 0 admin
// 1 manager
// 2 super manager

const AppContainer = () => import('@/layouts/AppContainer')

export const asyncRouterMap = [
  {
    path: '/main2',
    hidden: false,
    meta: { role: [0, 1, 2] },
    component: AppContainer,
    children: [
      {
        path: 'permission',
        component: () => import('@/components/HelloWorld'),
        name: '权限测试',
        label: 'admin权限test',
        icon: 'indent',
        meta: { role: [ 0, 1, 2] }, //页面需要的权限，这也是vue-router文档推荐的做法,
        hidden: false,
        children: [
          {
            path: 'permission1',
            meta: { role: [ 2, 0] },
            label: 'permission1',
            name: 'permission1',
            component: () => import('@/layouts/Empty'),
            children: [
              {
                path: '',
                label: 'permission1-1',
                name: 'permission1-1',
                component: () => import('@/components/Table'),
                meta: { role: [ 2, 0] }
              },{
                path: 'permission1-2',
                label: 'permission1-2',
                name: 'permission1-2',
                component: () => import('@/components/HelloWorld'),
                meta: { role: [ 0, 1 ] }
              }
            ]
          },{
            path: 'permission2',
            label: 'permission2',
            name: 'permission2',
            component: () => import('@/components/HelloWorld'),
            meta: { role: [ 2, 0]}
          }
        ]
      },
      {
        path: 'table',
        label: '表格',
        icon: 'table',
        name: '表格',
        meta: { role: [ 2, 0] }, //页面需要的权限，这也是vue-router文档推荐的做法
        hidden: false,
        component: () => import('@/components/TableContainer'),
        children: [
          {
            path: 'table1',
            label: '表格1',
            icon: 'document',
            name: '测试表格',
            meta: { role: [ 2, 0] },
            component: () => import('@/components/Table'),
            hidden: false
          }
        ]
      },
      {
        path: 'richtext',
        label: '文本编辑',
        name: '文本编辑',
        icon: 'edit',
        meta: { role: [ 2, 0] },
        hidden: false,
        component: () => import('@/layouts/Empty'),
        children: [
          {
            path: '',
            label: 'tinymce文本编辑器',
            name: 'tinymce文本编辑器',
            meta: { role: [ 2, 0] },
            hidden: false,
            component: () => import('@/components/RichText'),
          }
        ]
      },
      {
        path: 'me',
        name: '我的',
        component: () => import('@/components/Me'),
        hidden: true,
        meta: { role: [ 2, 0, 1, 2] }
      },{
        path: 'markdown',
        name: 'MarkDown',
        icon: 'file-markdown',
        component: () => import('@/layouts/Empty'),
        label: 'MarkDown',
        meta: { role: [ 2, 0] },
        hidden: false,
        children: [
          {
            path: '',
            name: 'simplemde编辑器',
            component: () => import('@/components/Markdown'),
            hidden: false,
            label: 'simplemde编辑器',
            meta: { role: [ 2, 0] }
          }
        ]
      },{
        path: 'excel',
        component: () => import('@/layouts/Empty'),
        hidden: false,
        name: 'Excel表格',
        label: 'Excel表格',
        meta: { role: [ 2, 0] },
        icon: 'file-excel',
        children: [
          {
            path: '',
            name: '导出Excel表格',
            component: () => import('@/components/ExportExcel'),
            label: '导出Excel表格',
            icon: 'down',
            meta: { role: [ 2, 0] }
          },{
            path: 'importExcel',
            name: '导入Excel表格',
            icon: 'up',
            component: () => import('@/components/ImportExcel'),
            label: '导入Excel表格',
            meta: { role: [ 2, 0] }
          }
        ]
      },{
        path: 'echarts',
        label: '表格',
        name: '图标',
        icon: 'carryout',
        hidden: false,
        meta: { role: [ 2, 0] },
        component: () => import('@/layouts/Empty'),
        children: [
          {
            path: '',
            label: 'echarts入门实例',
            name: 'echarts实例',
            component: () => import('@/components/EchartsDemo'),
            hidden: false,
            meta: { role: [ 2, 0] }
          }
        ]
      },{
        path: 'authority',
        label: '权限管理',
        icon: 'earth',
        name: '权限管理',
        meta: { role: [ 2 ] },
        component: () => import('@/layouts/Empty'),
        hidden: false,
        children: [
          {
            path: '',
            label: '修改用户权限',
            name: '修改用户权限',
            meta: { role: [2] },
            component: () => import('@/components/AuthorityTree'),
            hidden: false
          }
        ]
      },{
        path: 'article',
        label: '文章管理',
        icon: 'article',
        name: '文章管理',
        meta: { role: [0, 2] },
        component: () => import('@/layouts/Empty'),
        hidden: false,
        children: [
          {
            path: 'addArticle',
            name: '添加文章',
            label: '添加文章',
            meta: { role: [0, 1, 2]},
            component: () => import('@/components/addArticle'),
            hidden: false
          }
        ]
      },
    ]
  },
  


  // 404的path可以匹配所有路径，所以必须放在最后一个路由
  {
    path: '*',
    name: '404',
    component: () => import('@/layouts/404'),
    hidden: true,
    meta: { role: [ 0, 1, 2] }
  }
]
