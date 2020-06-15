<template>
    <base-log-filter v-bind="$attrs" :reset="reset">
        <div>
            <a-input
                v-model="s_id"
                allowClear
                @keyup.enter.native="$parent.search()"
                style="margin-right: 10px; width: 80px;"
                placeholder="Id"
            />
            <a-input
                v-model="s_nickname"
                allowClear
                @keyup.enter.native="$parent.search()"
                style="margin-right: 10px; width: 130px;"
                placeholder="昵称"
            />
        </div>
    </base-log-filter>
</template>

<script>
import BaseLogFilter from '../third_party/BaseLogFilter'
import {isNotEmptyII} from '../../libs/Empty'
import {realType} from '../../libs/ObjectUtil'
import {TBaseAPI} from '../../config'
import get from 'lodash/get'

export default {
    name: 'LogScreen',
    props: {},
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
        reset() {
            this.s_id = ''
            this.s_nickname = ''
            this.$children[0].reset()
        },
    },
    computed: {
        params() {
            const {ip, analyze_time} = this.$children[0]
            return {
                operId: this.s_id,
                operNickName: this.s_nickname,
                stime: analyze_time.stime,
                etime: analyze_time.etime,
                ip: ip,
            }
        },
    },
    watch: {},
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
