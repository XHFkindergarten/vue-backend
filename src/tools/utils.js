import store from '@/vuex'

// 取出当前有权限访问的动态路由
const ClearAsyncRoutes = (routes,role) => {
  routes.forEach((route, index) => {
    // console.log(route.path,route.meta)
    if (!route.meta || route.meta.role.indexOf(role)<0) {
      routes.splice(index,1)
    } else if ( route.children && route.children.length>0 ) {
      ClearAsyncRoutes(route.children,role)
    }
  });
}

// 遍历所有的path
const getPaths = (routes, array) => {
  routes.forEach((route) => {
    array.push(route.path)
    if(route.children && route.children.length>0) {
      getPaths(route.children, array)
    }
  })
}

export default {
  ClearAsyncRoutes,
  getPaths
}