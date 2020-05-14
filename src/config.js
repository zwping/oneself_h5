// 接口常量
let BaseAPI = process.env.NODE_ENV === 'development' ? 'http://192.168.1.150:5001' : 'https://api.zwping.com'
// let BaseAPI = 'https://api.zwping.com'

// let TBaseAPI = process.env.NODE_ENV === 'development' ? 'http://192.168.1.150:5000' : 'https://api.tool.zwping.com'
let TBaseAPI = 'https://api.tool.zwping.com'

export {
  BaseAPI, TBaseAPI
}
