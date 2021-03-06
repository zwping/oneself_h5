const state = {
    // xkey 外部传入的key, xkey本身只有说明的作用
    searchState: {xkey: false}, // 修改值控制loading, watch值执行搜索
    resetState: {xkey: false}, // watch值执行reset
    params: {xkey: {}},
}

const mutations = {
    searching(state, xkey) {
        state.searchState = Object.assign({}, state.searchState, {[xkey]: true})
    },
    searchFinish(state, xkey) {
        state.searchState = Object.assign({}, state.searchState, {
            [xkey]: false,
        })
    },
    reset(state, xkey) {
        state.params = Object.assign({}, state.params, {[xkey]: {}})
        state.resetState = Object.assign({}, state.resetState, {
            [xkey]: !state.resetState[xkey],
        })
    },
    params(state, {xkey, params}) {
        // state.params = Object.assign({}, state.params, {[xkey]: params})
        state.params[xkey] = {
            ...state.params[xkey],
            ...params,
        }
        state.params = Object.assign({}, state.params)
    },
}

const getters = {
    search: state => xkey => {
        return state.searchState[xkey] || false
    },
    reset: state => xkey => {
        return state.resetState[xkey]
    },
    params: state => xkey => {
        return state.params[xkey]
    },
}

/*** 解决inject多层级组件不能共用问题 ***/

export default {
    namespaced: true,
    state,
    mutations,
    getters,
}

/*** 方法封装，方便调用 ***/

export function setSearch(context, xkey = undefined) {
    context.$store.commit('BaseTableFilterx/searching', xkey || context.xkey)
}

export function setSearchFinish(context, xkey = undefined) {
    context.$store.commit('BaseTableFilterx/searchFinish', xkey || context.xkey)
}

export function getSearch(context, xkey = undefined) {
    return context.$store.getters['BaseTableFilterx/search'](
        xkey || context.xkey,
    )
}

export function getReset(context, xkey = undefined) {
    return context.$store.getters['BaseTableFilterx/reset'](
        xkey || context.xkey,
    )
}

export function synParams(context, val, xkey = undefined) {
    context.$store.commit('BaseTableFilterx/params', {
        xkey: xkey || context.xkey,
        params: val,
    })
}

export function getParams(context, xkey = undefined) {
    return context.$store.getters['BaseTableFilterx/params'](
        xkey || context.xkey,
    )
}
