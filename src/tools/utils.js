import store from '@/vuex'

// 是否为空
const isEmpty = (data) => {
  if (typeof(data) == 'string') {
    return data.length==0
  } else if (typeof(data) == 'object') {
    const keys = Object.keys(data)
    return keys.length==0
  } else if (typeof(data) == 'array') {
    return data.length==0
  } else {
    return data==undefined || data==null
  }
}

// 删除没有权限访问的所有动态路由
const ClearAsyncRoutes = (routes, role) => {
  routes.forEach((route, index) => {
    if (!route.meta || route.meta.role.indexOf(role)<0) {
      routes.splice(index,1)
    } else if ( route.children && route.children.length>0 ) {
      ClearAsyncRoutes(route.children, role)
    }
  });
}

// 将路由表中的嵌套路由进行组装
const spliceRoutes = (routes, preRoute) => {
  routes.forEach(route => {
    if (preRoute!='') {
      route.path = `${preRoute}/${route.path}`
    }
    if (route.children && route.children.length>0) {
      spliceRoutes(route.children, route.path)
    }
  })
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

// 验证是否满足邮箱格式
const isEmail = (email) => {
  if (email==null||email=="") {
    return false
  }
  const reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
  return reg.test(email)
}

export default {
  isEmpty,
  ClearAsyncRoutes,
  spliceRoutes,
  // ClearConstantRoutes,
  getPaths,
  isEmail
}