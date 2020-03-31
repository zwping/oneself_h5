// 接口常量
// let BaseAPI = 'http://localhost:5001'
let BaseAPI = process.env.NODE_ENV === 'development' ? 'http://192.168.1.150:5001' : 'http://zwping.win:5001'

let login = BaseAPI + '/account/login'
let vtoken = BaseAPI + '/account/vtoken' // 校验token

let jdCookie = BaseAPI + '/jd_cookie'
let setJdCookie = BaseAPI + '/set_jd_cookie'
let testJdCookie = BaseAPI + '/test_jd_youhuijuan'

export {
  login,
  vtoken,
  jdCookie,
  setJdCookie,
  testJdCookie
}
