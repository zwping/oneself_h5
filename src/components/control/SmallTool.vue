<template>
    <div class="card shadow">
        <span>JetBrains激活码 </span>
        <a-icon
            type="sync"
            @click="get_jetbrains(true)"
            :spin="jetBrainsLoading.state"
        />
        <div v-for="d in jbData" :key="d.id">
            <span>{{ d.title }}</span>
            <span> {{ d.time }} </span>
            <a :title="d.code" @click="copy(d.code, d.title)">复制</a>
        </div>
        <span>王子 剩余流量 </span>
        <a-icon
            type="sync"
            @click="get_wangzi(true)"
            :spin="wangziLoading.state"
        />
        <div v-for="d in wangziData" :key="d.id">
            <span>{{ d.title }}</span>
            <span> {{ d.des }} </span>
        </div>
    </div>
</template>

<script>
import {LOADING} from '../../libs/HTTP'
import {stime} from '../../libs/TimeUtil'
import {copy} from '../../libs/CopyUtil'

export default {
    name: 'SmallTool',
    data() {
        return {
            jetBrainsLoading: new LOADING(),
            jbData: [],
            wangziLoading: new LOADING(),
            wangziData: [],
        }
    },
    methods: {
        get_jetbrains(refresh = false) {
            this.$http('/jetbrains', 'get')
                ._loading(this.jetBrainsLoading)
                ._sucLis(it => {
                    for (let d of it.result) {
                        d.time = stime(d.time)
                    }
                    this.jbData = it.result
                    if (refresh) this.$message.success('刷新成功')
                })
                ._executeFilter(() => {
                    return !this.jetBrainsLoading.state
                })
                ._execute()
        },
        copy(text, name) {
            copy(text)
            this.$message.success('复制成功' + name)
        },
        get_wangzi(refresh = false) {
            this.$http('/types', 'get')
                ._loading(this.wangziLoading)
                ._param('pid', 131)
                ._sucLis(it => {
                    this.wangziData = it.result.types
                })
                ._executeFilter(() => {
                    return !this.wangziLoading.state
                })
                ._execute()
        },
    },
    mounted() {
        this.get_jetbrains()
        this.get_wangzi()
    },
}
</script>

<style scoped>
.shadow {
    -webkit-box-shadow: #666 0px 0px 10px;
    -moz-box-shadow: #666 0px 0px 10px;
    box-shadow: #666 0px 0px 10px;
    margin: 10px auto;
    background: #ffffff;
}

.card {
    width: 600px;
    height: 300px;
    padding: 10px;
}
</style>
