<template>
  <div>
    <div>JD Cookie <a target="_blank"
                      href="https://quan.jd.com/user_quan.action?tab=&couponType=-1&sort=3&page=1">优惠卷页面</a>
<!--      <a @click="chrome">直接获取cookie</a>-->
      <div>
        <a-input
          style="width: 80%;float:left"
          v-model="cookie"
          placeholder="请前往jd获取网络请求的Cookie"
          allowClear
        />
        <a-button type="primary" :loading="editLoading.state" class="box_1" @click="c1">修改</a-button>
        <a-button type="danger" :loading="testLoading.state" class="box_1" @click="c2">测试</a-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {LOADING} from '../../libs/HTTP'
  import {setJdCookie, jdCookie, testJdCookie} from '../../config'
  import {Button, Input, message} from 'ant-design-vue'
  import Cookies from 'js-cookie'
  import {webdriver} from '../../libs/selenium'

  export default {
    name: 'Config',
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
        this.$http('/set_jd_cookie')
          ._data('cookie', this.cookie)
          ._sucLis(r => {
            message.success('修改成功')
          })
          ._loading(this.editLoading)
          ._execute()
      },
      c2() {
        this.$http('/test_jd_youhuijuan')
          ._loading(this.testLoading)
          ._sucLis(r => {
            message.success(r.result)
          })
          ._execute()
      },
      chrome() {
        // axios.get('jd_cookie/')
        //   .then(r => {
        //     console.log(r.headers)
        //   })
        //   .catch(r => {
        //     console.log(r)
        //   })
      }
    },
    created() {
      this.$http('/jd_cookie')
        ._sucLis(r => {
          this.$nextTick(function () {
            this.cookie = r.result
          })
        })
        ._execute()
    }
  }
</script>

<style scoped>
  .box_1 {
    float: left;
    margin-left: 10px;
  }
</style>
