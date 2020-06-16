<template>
    <div>
        <login-log-filter />
        <table2
            ref="t2"
            :outside_fix_height="335"
            :cus-columns="columns"
            :get_list="get_list"
        >
        </table2>
    </div>
</template>

<script type="text/jsx">
import {TBaseAPI} from '../../config'
import Table2 from '../cus_template/Table2.vue'
import LoginLogFilter from './LoginLogFilter'
import get from 'lodash/get'
import {loginColumns} from '../../constant'

export default {
    name: 'login_log',
    data() {
        return {
            columns: loginColumns,
        }
    },
    computed: {
        searchState: function() {
            return this.$store.getters['BaseTableFilterx/search'](this.xkey)
        },
        params: function() {
            return this.$store.getters['BaseTableFilterx/params'](this.xkey)
        },
    },
    watch: {
        searchState: function(val) {
            if (val) this.get_list()
        },
    },
    methods: {
        get_list(page = 1) {
            this.$http(TBaseAPI + '/log')
                ._get()
                ._param('logType', 133)
                ._param('page', page)
                ._param('perpage', get(this.$refs.t2, 'pagination.pageSize', 20))
                ._params(this.params)
                ._loading(get(this.$refs.t2, 'loading'))
                ._sucLis(it => {
                    this.$refs.t2.lists = it.result.lists
                    this.$refs.t2.pagination = {
                        current: it.result.page,
                        pageSize: it.result.perpage,
                        total: it.result.totalNum,
                    }
                    this.$store.commit(
                        'BaseTableFilterx/searchFinish',
                        this.xkey,
                    )
                })
                ._errLis(it => {
                    this.$store.commit(
                        'BaseTableFilterx/searchFinish',
                        this.xkey,
                    )
                })
                ._execute()
        },
        search() {
            this.get_list(1, this.$refs.t2.pagination.pageSize, this.$refs.s2.loading, this.$refs.s2.params)
        },
    },
    components: {
        'table2': Table2,
        LoginLogFilter,
    },
    mounted() {
    },
}
</script>

<style scoped></style>
