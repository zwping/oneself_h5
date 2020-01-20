<template>
  <div>
    <div>hello
      <div class="">
        <lgbg v-if="nullToken">登录窗口</lgbg>
        <loading v-if="token_v_ing">校验token</loading>
        <div v-if="token_v_suc"> 登录成功</div>
      </div>
      {{nullToken}}
      {{token_v_ing}}
      {{token_v_suc}}
    </div>
  </div>
</template>

<script>
  import loginBg from './LoginBg'
  import loading from './Loading'
  import Cookies from 'js-cookie'
  import {isEmpty} from '../libs/Empty'
  import {subscribe} from '../libs/Bus'

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
        console.log(this.$store.state.token.token)
        console.log(typeof this.$store.state.token.token)
        console.log(isEmpty(this.$store.state.token.token))
        return isEmpty(this.$store.state.token.token)
      },
      token_v_ing() {
        const ing = this.$store.state.token.token_verify_ing
        if (!ing) {
          this.$store.dispatch('token/verify_token')
        }
        return ing
      },
      token_v_suc() {
        return this.$store.state.token.token_verify_suc
      }
    },
    methods: {},
    watch: {},
    created() {
      this.$store.state.token.token = Cookies.get('token')
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
