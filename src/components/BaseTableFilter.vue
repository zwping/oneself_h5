<!--针对表格类的展示列表，顶部筛选功能剥离出来-->
<template>
    <div class="root_ly" :loading="loading">
        <div
            style="display: flex;display: -webkit-flex;flex-direction: row-reverse;"
        >
            <a-button
                @keyup.enter.native="search"
                type="primary"
                @click="search"
                :loading="loading.state"
                style="width: 80px;"
            >
                搜索
            </a-button>
            <a-button type="default" style="margin-right: 10px;" @click="reset">
                重置
            </a-button>
            <slot />
        </div>
    </div>
</template>

<script>
import {LOADING} from '../libs/HTTP'

export default {
    name: 'BaseFilter',
    props: {
        search: {type: Function}, // 搜索方法，直接在表格页实现，需要在筛选页设置v-bind='$attrs'
        reset: {type: Function}, // 搜索条件重置方法，一般放在筛选页实现
    },
    data() {
        return {
            loading: new LOADING(), // _.get(this.$refs.s2.$children[0], 'loading')
        }
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
