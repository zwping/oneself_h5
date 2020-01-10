<template>
  <div>
    <img alt="" src="../assets/bbg.jpg" width="100%" height="100%"/>
    <lgpop class="lgpop"></lgpop>
  </div>
</template>

<script>
  import LoginPop from './LoginPop'

  export default {
    name: 'LoginBg',
    components: {
      'lgpop': LoginPop
    }
  }
</script>

<style scoped>
  img {
    position: absolute;
    top: 0;
    left: 0;
    float: left;
  }

  .lgpop {
    position: absolute;
  }
</style>
