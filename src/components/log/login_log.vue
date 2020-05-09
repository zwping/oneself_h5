<template>
  <div>
    <table2 ref="t2" :cus-columns="columns" :get_list="get_list">
    </table2>
  </div>

</template>

<script>
  import {TBaseAPI} from '../../config'
  import Table2 from '../cus_template/Table2.vue'

  export default {
    name: "login_log",
    data() {
      return {
        columns: [
          {dataIndex: 'id', title: '日志ID', align: 'center', width: 100},
          {dataIndex: 'client', title: '客户端', width: 120},
          {dataIndex: 'operId', title: '登录人Id', width: 100, align: 'center'},
          {dataIndex: 'operNickName', title: '登录人昵称', width: 150, align: 'center'},
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
      }
    },
    methods: {
      get_list(page = 1, perpage = 20) {
        this.$http(TBaseAPI + '/log')
          ._get()
          ._param('logType', 133)
          ._param('page', page)
          ._param('perpage', perpage)
          ._loading(this.$refs.t2.loading)
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
