// 对http请求方法进行封装
import axios from '@/axios'
import article from './article'
import user from './user'
import comment from './comment'


// 上传图片
const uploadImg = async (file, type='context') => {
  if (file==null || file==undefined) {
    throw new Error('请选择文件')
  }
  let param = new FormData()
  param.append('file', file)
  param.append('type', type)
  
  let config = {headers: { 'Content-Type': 'multipart/form-data'}}
  const res = await axios.post('users/uploadImg', param, config)
  return res.data.imgpath
}

// 获取七牛云上传token
const getQnToken = async () => {
  const res = await axios.get('users/getQnToken')
  return res.data.token
}



const http = {
  uploadImg,
  getQnToken,
  ...user,
  ...article,
  ...comment
}

export default http