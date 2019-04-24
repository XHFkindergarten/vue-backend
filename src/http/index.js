// 对http请求方法进行封装
import axios from '@/axios'
import qs from 'qs'
import store from '../vuex';

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
const Login = async (email,password) => {
  const res = await axios.post('users/login', {
    email,
    password
  })
  return res
}

// 获取用户信息
const Current = async (token) => {
  const res = axios.get('users/current', {
    // TODO: 尝试注释这段代码，因为在axios中已经封装了使用token
    headers: {
      'Authorization': token
    }
  })
  return res
}

// 获取用户权限
const Role = async (id) => {
  if (id==""||id==null) {
    throw new Error('暂无用户信息，无法查询身份')
  }
  const res = await axios.get('users/role?id='+id)
  console.log(res)
  return res
}

// 发送验证邮箱
const Email = async (email) => {
  if (email=="" || email==null) {
    throw new Error('暂无邮箱信息,无法发送')
  }
  const res = await axios.get('users/sendmail?email='+email)
  return res
}

const http = {
  Login,
  Register,
  Current,
  Role,
  Email
}

export default http