<template>
  <div class="radius_bg" :style="{ width:`${w}px`,height:`${h}px`,marginLeft:`-${w/2}px`,marginTop:`-${h/2}px` }">
    <h3>Sign in</h3>
    <a-input v-model="account" class="top1" placeholder="账号"
             @keyup.enter.native="login_key" allowClear/>
    <a-input-password v-model="pwd" class="top1" placeholder="密码"
                      @keyup.enter.native="login_key" allowClear/>
    <a-button @click="login" id="log_btn" class="top2" type="primary" block :loading="httpState.loading"
              :disabled="!dis">登录
    </a-button>
    <a-popover placement="bottom" trigger="click" style="float:right;margin-top: 10px">
      <template slot="content">
        <p>{{conn_txt}}</p>
      </template>
      <a-button type="link" style="padding: 0">联系管理员</a-button>
    </a-popover>
  </div>
</template>

<script>
  import Cookies from 'js-cookie'
  import {login} from '../../config'
  import {LOADING, post} from '../../libs/HTTP'
  import {mapState} from 'vuex'
  import {isEmpty} from '../../libs/Empty'
  import {Button, Input, Popover} from 'ant-design-vue'
  import {msg} from '../../libs/Antdv'

  export default {
    data() {
      return {
        type: 'password',
        w: 600,
        h: 400,
        account: 'zwp',
        pwd: '123',
        conn_txt: '1101558280@qq.com',
        httpState: new LOADING()
      }
    },
    components: {
      [Button.name]: Button,
      [Input.name]: Input,
      [Input.Password.name]: Input.Password,
      [Popover.name]: Popover
    },
    methods: {
      login() {
        post(login,
          r => {
            msg.success('欢迎回来 ' + r.result.nickname)
            Cookies.set('token', r.result.token)
            this.$store.state.tokenx.token = r.result.token
          },
          this.httpState,
          {'account': this.account, 'pwd': this.pwd},
          it => {
            msg.error(isEmpty(it.msg) ? 'Network Error' : it.msg)
          }, true)
      },
      login_key() {
        if (isEmpty(this.account)) {
          msg.warning('请输入账号')
        } else if (isEmpty(this.pwd)) {
          msg.warning("请输入密码")
        } else {
          this.login()
        }
      }
    },
    watch: {},
    computed: {
      dis() {
        return this.account !== '' && this.pwd !== ''
      },
      ...mapState({
        token: state => state.token.token
      })
    },
    created() {
      // console.log(Input.Password.name)
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
