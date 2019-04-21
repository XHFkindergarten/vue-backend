import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
import http from '../http'
import keys from '../common'

Vue.use(Vuex)

const app = this

// states
let state = {
  status: false,  // 登录状态 false表示尚未登录
  token: '',  // 登录token
  userInfo: {}, // 用户信息
  Roles: [] // 用户权限
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
  }
}
// getters
let getters = {
  // getId: state => {
  //   return state.userInfo.id
  // }
}
// actions
let actions = {
  // 登录
  loginAction: ({commit}, loginForm) => {
    const email = loginForm.email.trim()
    return new Promise((resolve,reject) => {
      http.Login(email,loginForm.password)
      .then(res => {
        commit('setToken',res.data.token)
        commit('altStatus')
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
  currentAction: ({commit,state}) => {
    return new Promise((resolve,reject) => {
      http.Current(state.token)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // 获取用户权限
  getRoleAction: ({commit,state}, info) => {
    return new Promise((resolve,reject) => {
      http.Role(info.id)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
    })
    
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