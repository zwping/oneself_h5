// 接口常量
let BaseAPI = 'http://localhost:5001'
// let BaseAPI = 'http://zwping.win:5001'

let login = BaseAPI + '/account/login'
let vtoken = BaseAPI + '/account/vtoken' // 校验token

let jdCookie = BaseAPI + '/jd_cookie'
let setJdCookie = BaseAPI + '/set_jd_cookie'

export {
  login,
  vtoken,
  jdCookie,
  setJdCookie
}
