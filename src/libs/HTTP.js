import axios from 'axios'
import qs from 'Qs'
import Cookies from 'js-cookie'
import Vue from 'vue'

const vue = new Vue()

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
 * @param loadingCallback 请求中回值
 * @param shieldMessage 屏蔽底层消息通知
 */
function commCallback(request, sucCallback, errorCallback, loadingCallback, shieldMessage = false) {
  loadingCallback(true)
  request
    .then(it => {
      if (it.data.code === 200) {
        sucCallback(it.data)
      } else {
        if (!shieldMessage) {
          vue.$message.error(it.data.msg)
        }
        errorCallback(it.data)
      }
      loadingCallback(false)
    })
    .catch(it => {
      if (!shieldMessage) {
        vue.$message.error(it.message)
      }
      errorCallback(it)
      loadingCallback(false)
    })
}

function post(url, success, loading = CommCallback, params = {}, error = CommCallback, shieldMeeage = false) {
  commCallback(axiosInstance.post(url, qs.stringify(params)), success, error, loading, shieldMeeage)
}

function get(url, success, loading = CommCallback, params = {}, error = CommCallback, shieldMeeage = false) {
  commCallback(axiosInstance.get(url), success, error, loading, shieldMeeage)
}

export {post, get}
