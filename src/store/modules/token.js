import {vtoken} from '../../config'
import {post} from '../../libs/HTTP'
import Cookies from 'js-cookie'

const state = {
  token: '',
  token_able: false
}

const mutations = {
  emptyToken(state) {
    Cookies.remove('token')
    state.token = '' // 界面不更新？
  },
  setTokenAble(state) {
    state.token_able = true
  }
}

const actions = {
  // 逻辑bug 如果token失效？
  verify_token({commit}) {
    post(vtoken, {'token': state.token})
      .then(it => {
        if (it.data.data.code === 200) {
          commit('setTokenAble')
        } else commit('emptyToken')
        console.log(it)
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
