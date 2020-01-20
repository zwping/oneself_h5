import Vue from 'vue'
import Vuex from 'vuex'
import tokenx from './modules/tokenx'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    tokenx
  }
})
