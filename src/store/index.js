import Vue from 'vue'
import Vuex from 'vuex'
import tokenx from './modules/tokenx'
import userInfox from './modules/userInfox'
import BaseTableFilterx from './modules/BaseTableFilterx'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        tokenx,
        userInfox,
        BaseTableFilterx,
    },
})
