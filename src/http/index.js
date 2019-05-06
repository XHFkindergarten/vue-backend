// 对http请求方法进行封装
import axios from '@/axios'
import store from '../vuex';
import article from './article'
import user from './user'


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



const http = {
  uploadImg,
  ...user,
  ...article
}

export default http