import Vue from 'vue'
import Vuex from 'vuex'
import tokenx from './modules/tokenx'
import userInfox from './modules/userInfox'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        tokenx,
        userInfox,
    },
})
