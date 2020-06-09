<template>
    <div class="root_ly">
        <div
            style="display: flex;display: -webkit-flex;flex-direction: row-reverse;"
        >
            <a-button
                @keyup.enter.native="search"
                type="primary"
                :loading="loading.state"
                @click="search"
                style="width: 80px;"
                >搜索
            </a-button>
            <a-button @click="reset" type="default" style="margin-right: 10px;"
                >重置</a-button
            >
            <a-auto-complete
                @keyup.enter.native="search"
                style="margin-right: 10px; width: 150px;"
                v-model="s_ip"
                allowClear
                :data-source="ip_data"
                :filter-option="ips_filter"
                placeholder="ip"
            />
            <a-range-picker
                v-model="s_time"
                allowClear
                @keyup.enter.native="search"
                style="margin-right: 10px;width: 220px;"
            >
            </a-range-picker>
            <a-input
                v-model="s_nickname"
                allowClear
                @keyup.enter.native="search"
                style="margin-right: 10px; width: 130px;"
                placeholder="昵称"
            />
            <a-input
                v-model="s_id"
                allowClear
                @keyup.enter.native="search"
                style="margin-right: 10px; width: 80px;"
                placeholder="Id"
            />
        </div>
    </div>
</template>

<script>
import {AutoComplete, Button, DatePicker, Input} from 'ant-design-vue'
import {LOADING} from '../../libs/HTTP'
import {isNotEmptyII} from '../../libs/Empty'
import {realType} from '../../libs/ObjectUtil'
import {TBaseAPI} from '../../config'

export default {
    name: 'AllLogFilter',
    props: {
        search: {},
    },
    data() {
        return {
            loading: new LOADING(),
            ip_data: [],
            s_ip: '',
            s_time: [],
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
            this.s_time = []
            this.s_ip = ''
            this.s_id = ''
            this.s_nickname = ''
        },
    },
    computed: {
        // is_screen() {
        //   return isNotEmptyII(this.s_id, this.s_nickname, this.s_stime, this.s_etime, this.s_ip)
        // }
        params() {
            return {
                operId: this.s_id,
                operNickName: this.s_nickname,
                stime: this.s_stime,
                etime: this.s_etime,
                ip: this.s_ip,
            }
        },
    },
    watch: {
        s_time: function(v) {
            let d = isNotEmptyII(v) && realType(v[0]) === 'object'
            this.s_stime = d ? v[0].format('YYYY-MM-DD') : ''
            this.s_etime = d ? v[1].format('YYYY-MM-DD') : ''
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
        [Button.name]: Button,
        [AutoComplete.name]: AutoComplete,
        [DatePicker.RangePicker.name]: DatePicker.RangePicker,
        [Input.name]: Input,
    },
}
</script>

<style scoped>
.root_ly {
    display: flex;
    display: -webkit-flex;
    justify-content: flex-end;
    height: 52px;
    padding-top: 10px;
    padding-bottom: 10px;
}
</style>
