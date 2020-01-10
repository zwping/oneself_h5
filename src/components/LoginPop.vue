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

  export default {
    data() {
      return {
        w: 600,
        h: 400,
        account: 'zwping',
        pwd: '123',
        conn_txt: '1101558280@qq.com',
        httpState: false
      }
    },
    components: {},
    methods: {
      login() {
        this.httpState = true
        axios.get('http://zwping.win:5001/hello')
          .then(r => {
            this.httpState = false
            this.account = r.data
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
