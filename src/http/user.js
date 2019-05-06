import axios from '@/axios'
import store from '../vuex'

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
    .catch(err => {
      throw new Error(err)
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
    .catch((err) => {
      throw new Error(err)
    })
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

// 修改用户信息（密码除外）
const updateUserInfo = async (param) => {
  if (!param) {
    throw new Error('请检查要修改的内容')
  }
  const config = {
    Authorization: store.state.token
  }
  const res = await axios.post('users/update', param, config)
  if (res) {
    return res
  }
}

const user = {
  Login,
  Register,
  Current,
  Role,
  Email,
  updateUserInfo,
}

export default user