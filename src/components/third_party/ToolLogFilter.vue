<template>
    <all-log-filter v-bind="$attrs">
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

export default {
    name: 'ToolLogFilter',
    data() {
        return {
            clientLoading: new LOADING(),
            clientId: undefined,
            clientLists: [],
        }
    },
    methods: {
        search() {
            this.$parent.search()
        },
    },
    computed: {
        params() {
            let d = this.$children[0].params
            d['client'] = this.clientId
            return d
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
