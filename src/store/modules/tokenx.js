import Cookies from 'js-cookie'
import {isEmpty} from '../../libs/Empty'
import {message} from 'ant-design-vue'
import {http} from '../../libs/HTTP'

const state = {
    data: null, // 登录返回的用户数据
    token: '', // token值
    token_verify_ing: false, // token校验中
    token_verify_suc: false, // token校验成功
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
    },
    applyUserData(state, data) {
        if (isEmpty(state.data)) {
            state.data = data
            return
        }
        for (let d in data) {
            state.data[d] = data[d]
        }
    },
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
            ._commonHeader('token', Cookies.get('token'))
            ._shieldErrMessage()
            ._sucLis(r => {
                commit('applyUserData', r['result'])
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
    },
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
    },
    data: state => {
        return state.data
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
