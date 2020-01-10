<template>
  <div>
    <div>hello
      <div class="">
        <lgbg></lgbg>
      </div>
    </div>
  </div>
</template>

<script>
  import loginBg from './LoginBg'

  export default {
    components: {
      'lgbg': loginBg
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
