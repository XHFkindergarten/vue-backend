import axios from '@/axios'

// 发起评论
const addComment = async params => {
  if (!params) {
    throw new Error('请输入参数')
  }
  const res = await axios.post('comment/addComment', params)
    .catch(err => {
      throw err
    })
  return res
} 

// 获取文章评论
const getComment = async articleId => {
  if (!articleId) {
    throw new Error('articleId')
  }
  const res = await axios.get('comment/getComment?articleId=' + articleId)
    .catch(err => {
      throw err
    })
  return res
}

// 添加文章评论
const addReply = async params => {
  if (!params) {
    throw new Error('请输入参数')
  }
  const res = await axios.post('comment/addReply', params)
    .catch(err => {
      throw err
    })
  return res
}

// 获取文章评论
const getReply = async articleId => {
  if (!articleId) {
    throw new Error('请输入参数')
  }
  const res = await axios.get('comment/getReply?articleId=' + articleId)
    .catch(err => {
      throw err
    })
  return res
}

const comment = {
  addComment,
  getComment,
  addReply,
  getReply
}

export default comment