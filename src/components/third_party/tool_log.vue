<template>
  <div>
    <table2 ref="t2" :cus-columns="columns" :get_list="get_list">
    </table2>
  </div>

</template>

<script>
  import {TBaseAPI} from '../../config'
  import Table2 from '../cus_template/Table2'
  import _ from 'lodash'

  export default {
    data() {
      return {
        columns: [
          {dataIndex: 'id', title: 'ID', align: 'center', width: 100},
          {dataIndex: 'client', title: '客户端', width: 120},
          {dataIndex: 'logType', title: '日志类型', width: 150},
          {dataIndex: 'operId', title: '操作人Id', width: 100},
          {dataIndex: 'operNickName', title: '操作人昵称', width: 150},
          {dataIndex: 'operTable', title: '操作表名', width: 150},
          {dataIndex: 'operDataId', title: '被操作Id', width: 100},
          {dataIndex: 'operType', title: '操作类型', width: 160},
          {dataIndex: 'oldValue', title: '旧值', scopedSlots: {customRender: 'oldValue'}},
          {dataIndex: 'newValue', title: '新值', width: 200, scopedSlots: {customRender: 'newValue'}},
          {dataIndex: 'remark', title: '备注', width: 200},
          {
            dataIndex: 'final_time',
            title: '时间',
            scopedSlots: {customRender: 'time'},
            width: 200
          },
          {dataIndex: '_ip', title: 'IP', width: 150}
        ],
      }
    },
    methods: {
      get_list(page = 1) {
        this.$http(TBaseAPI + '/log')
          ._get()
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
      'table2': Table2
    }
  }
</script>

<style scoped>

</style>
