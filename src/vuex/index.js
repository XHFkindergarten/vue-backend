import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
import http from '../http'
import keys from '../common'
// 引入同步路由和根据权限加载的异步路由
import {constantRouterMap,asyncRouterMap} from '@/router'
import router from '@/router'
import utils from '@/tools/utils'
Vue.use(Vuex)

const app = this

// states
let state = {
  status: false,  // 登录状态 false表示尚未登录
  token: '',  // 登录token
  userInfo: {}, // 用户信息
  Roles: [], // 用户权限
  routes: [], // 允许显示的路由表
  routesPaths: [], // 允许显示的路由表paths数组
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
  },
  resetLoginAccess: (state, getters) => {
    const index = getters.getRoutesPath.indexOf('/login')
    getters.getRoutesPath.splice(index, 1)
  },
  resetRoutes: (state) => {
    state.routes = []
  },
  // 将邮箱验证码储存到localStorage
  setEmailCode: (state, code) => {
    localStorage.setItem('email-code', code)
  }
}
// getters
let getters = {
  
  // 所有合法的路由path数组
  getRoutesPath: (state) => {
    const array = []
    utils.getPaths(constantRouterMap, array)
    utils.getPaths(asyncRouterMap, array)
    return array
  },
  // 获取用户的第一个身份权限(一般一个用户只有一个身份，为了防止特殊情况权限是个数组)
  getRole: (state) => {
    return state.Roles[0]
  }
}
// actions
let actions = {
  // 登录
  loginAction: async ({dispatch,commit}, loginForm) => {
    const email = loginForm.email.trim()
    const login = await http.Login(email, loginForm.password)
    commit('setToken', login.data.token)
    const getUserInfo = await dispatch('currentAction')
    console.log(getUserInfo)
    return login
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
  currentAction: async ({dispatch,commit,state}) => {
    const res = await http.Current(state.token)
    if (res) {
      commit('setUserInfo', res.data)
      if(!state.status){
        commit('altStatus')
      }
      const getRole = await dispatch('getRoleAction', {
        id: state.userInfo.id
      })
    } else {
      commit('resetToken')
      dispatch('addRoutes')
      console.log(res)
    }
  },
  // 获取用户权限
  getRoleAction: async ({commit,dispatch}, info) => {
    if (info==null) {
      throw new Error('暂无用户信息，无法获取权限表')
    }
    const res = await http.Role(info.id)
    if (res) {
      commit('setRoles', res.data.data)
      await dispatch('addRoutes')
      return res
    }
  },
  // 登出
  logoutAction: ({commit}) => {
    commit('altStatus')
    commit('resetToken')
    commit('resetUserInfo')
    commit('resetRoles')
  },
  // 挂载动态权限路由
  addRoutes: ({commit,state,getters}) => {
    console.log('add')
    let constantRoute = Array.from(constantRouterMap)
    if(state.Roles.length==0) {
      state.routes = constantRoute
    } else {
      let asyncRoute = Array.from(asyncRouterMap)
      utils.ClearAsyncRoutes(asyncRoute, state.Roles[0])
      state.routes = constantRoute.concat(asyncRoute)
      router.addRoutes(asyncRoute)
    }
    
    // 生成一个允许访问的路由path表
    let routesPaths = []
    utils.getPaths(state.routes, routesPaths)
    state.routesPaths = routesPaths
  },
  // 发送验证邮箱
  sendemailAction: ({commit}, email) => {
    if (email==""||email==null) {
      throw new Error('暂无邮箱信息，无法发送')
    }
    const res = http.Email(email)
    if (res) {
      return res
    } else {
      throw new Error('发送邮箱操作失败!')
    }
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