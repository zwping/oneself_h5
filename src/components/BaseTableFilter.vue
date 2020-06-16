<!--针对表格类的展示列表，顶部筛选功能剥离出来-->
<template>
    <div class="root_ly">
        <div
            style="display: flex;display: -webkit-flex;flex-direction: row-reverse;"
        >
            <a-button
                @keyup.enter.native="searchF"
                type="primary"
                @click="searchF"
                :loading="loading"
                style="width: 80px;"
            >
                搜索
            </a-button>
            <a-button
                type="default"
                style="margin-right: 10px;"
                @click="resetF"
            >
                重置
            </a-button>
            <slot />
        </div>
    </div>
</template>

<script>
import {getSearch, setSearch} from '@/store/modules/BaseTableFilterx'

export default {
    name: 'BaseFilter',
    props: {
        xkey: {
            required: true,
            validator: function(value) {
                // xkey必填参数
                return ['tool', 'all', 'login'].indexOf(value) !== -1
            },
        },
    },
    computed: {
        loading: function() {
            return getSearch(this)
        },
    },
    methods: {
        searchF() {
            setSearch(this)
        },
        resetF() {
            this.$store.commit('BaseTableFilterx/reset', this.xkey)
        },
    },
}
</script>

<style scoped>
.root_ly {
    display: flex;
    display: -webkit-flex;
    justify-content: flex-end;
    padding-bottom: 10px;
}
</style>
