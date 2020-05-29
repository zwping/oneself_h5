<template>
  <div class="root_ly">
    <div style="display: flex;display: -webkit-flex;">
      <a-input v-model="name" allowClear @keyup.enter.native="search" style="margin-right: 10px; width: 100px;"
               placeholder="姓名"/>
      <a-input v-model="idcard" allowClear @keyup.enter.native="search" style="margin-right: 10px; width: 180px;"
               placeholder="身份证号码"/>
      <a-select style="margin-right:10px; width: 120px" placeholder="是否完成"
                @keyup.enter.native="search" showSearch
                allowClear v-model="done">
        <a-select-option value="1">
          完成
        </a-select-option>
        <a-select-option value="0">
          未完成
        </a-select-option>
      </a-select>
      <a-select style="margin-right:10px; width: 120px" placeholder="批次号"
                @keyup.enter.native="search" showSearch
                v-model="batch_no" allowClear>
        <a-select-option v-for="d in nos_data" :key="d" :value="d">
          {{d}}
        </a-select-option>
      </a-select>
      <a-range-picker
        v-model="times" allowClear
        @keyup.enter.native="search" style="margin-right: 10px;width: 220px;">
      </a-range-picker>
      <a-button @click="reset" type="default" style="margin-right: 10px;">重置</a-button>
      <a-button @keyup.enter.native="search" type="primary" :loading="loading.state"
                @click="search" style="width: 80px;">搜索
      </a-button>
    </div>
  </div>
</template>

<script>
  import {AutoComplete, Button, DatePicker, Input, Select} from 'ant-design-vue'
  import {LOADING} from '../../libs/HTTP'
  import {isNotEmptyII} from '../../libs/Empty'
  import {realType} from '../../libs/ObjectUtil'

  export default {
    name: 'AutoKztScreen',
    props: {
      'search': {},
    },
    data() {
      return {
        loading: new LOADING(),
        nos_data: [],
        times: [],
        idcard: '',
        name: '',
        done: undefined,
        origin: '',
        batch_no: undefined,
        stime: '',
        etime: '',
      }
    },
    methods: {
      nos_filter(input, option) {
        return (
          option.componentOptions.children[0].text.toUpperCase().indexOf(input.toUpperCase()) >= 0
        )
      },
      reset() {
        this.times = []
        this.idcard = ''
        this.name = ''
        this.done = undefined
        this.origin = ''
        this.batch_no = undefined
        this.stime = ''
        this.etime = ''
      },
    },
    computed: {
      // is_screen() {
      //   return isNotEmptyII(this.s_id, this.s_nickname, this.s_stime, this.s_etime, this.s_ip)
      // }
      params() {
        return {
          'idcard': this.idcard,
          'name': this.name,
          'done': this.done,
          'origin': this.origin,
          'batch_no': this.batch_no,
          'stime': this.stime,
          'etime': this.etime,
        }
      }
    },
    watch: {
      times: function (v) {
        let d = isNotEmptyII(v) && realType(v[0]) === 'object'
        this.stime = d ? v[0].format('YYYY-MM-DD') : ''
        this.etime = d ? v[1].format('YYYY-MM-DD') : ''
      },
    },
    beforeCreate() {
      this.$http('/sh/kzt/nos')
        ._get()
        ._sucLis(it => {
          this.nos_data = it.result
        })
        ._execute()
    },
    components: {
      [Button.name]: Button,
      [AutoComplete.name]: AutoComplete,
      [DatePicker.RangePicker.name]: DatePicker.RangePicker,
      [Input.name]: Input,
      [Select.name]: Select,
      [Select.Option.name]: Select.Option,
    }
  }
</script>

<style scoped>
  .root_ly {
    display: flex;
    display: -webkit-flex;
    justify-content: flex-end;
    height: 52px;
    padding-top: 10px;
    padding-bottom: 10px;
  }
</style>
