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
  group: {}, // 当前选中的文章分组
  article: {},  // 当前正在被编辑的文章
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

  // 根据用户id获取用户基本信息
  getOneUserAction: async ({commit}, id) => {
    const res = await http.getOneUser(id)
      .catch(err => {
        throw err
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
  addRoutes: ({state}) => {
    let constantRoute = Array.from(constantRouterMap)
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
  },

  // 获取用户文章分组列表
  getGroupAction: async ({commit}, userId) => {
    const res = await http.getArticleGroup(userId)
      .catch(err => {
        throw err
      })
    if (res) {
      return res 
    }
  },

  // 为用户添加一个文章分组
  addGroupAction: async ({commit}, params) => {
    const res = await http.addArticleGroup(params)
      .catch(err => {
        throw err
      })
    return res
  },

  // 修改用户分组名
  editGroupNameAction: async ({commit}, params) => {
    const res = await http.updateArticleGroup(params)
      .catch(err => {
        throw err
      })
    return res
  },
  // 删除用户分组
  deleteGroupAction: async ({commit}, id) => {
    const res = await http.deleteGroup(id)
      .catch(err => {
        throw err
      })
    return res
  },

  // 新增文章
  addArticleAction: async ({state, commit}, params) => {
    const res = await http.addArticle({
      ...params,
      userId: state.userInfo.id
    })
      .catch(err => {
        throw err
      })
    return res
  },

  // 根据groupId获取文章列表
  getArticleList: async ({commit}, params) => {
    const res = await http.getArticleList(params)
      .catch(err => {
        throw err
      })
    return res
  },

  // 更新单篇文章
  updateArticleAction: async ({commit}, params) => {
    const res = await http.updateArticle(params)
      .catch(err => {
        throw err
      })
    return res
  },

  // 删除单篇文章
  deleteArticleAction: async ({commit}, id) => {
    const res = await http.deleteArticle(id)
      .catch(err => {
        throw err
      })
    return res
  },

  // 分页获取所有文章
  getAllArticleAction: async () => {
    const res = await http.getAllArticle()
      .catch(err => {
        throw err
      })
    return res
  },

  // 获取单篇文章
  getOneArticleAction: async ({commit}, id) => {
    const res = await http.getOneArticle(id)
      .catch(err => {
        throw err
      })
    return res
  },

  // 喜欢文章
  likeArticleAction: async ({commit}, params) => {
    const res = await http.likeArticle(params)
      .catch(err => {
        throw err
      })
    return res
  },

  // 查询某篇文章的喜欢列表
  likeListAction: async ({commit}, articleId) => {
    const res = await http.likeList(articleId)
      .catch(err => {
        throw err
      })
    return res
  },

  // 取消喜欢某篇文章
  dislikeArticleAction: async ({commit}, params) => {
    const res = await http.dislikeArticle(params)
      .catch(err => {
        throw err
      })
    return res
  },

  // 发起评论
  addCommentAction: async ({commit}, params) => {
    const res = await http.addComment(params)
      .catch(err => {
        throw err
      })
    return res
  },

  // 查询文章评论
  getCommentAction: async ({commit}, articleId) => {
    const res = await http.getComment(articleId)
      .catch(err => {
        throw err
      })
    return res
  },

  // 添加回复
  addReplyAction: async ({commit}, params) => {
    const res = await http.addReply(params)
      .catch(err => {
        throw err
      })
    return res 
  },

  // 获取文章回复
  getReplyAction: async ({commit}, articleId) => {
    const res = await http.getReply(articleId)
      .catch(err => {
        throw err
      })
    return res
  },

  // 增加文章查看次数
  viewArticleAction: async ({commit}, articleId) => {
    const res = await http.viewArticle(articleId)
      .catch(err => {
        throw err
      })
    return res
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