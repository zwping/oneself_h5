import {vtoken} from '../../config'
import {post} from '../../libs/HTTP'
import Cookies from 'js-cookie'

const state = {
  token: '', // token值
  token_verify_ing: false, // token校验中
  token_verify_suc: false // token校验成功
}

const mutations = {
  emptyToken(state) {
    console.log(123)
    Cookies.remove('token')
    state.token = '' // 界面不更新？
    state.token_verify_ing = false
    state.token_verify_suc = false
  },
  setTokenVerifyIng(state) {
    state.token_verify_ing = true
  },
  setTokenVerifySuc(state) {
    state.token_verify_ing = false
    state.token_verify_suc = true
  }
}

const actions = {
  // 逻辑bug 如果token失效？
  verify_token({commit}) {
    commit('setTokenVerifyIng')
    post(vtoken, {'token': state.token})
      .then(it => {
        if (it.data.data.code === 200) {
          commit('setTokenVerifySuc')
        } else commit('emptyToken')
      })
      .catch(it => {
        commit('emptyToken')
      })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
