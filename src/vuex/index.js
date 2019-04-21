import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
import http from '../http'
import keys from '../common'
// 引入同步路由和根据权限加载的异步路由
import {constantRouterMap,asyncRouterMap} from '@/router'
import utils from '@/tools/utils'
Vue.use(Vuex)

const app = this

// states
let state = {
  status: false,  // 登录状态 false表示尚未登录
  token: '',  // 登录token
  userInfo: {}, // 用户信息
  Roles: [], // 用户权限
}
// mutations
let mutations = {
  // 登录登出状态切换
  altStatus: (state) => {
    state.status = state.status==keys.status.NOT_LOGIN ? keys.status.LOGIN : keys.status.NOT_LOGIN
  },
  setToken: (state, token) => {
    state.token = token
  },
  resetToken: (state) => {
    state.token = ''
  },
  setUserInfo: (state, userInfo) => {
    state.userInfo = userInfo
  },
  resetUserInfo: (state) => {
    state.userInfo = {}
  },
  setRoles: (state,roles) => {
    state.Roles = roles
  },
  resetRoles: (state) => {
    state.Roles = []
  }
}
// getters
let getters = {
  getRouterMenu: (state) => {
    const routes = constantRouterMap
    asyncRouterMap.forEach(route => {
      // utils.asyncAddRoutes(routes,route,state.Roles[0])
      if(route.meta && route.meta.role.indexOf(state.Roles[0])>-1){
        routes.push(route)
        if(route.children&&route.children.length>0) {
          utils.ClearAsyncRoutes(route.children, state.Roles[0])
        }
      }
    })
    return routes
  },
  getRole: (state) => {
    return state.Roles[0]
  }
  // getId: state => {
  //   return state.userInfo.id
  // }
  // getRoutes: () => {
  //   return route.options
  // }
}
// actions
let actions = {
  // 登录
  async loginAction ({dispatch,commit}, loginForm) {
    const email = loginForm.email.trim()
    return await new Promise((resolve,reject) => {
      http.Login(email,loginForm.password)
      .then(res => {
        commit('setToken',res.data.token)
        dispatch('currentAction')
        resolve(res)
      })
      .catch(error => {
        reject(error)
        console.log(error)
      })
    })
  },
  // 注册
  registerAction: ({commit}, registerForm) => {
    const email = registerForm.email.trim()
    return new Promise((resolve,reject) => {
      http.Register(email, registerForm.name, registerForm.password, registerForm.password2) 
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // 根据token获取用户信息
  currentAction ({dispatch,commit,state}) {
    return new Promise((resolve,reject) => {
      http.Current(state.token)
        .then(res => {
          commit('setUserInfo',res.data)
          console.log('current')
          commit('altStatus')
          dispatch('getRoleAction',{
            id:state.userInfo.id
          })
            .catch(err => {
              console.log(err)
            })
        })
        .catch(err => {
          console.log(err)
        })
    })
  },
  // 获取用户权限
  getRoleAction: ({commit,state}, info) => {
    return new Promise((resolve,reject) => {
      if(info==null) {
        reject('暂无用户信息，无法获取权限表')
      }
      http.Role(info.id)
      .then(res => {
        commit('setRoles',res.data.data)
      })
      .catch(err => {
        reject(err)
      })
    })
    
  },
  // 登出
  logoutAction: ({commit}) => {
    commit('altStatus')
    commit('resetToken')
    commit('resetUserInfo')
    commit('resetRoles')
  }
}
const store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
// 登录权限store
export default store