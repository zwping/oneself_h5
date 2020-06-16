<template>
    <base-log-filter :xkey="xkey">
        <div>
            <a-input
                v-model="s_id"
                allowClear
                @keyup.enter.native="search"
                style="margin-right: 10px; width: 80px;"
                placeholder="Id"
            />
            <a-input
                v-model="s_nickname"
                allowClear
                @keyup.enter.native="search"
                style="margin-right: 10px; width: 130px;"
                placeholder="昵称"
            />
        </div>
    </base-log-filter>
</template>

<script>
import BaseLogFilter from '../third_party/BaseLogFilter'
import {TBaseAPI} from '../../config'
import {getReset, synParams, setSearch} from '@/store/modules/BaseTableFilterx'

export default {
    name: 'LogScreen',
    props: ['xkey'],
    data() {
        return {
            s_ip: '',
            s_stime: '',
            s_etime: '',
            s_id: '',
            s_nickname: '',
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
        search() {
            setSearch(this)
        },
    },
    computed: {
        params() {
            return {
                operId: this.s_id,
                operNickName: this.s_nickname,
            }
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
            this.s_id = ''
            this.s_nickname = ''
        },
    },
    beforeCreate() {
        this.$http(TBaseAPI + '/log/ips')
            ._get()
            ._param('client', 128)
            ._sucLis(it => {
                this.ip_data = it.result
            })
            ._execute()
    },
    components: {
        BaseLogFilter,
    },
}
</script>

<style scoped></style>
