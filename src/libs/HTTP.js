import axios from 'axios'
import {BaseAPI} from '../config'
import {message} from 'ant-design-vue'
import Vue from 'vue'
import {isNotEmpty} from './Empty'

const TIMEOUT = 5000
const MAX_RETRIES = 3
const RETRY_INTERVAL = 1000
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
        this.loadingStates = []
        this.timeout = TIMEOUT
        this.max_retries = MAX_RETRIES
        this.retry_interval = RETRY_INTERVAL
        this.baseurl = BaseAPI
        this.withCredentials = false
        this.sucLis = it => {}
        this.errLis = it => {}
        this.isExecute = true // 是否执行网络请求
        this.shieldErrMessage = false // 是否屏蔽错误消息
    }

    _post() {
        this.method = 'post'
        return this
    }

    _delete() {
        this.method = 'delete'
        return this
    }

    _put() {
        this.method = 'put'
        return this
    }

    _get() {
        this.method = 'get'
        return this
    }

    _auth(key, value) {
        if (value !== undefined || value !== 'undefined') {
            this.auth.append(key, value)
        }
        return this
    }

    _header(key, value) {
        if (value !== undefined || value !== 'undefined') {
            this.headers[key] = value
        }
        return this
    }

    _headers(dict = {}) {
        for (let k in dict) {
            this._header(k, dict[k])
        }
        return this
    }

    _param(key, value) {
        if (value !== undefined || value !== 'undefined') {
            this.params[key] = value
        }
        return this
    }

    _params(dict = {}) {
        for (let k in dict) {
            this._param(k, dict[k])
        }
        return this
    }

    _data(key, value) {
        if (value !== undefined || typeof value !== 'undefined') {
            this.data.append(key, value)
        }
        return this
    }

    _commonData(key, value) {
        if (value !== undefined || value !== 'undefined') {
            COMMON_DATA.append(key, value)
            // this._data(key, value)
        }
        return this
    }

    _commonParams(key, value) {
        if (value !== undefined || value !== 'undefined') {
            COMMON_PARAMS[key] = value
            // this._param(key, value)
        }
        return this
    }

    _commonHeader(key, value) {
        if (value !== undefined || value !== 'undefined') {
            COMMON_HEADERS[key] = value
        }
        return this
    }

    // 是否需要控制控件的加载状态
    _loading(loading) {
        for (let d of arguments) {
            if (isNotEmpty(d) && d instanceof LOADING) {
                this.loadingStates.push(d)
            }
        }
        return this
    }

    _timeout(t) {
        this.timeout = t
        return this
    }

    _maxRetries(retries, interval) {
        this.max_retries = retries
        this.retry_interval = interval
    }

    /**
     * baseUrl
     * @param url
     * @deprecated 可直接在http(url*)中编写决定路径
     */
    _baseUrl(url) {
        this.baseurl = url
        return this
    }

    _cors() {
        this.withCredentials = true
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

    _executeFilter(filter) {
        this.isExecute = filter()
        return this
    }

    _execute() {
        if (this.isExecute === false) {
            return null
        }
        __setLoading(this.loadingStates, true)
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
                maxRetries: this.max_retries,
                retryInterval: this.retry_interval,
                auth: this.auth,
            })
            .then(it => {
                __setLoading(this.loadingStates, false)
                if (it.data.code === 200) {
                    this.sucLis(it.data)
                } else {
                    if (!this.shieldErrMessage) {
                        message.error(it.data.msg)
                    }
                    this.errLis(it.data)
                }
            })
            .catch(it => {
                __setLoading(this.loadingStates, false)
                console.log(it)
                if (!this.shieldErrMessage) {
                    message.error(it.message)
                }
                this.errLis(it)
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
                ...config.headers,
            }
            let method = config.method
            if (method === 'post' || method === 'put' || method === 'delete') {
                for (let d of COMMON_DATA) {
                    config.data.set(d[0], d[1])
                }
            } else if (method === 'get') {
                config.params = {
                    ...COMMON_PARAMS,
                    ...config.params,
                }
            }
            return config
        },
        error => {
            return Promise.reject(error)
        },
    )
    axios.interceptors.response.use(
        res => {
            return res
        },
        function axiosRetryInterceptor(res) {
            let config = res.config
            if (!config || !config.maxRetries) return Promise.reject(res)
            config.retryCount = config.retryCount || 0
            if (config.retryCount >= config.maxRetries) {
                return Promise.reject(res)
            }
            config.retryCount += 1
            let back = new Promise(function(resolve) {
                setTimeout(function() {
                    resolve()
                }, config.retryInterval || 1)
            })
            return back.then(function() {
                return axios(config)
            })
        },
    )
}

function __setLoading(loadings, value) {
    for (let d of loadings) {
        if (d instanceof LOADING) {
            d.state = value
        }
    }
}

/**
 * 加载状态 对象
 * @constructor loading
 */
class LOADING {
    constructor() {
        this.state = false
    }
}

Vue.prototype.$http = http

export {LOADING, http}
