<template>
  <div id="bg">
<!--    <img alt="" src="../../assets/bbg.jpg" width="100%" height="100%"/>-->
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
  #bg{
    position: absolute;
    background: url("../../assets/bbg.jpg") no-repeat center center;
    min-height: 100vh;
    width:100%;
    background-size:cover;
  }

  .lgpop {
    position: absolute;
  }
</style>
