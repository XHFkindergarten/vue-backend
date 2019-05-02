// 异步挂载路由
// 动态需要根据权限加载的路由表

// import EchartsDemo from '@/components/EchartsDemo'

export const asyncRouterMap = [
  {
    path: '/permission',
    component: () => import('@/components/HelloWorld'),
    name: '权限测试',
    label: 'admin权限test',
    icon: 'indent',
    meta: { role: [0,1] }, //页面需要的权限，这也是vue-router文档推荐的做法,
    hidden: false,
    children: [
      {
        path: 'permission1',
        meta: { role: [0] },
        label: 'permission1',
        component: () => import('@/layouts/Empty'),
        children: [
          {
            path: 'permission1-1',
            label: 'permission1-1',
            component: () => import('@/components/Table'),
            meta: { role: [0] }
          },{
            path: 'permission1-2',
            label: 'permission1-2',
            component: () => import('@/components/HelloWorld'),
            meta: { role: [1] }
          }
        ]
      },{
        path: 'permission2',
        label: 'permission2',
        component: () => import('@/components/HelloWorld'),
        meta: { role: [0]}
      }
    ]
  },
  {
    path: '/table',
    label: '表格',
    icon: 'table',
    name: 'table',
    meta: { role: [0] }, //页面需要的权限，这也是vue-router文档推荐的做法
    hidden: false,
    component: () => import('@/components/TableContainer'),
    children: [
      {
        path: 'table1',
        label: '表格1',
        icon: 'document',
        name: 'table1',
        meta: { role: [0] },
        component: () => import('@/components/Table'),
        hidden: false
      }
    ]
  },
  {
    path: '/richtext',
    label: '文本编辑',
    icon: 'edit',
    meta: { role: [0] },
    hidden: false,
    component: () => import('@/layouts/Empty'),
    children: [
      {
        path: 'tinymce',
        label: 'tinymce文本编辑器',
        name: 'richtext',
        meta: { role: [0] },
        hidden: false,
        component: () => import('@/components/RichText'),
      }
    ]
  },
  {
    path: '/me',
    name: 'me',
    component: () => import('@/components/Me'),
    hidden: true,
    meta: { role: [0, 1, 2] }
  },{
    path: '/markdown',
    name: 'markdown',
    icon: 'file-markdown',
    component: () => import('@/layouts/Empty'),
    label: 'MarkDown',
    meta: { role: [0] },
    hidden: false,
    children: [
      {
        path: 'simplemde',
        name: 'simplemde',
        component: () => import('@/components/Markdown'),
        hidden: false,
        label: 'simplemde编辑器',
        meta: { role: [0] }
      }
    ]
  },{
    path: '/excel',
    component: () => import('@/layouts/Empty'),
    hidden: false,
    label: 'Excel表格',
    meta: { role: [0] },
    icon: 'file-excel',
    children: [
      {
        path: 'exportExcel',
        name: 'exportExcel',
        component: () => import('@/components/ExportExcel'),
        label: '导出Excel表格',
        icon: 'down',
        meta: { role: [0] }
      },{
        path: 'importExcel',
        name: 'importExcel',
        icon: 'up',
        component: () => import('@/components/ImportExcel'),
        label: '导入Excel表格',
        meta: { role: [0] }
      }
    ]
  },{
    path: '/echarts',
    label: '表格',
    icon: 'carryout',
    hidden: false,
    meta: { role: [0] },
    component: () => import('@/layouts/Empty'),
    children: [
      {
        path: 'echartsDemo',
        label: 'echarts入门实例',
        name: 'echartsDemo',
        component: () => import('@/components/EchartsDemo'),
        hidden: false,
        meta: { role: [0] }
      }
    ]
  },


  // 404的path可以匹配所有路径，所以必须放在最后一个路由
  {
    path: '*',
    name: '404',
    component: () => import('@/layouts/404'),
    hidden: true,
    meta: { role: [0, 1, 2] }
  }
]
