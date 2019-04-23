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
  // // 注册-邮箱验证
  // mailValidator: ({commit},email) => {
  //   const mailOptions = {
  //     ...keys.emailInfo,
  //     to: email
  //   }
  //   transporter.sendMail(mailOptions, (err, info) => {
  //     if (err) {
  //       console.log(err)
  //       return
  //     }
  //     console.log('email发送成功!')
  //   })
  // },

  // 根据token获取用户信息
  currentAction ({dispatch,commit,state}) {
    return new Promise((resolve,reject) => {
      http.Current(state.token)
        .then(res => {
          commit('setUserInfo',res.data)
          commit('altStatus')
          dispatch('getRoleAction',{
            id:state.userInfo.id
          })
            .catch(err => {
              console.log(err)
            })
        })
        .catch(err => {
          commit('resetToken')
          dispatch('addRoutes')
          console.log(err)
        })
    })
  },
  // 获取用户权限
  getRoleAction: ({commit,dispatch}, info) => {
    return new Promise((resolve,reject) => {
      if(info==null) {
        reject('暂无用户信息，无法获取权限表')
      }
      http.Role(info.id)
      .then(res => {
        commit('setRoles',res.data.data)
        dispatch('addRoutes')
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
  },
  // 挂载动态权限路由
  addRoutes: ({commit,state,getters}) => {
    let constantRoute = Array.from(constantRouterMap)
    if(state.Roles.length==0) {
      state.routes = constantRoute
      return
    }
    let asyncRoute = Array.from(asyncRouterMap)
    utils.ClearAsyncRoutes(asyncRoute, state.Roles[0])
    state.routes = constantRoute.concat(asyncRoute)
    router.addRoutes(asyncRoute)
    // 生成一个允许访问的路由path表
    let routesPaths = []
    utils.getPaths(state.routes, routesPaths)
    state.routesPaths = routesPaths
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