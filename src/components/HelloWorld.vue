<template>
  <div>
    <div>hello
      <div class="">
        <lgbg v-if="nullToken">登录窗口</lgbg>
        <loading v-if="tokenVerifyIng">校验token</loading>
        <frameLayout v-if="tokenVerifySuc">登录成功</frameLayout>
      </div>
    </div>
  </div>
</template>

<script>
  import loginBg from './login/LoginBg'
  import loading from './Loading'
  import frameLayout from './frame/FrameLayout'
  import Cookies from 'js-cookie'
  import {isEmpty} from '../libs/Empty'
  import {subscribe} from '../libs/Bus'
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {}
    },
    components: {
      'lgbg': loginBg,
      'loading': loading,
      'frameLayout': frameLayout
    },
    computed: {
      ...mapGetters('tokenx', {
        tokenVerifyIng: 'token_verify_ing',
        nullToken: 'null_token',
        tokenVerifySuc: 'token_verify_suc'
      })
    },
    methods: {},
    watch: {
      nullToken(val) {
        this.$store.dispatch('tokenx/verifyToken')
      }
    },
    created() {
      this.$store.state.tokenx.token = Cookies.get('token')
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
