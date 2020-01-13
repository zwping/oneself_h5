<template>
  <div>
    <div>hello
      <div class="">
        <lgbg v-if="token == null"></lgbg>
        <div v-else> 登录成功</div>
      </div>
    </div>
  </div>
</template>

<script>
  import loginBg from './LoginBg'
  import Cookies from 'js-cookie'

  export default {
    data() {
      return {
        token: Cookies.get('token')
      }
    },
    components: {
      'lgbg': loginBg
    },
    computed: {
      nullToken() {
        return Cookies.get('token')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .big_bg {
    position: relative;
    display: block;
    left: 300px;
    top: 0;
  }
</style>
