<template>
  <div>
    <div>
      <a-button type="primary" @click="modalVis=true">添加学员</a-button>
    </div>
    <table2 ref="t2" :outside_fix_height="340" :cus-columns="columns" :get_list="get_list">
    </table2>
    <a-modal
      title="添加学员"
      :visible="modalVis"
      :closable="false"
      :confirm-loading="addLoading.state"
      :maskClosable="!addLoading.state"
      @cancel="modalVis=false"
      @ok="ok"
    >
      <a-textarea :v-model="data" placeholder="身份证号:密码
身份证号2:密码" :rows="5"></a-textarea>
      <a-divider/>
      <a-button @click="fileUpload" :loading="addFileLoading.state">文件上传</a-button>
    </a-modal>
  </div>
</template>

<script>
  import Table2 from '../cus_template/Table2'
  import {Avatar, Button, Modal, Input, Divider} from 'ant-design-vue'
  import {LOADING} from '../../libs/HTTP'

  export default {
    name: 'auto_kaozhengtong',
    data() {
      return {
        columns: [
          {title: '序号', width: 80, align: 'center', customRender: (text, record, index) => `${index + 1}`},
          {dataIndex: 'portrait', title: '头像', width: 60, align: 'center', scopedSlots: {customRender: 'portrait'}},
          {dataIndex: 'idcard', title: '身份证号', align: 'center', width: 200},
          {dataIndex: 'pwd', title: '密码', align: 'center', width: 100},
          {dataIndex: 'name', title: '姓名', align: 'left', width: 80},
          {dataIndex: 'phone', title: '手机号', align: 'center', width: 180},
          {dataIndex: 'company', title: '公司名'},
          {dataIndex: 'major', title: '专业', align: 'left', width: 150},
          // {dataIndex: 'uid', title: 'uid', width: 100},
          {dataIndex: 'progress', title: '进度', width: 100, align: 'center', scopedSlots: {customRender: 'progress'}},
          {dataIndex: 'last_step', title: '正在学习课程', align: 'center', width: 100},
          {dataIndex: 'video_size', title: '总课程', align: 'center', width: 100},
          {dataIndex: 'next_play_time', title: '下次学习时间', align: 'center', width: 160},
          {
            dataIndex: 'final_time',
            title: '创建时间',
            align: 'center',
            scopedSlots: {customRender: 'time'},
            width: 160
          },
        ],
        modalVis: false,
        addLoading: new LOADING(),
        addFileLoading: new LOADING(),
        data: '',
      }
    },
    methods: {
      get_list(page = 1, perpage = 20) {
        this.$http('/sh/kzt')
          ._get()
          ._param('page', page)
          ._param('perpage', perpage)
          ._loading(this.$refs.t2.loading)
          ._sucLis(it => {
            for (let d of it.result.lists) {
              let size = d.video_size
              d.progress = d.done === 1 ? [size, size] : [d.last_step - 1, size]
            }
            this.$refs.t2.lists = it.result.lists
            this.$refs.t2.pagination = {
              current: it.result.page,
              pageSize: it.result.perpage,
              total: it.result.totalNum,
            }
          })
          ._execute()
      },
      ok() {
        console.log(this.data)
      },
      fileUpload() {
      },
    },
    components: {
      'table2': Table2,
      [Avatar.name]: Avatar,
      [Button.name]: Button,
      [Modal.name]: Modal,
      [Divider.name]: Divider,
      [Input.TextArea.name]: Input.TextArea,
    }
  }
</script>

<style scoped>

</style>
