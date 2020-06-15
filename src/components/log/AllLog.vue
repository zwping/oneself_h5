<template>
    <div>
        <all-log-filter ref="s2" :search="search" />
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
import AllLogFilter from './AllLogFilter'
import get from 'lodash/get'
import {AllLogColumns} from '@/constant'

export default {
    data() {
        return {
            columns: AllLogColumns,
        }
    },
    methods: {
        search() {
            this.get_list()
        },
        get_list(page = 1) {
            this.$http(TBaseAPI + '/log', 'get')
                ._param('client', 128)
                ._param('page', page)
                ._param('perpage', get(this.$refs.t2, 'pagination.pageSize', 20))
                ._params(get(this.$refs.s2, 'params'))
                ._loading(get(this.$refs.t2, 'loading'), get(this.$refs.s2.$children[0].$children[0], 'loading'))
                ._sucLis(it => {
                    this.$refs.t2.lists = it.result.lists
                    this.$refs.t2.pagination = {
                        current: it.result.page,
                        pageSize: it.result.perpage,
                        total: it.result.totalNum,
                    }
                })
                ._execute()
        },
    },
    components: {
        'table2': Table2,
        'allLogFilter': AllLogFilter,
    },
}
</script>

<style scoped></style>
