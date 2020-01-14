import {vtoken} from '../../config'
import {post} from '../../libs/HTTP'

const state = {
  token: ''
}

const actions = {
  verify_token({commit}) {
  }
}

export default {
  namespaced: true,
  state,
  actions
}
