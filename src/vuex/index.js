import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
import http from '../http'
import keys from '../common'
// 引入同步路由和根据权限加载的异步路由
import { constantRouterMap } from '@/router/constantRouterMap'
import { asyncRouterMap } from '@/router/asyncRouterMap'
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
      .catch(err => {
        throw err
      })
    if (login.data.success) {
      // 如果登录成功
      commit('setToken', login.data.token)
      const getUserInfo = await dispatch('currentAction')
      console.log(getUserInfo)
      if (getUserInfo) {
        return login
      }
    } else {
      // 如果账号或者密码错误
      throw new Error(login.data.msg)
    }
    
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
      .catch(err => {
        throw new Error(err)
      })
    return res
  },

  // 获取用户权限
  getRoleAction: async ({commit,dispatch}, info) => {
    if (info==null) {
      throw new Error('暂无用户信息，无法获取权限表')
    }
    const res = await http.Role(info.id)
      .catch(err=> {
        throw err
      })
    commit('setRoles', res.data.data)
    return res
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
    utils.spliceRoutes(constantRoute, '')
    constantRoute = constantRoute[0].children
    if(state.Roles.length==0) {
      state.routes = constantRoute
    } else {
      let asyncRoute = Array.from(asyncRouterMap)
      utils.spliceRoutes(asyncRoute, '')
      utils.ClearAsyncRoutes(asyncRoute, state.Roles[0])
      router.addRoutes(asyncRoute)
      asyncRoute = asyncRoute[0].children
      state.routes = constantRoute.concat(asyncRoute)
    }
    
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
  },
  
  // 上传图片
  sendImage: ({commit}, params) => {
    if (!params.file) {
      throw new Error('没有文件，怎么发送???')
    }
    const res = http.uploadImg(params.file, params.type)
    if (res) {
      return res
    } else {
      throw new Error('上传失败')
    }
  },

  // 更新用户信息
  updateUserInfo: ({commit}, params) => {
    const res = http.updateUserInfo(params)
    if (res) {
      return res
    } else {
      throw new Error('更新信息失败')
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