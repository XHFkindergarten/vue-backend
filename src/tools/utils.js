import store from '@/vuex'


const ClearAsyncRoutes = (routes,role) => {
  routes.forEach((route, index) => {
    if (!route.meta || route.meta.role.indexOf(role)<0) {
      routes.splice(index,1)
    } else if ( route.children && route.children.length>0 ) {
      ClearAsyncRoutes(route.children,role)
    }
  });
  // if(!route.meta) {
  //   return
  // } else {
  //   if(route.meta.role.indexOf(role)>-1) {
  //     array.push(route)
  //     if( route.children && route.children.length>0 ) {
  //       route.children.forEach(child => {
  //         asyncAddRoutes(array,child)
  //       });
  //     }
  //   }
  // }
}

export default {
  ClearAsyncRoutes
}