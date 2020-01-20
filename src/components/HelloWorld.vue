<template>
  <div>
    <div>hello
      <div class="">
        <lgbg v-if="nullToken">登录窗口</lgbg>
        <loading v-if="`${nullToken && !tokenAble}` ">校验token</loading>
        <div v-if="`${!nullToken && tokenAble}`"> 登录成功</div>
      </div>
    </div>
  </div>
</template>

<script>
  import loginBg from './LoginBg'
  import loading from './Loading'
  import Cookies from 'js-cookie'
  import {mapState, mapActions} from 'vuex'
  import {isEmpty} from '../libs/Empty'

  export default {
    data() {
      return {}
    },
    components: {
      'lgbg': loginBg,
      'loading': loading
    },
    computed: {
      nullToken() {
        return isEmpty(this.$store.state.token.token)
      },
      tokenAble() {
        const able = this.$store.state.token.token_able
        console.log(able)
        if (!able) {
          this.$store.dispatch('token/verify_token')
        }
        return able
      }
    },
    created() {
      this.$store.state.token.token = Cookies.get('token')
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
