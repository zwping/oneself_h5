<template>
    <base-table-filter v-bind="$attrs">
        <a-auto-complete
            style="margin-right: 10px;width: 140px;"
            v-model="ip"
            allowClear
            :data-source="ip_data"
            :filter-option="ips_filter"
            placeholder="ip"
        />
        <a-range-picker
            v-model="time"
            allowClear
            @keyup.enter.native="search"
            style="margin-right: 10px;width: 220px;"
        />
        <slot />
    </base-table-filter>
</template>

<script>
import BaseTableFilter from '../BaseTableFilter'
import {isNotEmptyII} from '../../libs/Empty'
import {realType} from '../../libs/ObjectUtil'
import {TBaseAPI} from '../../config'

export default {
    name: 'LogIpsChild',
    data() {
        return {
            ip: '',
            ip_data: [],
            time: [],
        }
    },
    methods: {
        ips_filter(input, option) {
            return (
                option.componentOptions.children[0].text
                    .toUpperCase()
                    .indexOf(input.toUpperCase()) >= 0
            )
        },
        reset() {
            this.ip = ''
            this.time = []
        },
    },
    computed: {
        analyze_time: function() {
            let d =
                isNotEmptyII(this.time) && realType(this.time[0]) === 'object'
            return {
                stime: d ? this.time[0].format('YYYY-MM-DD') : '',
                etime: d ? this.time[1].format('YYYY-MM-DD') : '',
            }
        },
    },
    beforeCreate() {
        this.$http(TBaseAPI + '/log/ips', 'get')
            ._param('client', 128)
            ._sucLis(it => {
                this.ip_data = it.result
            })
            ._execute()
    },
    components: {
        BaseTableFilter,
    },
}
</script>

<style scoped>
.rly {
    padding: 0px;
}
</style>
