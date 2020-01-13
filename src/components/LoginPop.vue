<template>
  <div class="radius_bg" :style="{ width:`${w}px`,height:`${h}px`,marginLeft:`-${w/2}px`,marginTop:`-${h/2}px` }">
    <h3>Sign in</h3>
    <a-input v-model="account" class="top1" placeholder="账号" allowClear/>
    <a-input-password v-model="pwd" class="top1" placeholder="密码" allowClear/>
    <a-button @click="login" id="log_btn" class="top2" type="primary" block :loading="httpState" :disabled="!dis">登录
    </a-button>
    <a-popconfirm placement="bottom" :title="conn_txt">
      <a-icon slot="icon" type="check-circle" style="color: green"/>
      <a class="conn_service" href="#">联系管理员</a>
    </a-popconfirm>
  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'Qs'
  import Cookies from 'js-cookie'

  export default {
    data() {
      return {
        w: 600,
        h: 400,
        account: 'zwp',
        pwd: '123',
        conn_txt: '1101558280@qq.com',
        httpState: false
      }
    },
    components: {},
    methods: {
      login() {
        this.httpState = true
        axios.post('http://localhost:5001/account/login', qs.stringify({'account': this.account, 'pwd': this.pwd}))
          .then(r => {
            this.httpState = false
            // this.account = r.data
            if (r.data.code === 200) {
              this.$message.success('欢迎回来 ' + r.data.result.nickname)
              Cookies.set('token', r.data.result.token)
              console.log(Cookies.get('token'))
            } else {
              this.$message.error(r.data.msg)
            }
          })
          .catch(r => {
            this.httpState = false
            this.$message.error('登录失败')
          })
      }
    },
    watch: {},
    computed: {
      dis() {
        return this.account !== '' && this.pwd !== ''
      }
    }
  }
</script>

<style scoped>

  .radius_bg {
    background-color: rgba(255, 255, 255, .8);
    border-radius: 5px;
    z-index: 99;
    left: 50%;
    top: 50%;
    padding: 50px;
  }

  h3 {
    font-size: 30px;
    text-align: center;
  }

  .top1 {
    margin-top: 20px;
  }

  .top2 {
    margin-top: 30px;
  }

  .conn_service {
    float: right;
    margin-top: 10px;
    font-size: 12px;
  }

</style>
