import {vtoken} from '../../config'
import Cookies from 'js-cookie'
import {isEmpty} from '../../libs/Empty'
import {message} from 'ant-design-vue'
import {http} from '../../libs/HTTP'

const state = {
  token: '', // token值
  token_verify_ing: false, // token校验中
  token_verify_suc: false // token校验成功
}

const mutations = {
  emptyToken(state) {
    Cookies.remove('token')
    state.token = ''
    state.token_verify_ing = false
    state.token_verify_suc = false
  },
  setTokenVerifyIng(state) {
    state.token_verify_ing = true
  },
  setTokenVerifySuc(state) {
    state.token_verify_ing = false
    state.token_verify_suc = true
  },
  setTokenVerifyError(state) {
    state.token_verify_ing = false
    state.token_verify_suc = false
  }
}

const actions = {
  // 逻辑bug 如果token失效？
  verifyToken({commit}) {
    commit('setTokenVerifyIng')
    // if (state.token_verify_suc || isEmpty(state.token)) {
    //   commit('setTokenVerifyError')
    //   return
    // }
    http('/account/vtoken')
      ._commonData('token', Cookies.get('token'))
      ._shieldErrMessage()
      ._sucLis(r => {
        commit('setTokenVerifySuc')
      })
      ._errLis(r => {
        if (!isEmpty(state.token)) {
          message.warning('登录已过期')
        }
        commit('emptyToken')
      })
      ._execute()
  },
  logout({commit}) {
    Cookies.remove('token')
    commit('emptyToken')
  }
}

const getters = {
  token_verify_ing: state => {
    return !isEmpty(state.token) && state.token_verify_ing
  },
  null_token: state => {
    return isEmpty(state.token)
  },
  token_verify_suc: state => {
    return state.token_verify_suc
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
