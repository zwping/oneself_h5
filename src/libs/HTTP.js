import axios from 'axios'
import {BaseAPI} from '../config'
import {message} from 'ant-design-vue'
import Vue from 'vue'

const TIMEOUT = 5000
const COMMON_HEADERS = {
  // 'content-type': 'application/x-www-form-urlencoded'
  // 'content-type': 'multipart/form-data'
}
const COMMON_DATA = new FormData()
const COMMON_PARAMS = {}

function http(url, method = 'post') {
  return new Builder(url, method)
}

class Builder {
  constructor(url, method) {
    this.url = url
    this.method = method
    this.auth = {}
    this.headers = {}
    this.params = {}
    this.data = new FormData()
    this.loadingState = null
    this.timeout = TIMEOUT
    this.baseurl = BaseAPI
    this.sucLis = it => {
    }
    this.errLis = it => {
    }
    this.shieldErrMessage = false // 是否屏蔽错误消息
  }

  _auth(key, value) {
    this.auth.append(key, value)
    return this
  }

  _header(key, value) {
    this.headers.append(key, value)
    return this
  }

  _param(key, value) {
    this.params.append(key, value)
    return this
  }

  _data(key, value) {
    this.data.append(key, value)
    return this
  }

  _commonData(key, value) {
    COMMON_DATA.append(key, value)
    this._data(key, value)
    return this
  }

  _commonParams(key, value) {
    COMMON_PARAMS.append(key, value)
    this._param(key, value)
    return this
  }

  // 是否需要控制控件的加载状态
  _loading(loading) {
    this.loadingState = loading
    return this
  }

  _timeout(t) {
    this.timeout = t
    return this
  }

  _baseUrl(url) {
    this.baseurl = url
    return this
  }

  _sucLis(lis) {
    this.sucLis = lis
    return this
  }

  _errLis(lis) {
    this.errLis = lis
    return this
  }

  _shieldErrMessage(shield = true) {
    this.shieldErrMessage = shield
    return this
  }

  _execute() {
    __setLoading(this.loadingState, true)
    __interceptors()
    return axios
      .request({
        baseURL: this.baseurl,
        url: this.url,
        method: this.method,
        headers: this.headers,
        params: this.params,
        data: this.data,
        timeout: this.timeout,
        auth: this.auth
      })
      .then(it => {
        if (it.data.code === 200) {
          this.sucLis(it.data)
        } else {
          if (!this.shieldErrMessage) {
            message.error(it.data.msg)
          }
          this.errLis(it.data)
        }

        __setLoading(this.loadingState, false)
      })
      .catch(it => {
        console.log(it)
        if (!this.shieldErrMessage) {
          message.error(it.message)
        }
        this.errLis(it)
        __setLoading(this.loadingState, false)
      })
  }
}

/**
 * 拦截器
 * @private
 */
function __interceptors() {
  axios.interceptors.request.use(
    config => {
      config.headers = {
        ...COMMON_HEADERS,
        ...config.headers
      }
      if (config.method === 'post') {
        for (let d of COMMON_DATA) {
          config.data.set(d[0], d[1])
        }
      } else if (config.method === 'get') {
        config.params = {
          ...COMMON_PARAMS,
          ...config.params
        }
      }
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )
}

function __setLoading(loading, value) {
  if (loading === null) return
  if (loading instanceof LOADING) {
    loading.state = value
  }
}

/**
 * 加载状态 对象
 * @constructor loading
 */
function LOADING() {
  this.state = false
}

Vue.prototype.$http = http

export {LOADING, http}
