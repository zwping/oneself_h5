<template>
    <!-- 固定分页，表格滚动 -->
    <a-table
        :columns="cusColumns"
        :data-source="lists"
        v-bind="$attrs"
        v-on="$listeners"
        :pagination="pagination"
        :rowKey="r => r.id"
        :scroll="{y: tableHeight}"
        :loading="loading.state"
        @change="handleTableChange"
        ref="child"
    >
        <template #time="time">
            <span>{{ stime(time) }}</span>
        </template>
        <template #oldValue="it">
            <span style="width: 200px">
                {{ it }}
            </span>
        </template>
        <template #newValue="it">
            <span style="word-break:break-all" :title="it">
                {{ cov_title(it) }}
            </span>
        </template>
        <template #portrait="it">
            <span
                ><a-avatar shape="square" :size="30" :src="it"></a-avatar
            ></span>
        </template>
        <template #progress="it">
            <span :title="it">
                <a-progress
                    :status="it[0] === it[1] ? 'success' : 'active'"
                    :percent="(it[0] / it[1]) * 100"
                    :show-info="false"
                />
            </span>
        </template>
        <solt name="cus_solt"></solt>
    </a-table>
</template>

<script>
import {stime} from '../../libs/TimeUtil'
import {LOADING} from '../../libs/HTTP'
import {isEmpty} from '../../libs/Empty'

export default {
    name: 'Table2',
    props: {
        cusColumns: {
            default: [],
        },
        outside_fix_height: {
            // 表格外固定宽度
            default: 290,
        },
        get_list: {},
    },
    data() {
        return {
            tableHeight: 0,
            lists: [],
            pagination: {
                showQuickJumper: true,
                showSizeChanger: true,
                pageSize: 20,
                showTotal: total => `Total ${total} items`,
            },
            loading: new LOADING(),
            params: {},
        }
    },
    methods: {
        getTableInnerHeight() {
            this.tableHeight = window.innerHeight - this.outside_fix_height
        },
        handleTableChange(pagination, filters, sorter) {
            this.pagination.pageSize = pagination.pageSize
            this.get_list(pagination.current)
        },
        stime(second) {
            return stime(second)
        },
        cov_title(title) {
            return isEmpty(title)
                ? '-'
                : title.length > 50
                ? title.substring(0, 50) + ' ...'
                : title
        },
    },
    watch: {},
    components: {},
    created() {
        window.addEventListener('resize', this.getTableInnerHeight)
        this.getTableInnerHeight()
        this.get_list() // 调用组件内的对象，需要等待挂载成功
    },
    mounted() {},
    destroyed() {
        window.removeEventListener('resize', this.getTableInnerHeight)
    },
}
</script>

<style scoped></style>
