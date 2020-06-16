<template>
    <div>
        <tool-log-filter :xkey="xkey" />
        <table2
            ref="t2"
            :outside_fix_height="355"
            :cus-columns="columns"
            :get_list="get_list"
        />
    </div>
</template>

<script>
import {TBaseAPI} from '../../config'
import Table2 from '../cus_template/Table2'
import get from 'lodash/get'
import ToolLogFilter from './ToolLogFilter'
import {toolLogColumns} from '@/constant'
import {
    getParams,
    setSearchFinish,
    getSearch,
} from '@/store/modules/BaseTableFilterx'

export default {
    data() {
        return {
            xkey: 'tool',
            columns: toolLogColumns,
        }
    },
    computed: {
        searchState: function() {
            return getSearch(this)
        },
    },
    watch: {
        searchState: function(val) {
            if (val) this.get_list()
        },
    },
    methods: {
        get_list(page = 1) {
            let perpage = get(this.$refs.t2, 'pagination.pageSize', 20)
            this.$http(TBaseAPI + '/log', 'get')
                ._param('page', page)
                ._param('perpage', perpage)
                ._params(getParams(this))
                ._loading(get(this.$refs.t2, 'loading'))
                ._sucLis(it => {
                    this.$refs.t2.lists = it.result.lists
                    this.$refs.t2.pagination = {
                        current: it.result.page,
                        pageSize: it.result.perpage,
                        total: it.result.totalNum,
                    }
                    setSearchFinish(this)
                })
                ._errLis(it => {
                    setSearchFinish(this)
                })
                ._execute()
        },
    },
    components: {
        table2: Table2,
        ToolLogFilter,
    },
}
</script>

<style scoped></style>
