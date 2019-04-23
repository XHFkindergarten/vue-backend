// 测试环境的后端IP
const devHost = 'http://127.0.0.1:3000'
// 生产环境的后端IP
const prdHost = ''
// 当前登录状态
const status = {
  NOT_LOGIN: false,
  LOGIN: true
}
const keys = {
  devHost,
  prdHost,
  status
}
export default keys