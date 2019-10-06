import axios from '@/axios'
import store from '../vuex'


// 获取用户的文章分组
const getArticleGroup = async userId => {
  if (!userId) {
    throw new Error('请输入用户id')
  }
  const res = await axios.get('article/getGroup?userId='+userId)
    .catch(err => {
      throw err
    })
  return res
}

// 为用户添加一个文章分组
const addArticleGroup = async params => {
  if (!params) {
    throw new Error('请输入参数')
  }
  const res = await axios.post('article/addGroup', params)
    .catch(err => {
      throw err
    })
  return res
}

// 修改用户的分组信息
const updateArticleGroup = async params => {
  if (!params) {
    throw new Error('请输入参数')
  }
  const res = await axios.post('article/editGroupName', params)
    .catch(err => {
      throw new Error('更新分组信息失败')
    })
  return res
}

// 删除用户的某个分组
const deleteGroup = async id => {
  if (!id) {
    throw new Error('请输入参数')
  }
  const res = await axios.post('article/deleteGroup', {
    id: id
  })
    .catch(err => {
      throw err
    })
  return res
}

// 新增文章
const addArticle = async params => {
  if (!params) {
    throw new Error('请输入参数')
  }
  const res = await axios.post('article/addArticle', params)
    .catch(err => {
      throw err
    })
  return res
}

// 根据groupId获取文章列表
const getArticleList = async params => {
  if (!params) {
    throw new Error('请输入参数')
  }

  const res = await axios.get(`article/getArticleList?groupId=${params.groupId}&userId=${params.userId}`)
    .catch(err => {
      throw err
    })
  return res
}

// 获取所有文章流
const getAllArticle = async () => {
  const res = await axios.get('article/getAllArticle')
    .catch(err => {
      throw err
    })
  return res
}

// 更新单篇文章
const updateArticle = async params => {
  if (!params) {
    throw new Error('请输入参数')
  }
  const res = await axios.post('article/updateArticle', params)
    .catch(err => {
      throw err
    })
  return res
}

// 删除单篇文章
const deleteArticle = async id => {
  if (!id) {
    throw new Error('请输入参数')
  }
  const res = await axios.post('article/deleteArticle', {
    id
  })
    .catch(err => {
      throw err
    })
  return res
}

// 根据id获取单篇文章
const getOneArticle = async id => {
  if (!id) {
    throw new Error('请输入参数!!')
  }
  const res = await axios.get('article/getOneArticle?id='+id)
    .catch(err => {
      throw err
    })
  return res
}

// 添加某个用户喜欢某个文章
const likeArticle = async params => {
  if (!params) {
    throw new Error('请输入参数')
  }
  const res = await axios.post('article/likeArticle', params)
    .catch(err => {
      throw err
    })
  return res
}

// 查询喜欢某篇文章的用户
const likeList = async articleId => {
  if (!articleId) {
    throw new Error('请输入参数')
  }
  const res = await axios.get('article/articleLikeList?articleId=' + articleId)
    .catch(err => {
      throw err
    })
  return res
}

// 取消喜欢某篇文章
const dislikeArticle = async params => {
  if (!params) {
    throw new Error('请输入参数')
  }
  const res = await axios.post('article/dislikeArticle', params)
    .catch(err => {
      throw err
    })
  return res
}

// 增加文章查看次数
const viewArticle = async id => {
  if (!id) {
    throw new Error('请输入参数')
  }
  const res = await axios.get('article/viewArticle?id='+ id)
    .catch(err => {
      throw err
    })
  return res
}

const article = {
  getArticleGroup,
  addArticleGroup,
  updateArticleGroup,
  deleteGroup,
  addArticle,
  getArticleList,
  getAllArticle,
  updateArticle,
  deleteArticle,
  getOneArticle,
  likeArticle,
  likeList,
  dislikeArticle,
  viewArticle,
}

export default article