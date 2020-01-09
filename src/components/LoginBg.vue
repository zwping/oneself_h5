<template>
  <div>
    <img alt="" src="../assets/bbg.jpg" width="100%" height="100%"/>
    <lgpop></lgpop>
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
    left: 0;
    top: 0;
  }
</style>
