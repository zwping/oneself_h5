<template>
    <base-log-filter :xkey="xkey">
        <a-input
            v-model="nickname"
            allowClear
            @keyup.enter.native="search"
            style="margin-right: 10px; width: 80px;"
            placeholder="昵称"
        />
        <a-input
            v-model="tid"
            allowClear
            @keyup.enter.native="search"
            style="margin-right: 10px; width: 80px;"
            placeholder="Id"
        />
        <a-input
            v-model="remark"
            allowClear
            @keyup.enter.native="search"
            style="margin-right: 10px; width: 100px;"
            placeholder="备注"
        />
        <a-input
            v-model="newValue"
            allowClear
            @keyup.enter.native="search"
            style="margin-right: 10px; width: 100px;"
            placeholder="新值"
        />
        <a-input
            v-model="tableName"
            allowClear
            @keyup.enter.native="search"
            style="margin-right: 10px; width: 100px;"
            placeholder="表名"
        />
        <a-select
            @keyup.enter.native="search"
            style="width: 110px;margin-right: 10px;"
            :loading="logTypeLoading.state"
            placeholder="日志类型"
            v-model="logTypeId"
            allowClear
        >
            <a-select-option v-for="d in logTypes" :value="d.id" :key="d.id">
                {{ d.title }}
            </a-select-option>
        </a-select>
        <slot />
    </base-log-filter>
</template>

<script>
import BaseLogFilter from '@/components/third_party/BaseLogFilter'
import {LOADING} from '@/libs/HTTP'
import {isNotEmptyII} from '@/libs/Empty'
import {realType} from '@/libs/ObjectUtil'
import {TBaseAPI} from '@/config'
import {isNotEmpty} from '../../libs/Empty'
import {mapGetters} from 'vuex'

export default {
    name: 'AllLogFilter',
    props: {
        xkey: {
            default: 'all',
        },
    },
    mounted() {},
    data() {
        return {
            tid: '',
            nickname: '',
            tableName: '',
            newValue: '',
            remark: '',
            logTypeId: undefined,
            logTypes: [],
            logTypeLoading: new LOADING(),
        }
    },
    methods: {
        search() {
            this.$store.commit('BaseTableFilterx/searching', this.xkey)
        },
        ips_filter(input, option) {
            return (
                option.componentOptions.children[0].text
                    .toUpperCase()
                    .indexOf(input.toUpperCase()) >= 0
            )
        },
    },
    computed: {
        params() {
            return {
                operId: this.tid,
                operNickName: this.nickname,
                logType: this.logTypeId,
                operTable: this.tableName,
                newValue: this.newValue,
                remark: this.remark,
            }
        },
        reset: function() {
            return this.$store.getters['BaseTableFilterx/reset'](this.xkey)
        },
    },
    watch: {
        params: function(val) {
            this.$store.commit('BaseTableFilterx/params', {
                xkey: this.xkey,
                params: val,
            })
        },
        reset: function() {
            this.tid = ''
            this.nickname = ''
            this.logTypeId = undefined
            this.remark = ''
            this.newValue = ''
            this.tableName = ''
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
        this.$http(TBaseAPI + '/types', 'get')
            ._param('pid', 132)
            ._loading(this.logTypeLoading)
            ._sucLis(it => {
                for (let d of it.result.types) {
                    if (isNotEmpty(d.children)) {
                        for (let d1 of d.children) {
                            it.result.types.push(d1)
                        }
                    }
                }
                this.logTypes = it.result.types
            })
            ._execute()
    },
    components: {BaseLogFilter},
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
