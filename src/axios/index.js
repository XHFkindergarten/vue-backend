import axios from 'axios'
// import { Message } from 'element-ui'
import store from '@/vuex'
import keys from '@/common'
import Router from '../router'

const service = axios.create({
  baseURL: keys.host,
  timeout: 600000 //请求超时时间60s
})

// request拦截器
service.interceptors.request.use(config => {
  // Do Something before request is sent
  if (store.state.token) {
    // 如果store中有用户token的话
    // 为每一个请求的Authorization设置token
    config.headers['Authorization'] = store.state.token
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) 
  Promise.reject(error)
})

// response拦截器
service.interceptors.response.use(
  response => response,
    /**
    * 下面的注释为通过response协同【后端】自定义code来标示请求状态
    * 当code返回如下情况为权限有问题，登出并返回到登录页
    * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
    */
    //  const res = response.data;
    //     if (res.code !== 20000) {
    //       Message({
    //         message: res.message,
    //         type: 'error',
    //         duration: 5 * 1000
    //       });
    //       // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
    //       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
    //           confirmButtonText: '重新登录',
    //           cancelButtonText: '取消',
    //           type: 'warning'
    //         }).then(() => {
    //           store.dispatch('FedLogOut').then(() => {
    //             location.reload();// 为了重新实例化vue-router对象 避免bug
    //           });
    //         })
    //       }
    //       return Promise.reject('error');
    //     } else {
    //       return response.data;
    //     }
  error => {
    if (error.message.indexOf('401')>=0) {
      Message({
        message: '用户身份已过期,请重新登录',
        type: 'error',
        duration: 3*1000
      })
      Router.push('/login')
    }
    return Promise.reject(error)
})

export default service