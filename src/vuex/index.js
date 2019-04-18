import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
import http from '../http'
import keys from '../common'

Vue.use(Vuex)
// states
let state = {
  status: false,
  token: ''
}
// mutations
let mutations = {
  // 登录登出状态切换
  altStatus: (state) => {
    state.status = state.status==keys.status.NOT_LOGIN ? keys.status.LOGIN : keys.status.NOT_LOGIN
  },
  setToken: (state, token) => {
    state.token = token
  }
}
// getters
let getters = {

}
// actions
let actions = {
  loginAction: ({commit}, loginForm) => {
    const email = loginForm.email.trim()
    http.Login(email,loginForm.password)
      .then(res => {
        if (res.status==200&&res.data.success) {
          commit('setToken',res.data.token)
          commit('altStatus')
          Cookies.set('login-token',res.data.token)
          // TODO 登录成功，发生页面跳转

        }
      })
      .catch(error => {
        throw new Error(error)
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