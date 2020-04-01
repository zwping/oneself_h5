<template>
  <div>
    <div>JD Cookie <a target="_blank"
                      href="https://quan.jd.com/user_quan.action?tab=&couponType=-1&sort=3&page=1">优惠卷页面</a>
      <div>
        <a-input
          style="width: 80%;float:left"
          v-model="cookie"
          placeholder="请前往jd获取网络请求的Cookie"
          allowClear
        />
        <a-button type="primary" :loading="editLoading.loading" class="box_1" @click="c1">修改</a-button>
        <a-button type="danger" :loading="testLoading.loading" class="box_1" @click="c2">测试</a-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {post, get, LOADING} from '../../libs/HTTP'
  import {setJdCookie, jdCookie, testJdCookie} from '../../config'
  import {Button, Input, message} from 'ant-design-vue'

  export default {
    name: "Config",
    data() {
      return {
        cookie: '',
        editLoading: new LOADING(),
        testLoading: new LOADING()
      }
    },
    components: {
      [Button.name]: Button,
      [Input.TextArea.name]: Input.TextArea,
      [Input.name]: Input
    },
    methods: {
      c1() {
        post(setJdCookie,
          suc => {
            message.success('修改成功')
          },
          this.editLoading,
          {'cookie': this.cookie}
        )
      },
      c2() {
        get(testJdCookie,
          suc => {
            message.success(suc.result)
          },
          this.testLoading)
      },
      jd_cookie_paste() {
      },
      onCopy() {
        console.log(111)
      },
      onError() {
        console.log(222)
      }
    },
    created() {
      post(jdCookie,
        suc => {
          this.$nextTick(function () {
            this.cookie = suc.result
          })
        })
    }
  }
</script>

<style scoped>
  .box_1 {
    float: left;
    margin-left: 10px;
  }
</style>
