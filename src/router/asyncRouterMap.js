// 异步挂载路由
// 动态需要根据权限加载的路由表

import Me from '@/components/Me'
import TableContainer from '@/components/TableContainer'
import Table from '@/components/Table'
import Hello from '@/components/HelloWorld'
import Empty from '@/layouts/Empty'
import RichText from '@/components/RichText'
import NotFound from '@/layouts/404'
import Markdown from '@/components/Markdown'
import ExportExcel from '@/components/ExportExcel'
import ImportExcel from '@/components/ImportExcel'

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
        path: 'permission1',
        meta: { role: [0] },
        label: 'permission1',
        component: Empty,
        children: [
          {
            path: 'permission1-1',
            label: 'permission1-1',
            component: Table,
            meta: { role: [0] }
          },{
            path: 'permission1-2',
            label: 'permission1-2',
            component: Hello,
            meta: { role: [1] }
          }
        ]
      },{
        path: 'permission2',
        label: 'permission2',
        component: Hello,
        meta: { role: [0]}
      }
    ]
  },
  {
    path: '/table',
    label: '表格',
    icon: 'tickets',
    name: 'table',
    meta: { role: [0] }, //页面需要的权限，这也是vue-router文档推荐的做法
    hidden: false,
    component: TableContainer,
    children: [
      {
        path: 'table1',
        label: '表格1',
        icon: 'document',
        name: 'table1',
        meta: { role: [0] },
        component: Table,
        hidden: false
      }
    ]
  },
  {
    path: '/richtext',
    label: '文本编辑',
    icon: 'document',
    meta: { role: [0] },
    hidden: false,
    component: Empty,
    children: [
      {
        path: 'tinymce',
        label: 'tinymce文本编辑器',
        name: 'richtext',
        meta: { role: [0] },
        hidden: false,
        component: RichText
      }
    ]
  },
  {
    path: '/me',
    name: 'me',
    component: Me,
    hidden: true,
    meta: { role: [0, 1, 2] }
  },{
    path: '/markdown',
    name: 'markdown',
    icon: 'info',
    component: Empty,
    label: 'MarkDown',
    meta: { role: [0] },
    hidden: false,
    children: [
      {
        path: 'simplemde',
        name: 'simplemde',
        component: Markdown,
        hidden: false,
        label: 'simplemde编辑器',
        meta: { role: [0] }
      }
    ]
  },{
    path: '/excel',
    component: Empty,
    hidden: false,
    label: 'Excel表格',
    meta: { role: [0] },
    icon: 'files',
    children: [
      {
        path: 'exportExcel',
        name: 'exportExcel',
        component: ExportExcel,
        label: '导出Excel表格',
        meta: { role: [0] }
      },{
        path: 'importExcel',
        name: 'importExcel',
        component: ImportExcel,
        label: '导入Excel表格',
        meta: { role: [0] }
      }
    ]
  },


  // 404的path可以匹配所有路径，所以必须放在最后一个路由
  {
    path: '*',
    name: '404',
    component: NotFound,
    hidden: true,
    meta: { role: [0, 1, 2] }
  }
]
