// 测试环境的后端IP
const devHost = 'http://127.0.0.1:3000'
// 生产环境的后端IP
const prdHost = 'http://www.xhfkindergarten.cn:3000'
// 后端IP
const host = process.env.NODE_ENV=='development'?devHost:prdHost

// 图片服务器IP
const imgHost = 'http://img.xhfkindergarten.cn'

// 当前登录状态
const status = {
  NOT_LOGIN: false,
  LOGIN: true
}

const whiteList = [
  '/',
]
// 发送邮件的间隔时间
const sendEmailWaitTime = 60

const keys = {
  host,
  devHost,
  prdHost,
  imgHost,
  status,
  whiteList,
  sendEmailWaitTime
}

export default keys