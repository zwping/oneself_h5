import axios from 'axios'
import qs from 'Qs'
import Cookies from 'js-cookie'
import {message} from "ant-design-vue"
import Vue from 'vue'

Vue.prototype.$message = message // 按需加载message

let axiosInstance = axios.create({
  timeout: 5000
})

axiosInstance.interceptors.request.use(
  config => {
    let token = Cookies.get('token')
    if (token) {
      // console.log(config.data)
      // config.data = {'token': token}
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject((error))
  }
)

function CommCallback(it) {
}

/**
 * 网络请求通用回执处理
 * @param request 请求
 * @param sucCallback 成功回执
 * @param errorCallback 错误回执
 * @param loading 请求中的状态值
 * @param shieldMessage 屏蔽底层消息通知
 */
function commCallback(request, sucCallback, errorCallback, loading = null, shieldMessage = false) {
  __setLoading(loading, true)
  request
    .then(it => {
      if (it.data.code === 200) {
        sucCallback(it.data)
      } else {
        if (!shieldMessage) {
          message.error(it.data.msg)
        }
        errorCallback(it.data)
      }
      __setLoading(loading, false)
    })
    .catch(it => {
      console.log('网络请求崩溃:' + it)
      if (!shieldMessage) {
        message.error(it.message)
      }
      errorCallback(it)
      __setLoading(loading, false)
    })
}

function post(url, success, loading = LOADING, params = {}, error = CommCallback, shieldMessage = false) {
  commCallback(axiosInstance.post(url, qs.stringify(params)), success, error, loading, shieldMessage)
}

function get(url, success, loading = LOADING, params = {}, error = CommCallback, shieldMessage = false) {
  commCallback(axiosInstance.get(url), success, error, loading, shieldMessage)
}

function __setLoading(loading, value) {
  if (loading === null) return
  if (loading instanceof LOADING) {
    loading.loading = value
  }
}

/**
 * 加载状态 对象
 * @constructor loading
 */
function LOADING() {
  this.loading = false
}

export {post, get, LOADING}
