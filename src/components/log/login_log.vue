<template>
  <div>
    <a-table
      :columns="columns" :data-source="lists"
      :loading="loading.state"
      :pagination="pagination"
      :scroll="{y: tableHeight}"
      :rowKey="r => r.id"
      @change="handleTableChange"
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
  </div>

</template>

<script>
  import {TBaseAPI} from "../../config"
  import {Table} from 'ant-design-vue'
  import {LOADING} from "../../libs/HTTP"
  import {stime} from '../../libs/TimeUtil'

  export default {
    name: "login_log",
    data() {
      return {
        columns: [
          {dataIndex: 'id', title: '日志ID', align: 'center', width: 100},
          {dataIndex: 'client', title: '客户端', width: 120},
          // {dataIndex: 'logType', title: '日志类型', width: 150},
          {dataIndex: 'operId', title: '登录人Id', width: 100, align: 'center'},
          {dataIndex: 'operNickName', title: '登录人昵称', width: 150, align: 'center'},
          // {dataIndex: 'operTable', title: '操作表名', width: 150},
          // {dataIndex: 'operDataId', title: '被操作Id', width: 100},
          // {dataIndex: 'operType', title: '操作类型', width: 160},
          // {dataIndex: 'oldValue', title: '旧值', width: 200, scopedSlots: {customRender: 'oldValue'}},
          // {dataIndex: 'newValue', title: '新值', scopedSlots: {customRender: 'newValue'}},
          {dataIndex: 'remark', title: '登录设备'},
          {
            dataIndex: 'final_time',
            title: '登录时间',
            scopedSlots: {customRender: 'time'},
            width: 200,
            align: 'center'
          },
          {dataIndex: '_ip', title: '登录IP', width: 200, align: 'center'},
        ],
        lists: [],
        loading: new LOADING(),
        pagination: {},
        tableHeight: 0
      }
    },
    methods: {
      get_list(page = 1, perpage = 20) {
        this.$http(TBaseAPI + '/log')
          ._get()
          ._param('logType', 133)
          ._param('page', page)
          ._param('perpage', perpage)
          ._loading(this.loading)
          ._sucLis(it => {
            this.lists = it.result.lists
            this.pagination = {
              current: it.result.page,
              pageSize: it.result.perpage,
              total: it.result.totalNum,
              showQuickJumper: true,
              showSizeChanger: true
            }
          })
          ._execute()
      },
      getTableHeight() {
        this.tableHeight = window.innerHeight - 290
      },
      handleTableChange(pagination, filters, sorter) {
        this.get_list(pagination.current, pagination.pageSize)
      },
      stime(second) {
        return stime(second)
      },
    },
    created() {
      window.addEventListener('resize', this.getTableHeight)
      this.getTableHeight()
      this.get_list()
    },
    destroyed() {
      window.removeEventListener('resize', this.getTableHeight)
    },
    components: {
      [Table.name]: Table
    }
  }
</script>

<style scoped>

</style>
