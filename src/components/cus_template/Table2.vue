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
      <span>{{stime(time)}}</span>
    </template>
    <template #oldValue="it">
        <span style="width: 200px">
          {{it}}
        </span>
    </template>
    <template #newValue="it">
        <span style="word-break:break-all">
          {{it}}
        </span>
    </template>
  </a-table>
</template>

<script>
  import {Table} from 'ant-design-vue'
  import {stime} from '../../libs/TimeUtil'
  import {LOADING} from '../../libs/HTTP'

  export default {
    name: 'Table2',
    props: {
      'cusColumns': {
        default: []
      },
      'outside_fix_height': { // 表格外固定宽度
        default: 290
      },
      'get_list': {},
    },
    data() {
      return {
        tableHeight: 0,
        lists: [],
        pagination: {
          showQuickJumper: true,
          showSizeChanger: true
        },
        loading: new LOADING(),
      }
    },
    methods: {
      getTableInnerHeight() {
        this.tableHeight = window.innerHeight - this.outside_fix_height
      },
      handleTableChange(pagination, filters, sorter) {
        this.get_list(pagination.current, pagination.pageSize)
      },
      stime(second) {
        return stime(second)
      },
    },
    watch: {
      ss: function (val) {
        console.log(this.ss)
      }
    },
    components: {
      [Table.name]: Table
    },
    created() {
      window.addEventListener('resize', this.getTableInnerHeight)
      this.getTableInnerHeight()
    },
    mounted() {
      this.get_list() // 调用组件内的对象，需要等待挂载成功
    },
    destroyed() {
      window.removeEventListener('resize', this.getTableInnerHeight)
    }
  }
</script>

<style scoped>

</style>
