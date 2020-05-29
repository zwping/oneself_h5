<template>
  <div>
    <all-log-filter ref="filter"/>
    <table2 ref="t2" :outside_fix_height="335" :cus-columns="columns" :get_list="get_list">
    </table2>
  </div>

</template>

<script type="text/jsx">
  import {TBaseAPI} from '../../config'
  import Table2 from '../cus_template/Table2.vue'
  import AllLogFilter from './AllLogFilter'
  import _ from 'lodash'

  export default {
    data() {
      return {
        columns: [
          {title: '序号', width: 80, align: 'center', customRender: (text, record, index) => `${index + 1}`},
          // {dataIndex: 'id', title: 'ID', align: 'center', width: 100},
          {dataIndex: 'client', title: '客户端', width: 120},
          {dataIndex: 'logType', title: '日志类型', width: 150},
          {dataIndex: 'operId', title: '操作人Id', width: 100},
          {dataIndex: 'operNickName', title: '操作人昵称', width: 150},
          {dataIndex: 'operTable', title: '操作表名', width: 150},
          {dataIndex: 'operDataId', title: '被操作Id', width: 100},
          {dataIndex: 'operType', title: '操作类型', width: 160},
          {dataIndex: 'oldValue', title: '旧值', scopedSlots: {customRender: 'oldValue'}},
          {dataIndex: 'newValue', title: '新值', width: 200, scopedSlots: {customRender: 'newValue'}},
          {dataIndex: 'remark', title: '备注', width: 200, scopedSlots: {customRender: 'remark'}},
          {
            dataIndex: 'final_time',
            title: '时间',
            scopedSlots: {customRender: 'time'},
            width: 200
          },
          {
            dataIndex: '_ip',
            title: 'IP',
            width: 150,
            customRender: (text, r, index) => {
              return <span title={r.ip_isp}>{r.ip_addr ? r.ip_addr : r._ip}</span>
            }
          },
        ],
      }
    },
    methods: {
      get_list(page = 1) {
        this.$http(TBaseAPI + '/log')
          ._get()
          ._param('client', 128)
          ._param('page', page)
          ._param('perpage', _.get(this.$refs.t2, 'pagination.pageSize', 20))
          ._params(_.get(this.$refs.s2, 'params'))
          ._loading(this.$refs.t2.loading, _.get(this.$refs.s2, 'loading'))
          ._sucLis(it => {
            this.$refs.t2.lists = it.result.lists
            this.$refs.t2.pagination = {
              current: it.result.page,
              pageSize: it.result.perpage,
              total: it.result.totalNum,
            }
          })
          ._execute()
      },
    },
    components: {
      'table2': Table2,
      'allLogFilter': AllLogFilter,
    }
  }
</script>

<style scoped>

</style>
