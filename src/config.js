// 接口常量
let BaseAPI = process.env.NODE_ENV === 'development' ? 'http://192.168.1.150:5001' : 'https://api.zwping.com'
// let BaseAPI = 'https://api.zwping.com'

export {
  BaseAPI
}
