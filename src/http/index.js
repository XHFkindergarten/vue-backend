// 对http请求方法进行封装
import axios from 'axios'
import qs from 'qs'

const Login = (email,password) => {
  return new Promise((resolve,reject) => {
    axios.post('users/login',{
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

const http = {
  Login
}

export default http