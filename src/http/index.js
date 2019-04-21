// 对http请求方法进行封装
import axios from 'axios'
import qs from 'qs'

// 用户注册
const Register = (email, name, password,password2) => {
  return new Promise((resolve,reject) => {
    axios.post('users/register', {
      email,
      name,
      password,
      password2
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

// 用户登录
const Login = (email,password) => {
  return new Promise((resolve,reject) => {
    axios.post('users/login', {
      email,
      password
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })  
}

// 获取用户信息
const Current = (token) => {
  return new Promise((resolve,reject) => {
    axios.get('users/current',{
      headers: {
        'Authorization': token
      }
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

// 获取用户权限
const Role = (id) => {
  return new Promise((resolve,reject) => {
    if(id==""||id==null) {
      reject('暂无用户信息，无法获取权限表')
    }
    axios.get('users/role?id='+id)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

const http = {
  Login,
  Register,
  Current,
  Role
}

export default http