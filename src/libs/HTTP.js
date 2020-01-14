import axios from 'axios'
import qs from 'Qs'

function post(url, params = {}) {
  return axios.post(url, qs.stringify(params))
}

function get(url, params = {}) {
  return axios.get(url)
}

export {post, get}
