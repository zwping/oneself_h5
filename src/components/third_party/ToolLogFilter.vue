<template>
    <all-log-filter :xkey="xkey">
        <a-select
            @keyup.enter.native="search"
            style="width: 110px;margin-right: 10px;"
            :loading="clientLoading.state"
            placeholder="客户端"
            v-model="clientId"
            allowClear
        >
            <a-select-option v-for="d in clientLists" :value="d.id" :key="d.id">
                {{ d.title }}
            </a-select-option>
        </a-select>
    </all-log-filter>
</template>

<script>
import AllLogFilter from '../log/AllLogFilter'
import {LOADING} from '../../libs/HTTP'
import {isNotEmpty} from '../../libs/Empty'
import {TBaseAPI} from '../../config'
import {getReset, synParams, setSearch} from '@/store/modules/BaseTableFilterx'

export default {
    name: 'ToolLogFilter',
    props: ['xkey'],
    data() {
        return {
            clientLoading: new LOADING(),
            clientId: undefined,
            clientLists: [],
        }
    },
    methods: {
        search() {
            setSearch(this)
        },
    },
    computed: {
        params: function() {
            return {client: this.clientId}
        },
        reset: function() {
            return getReset(this)
        },
    },
    watch: {
        params: function(val) {
            synParams(this, val)
        },
        reset: function() {
            this.clientId = undefined
        },
    },
    beforeCreate() {
        this.$http(TBaseAPI + '/types', 'get')
            ._param('pid', 127)
            ._loading(this.logTypeLoading)
            ._sucLis(it => {
                for (let d of it.result.types) {
                    if (isNotEmpty(d.children)) {
                        for (let d1 of d.children) {
                            it.result.types.push(d1)
                        }
                    }
                }
                this.clientLists = it.result.types
            })
            ._execute()
    },
    components: {
        AllLogFilter,
    },
}
</script>

<style scoped></style>
