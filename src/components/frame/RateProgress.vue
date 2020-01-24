<template>
  <div>
    <a-progress :percent="progress" strokeWidth="3" status="active" :showInfo="false"/>
  </div>
</template>

<script>
  export default {
    name: "RateProgress",
    data() {
      return {
        progress: 99
      }
    }
  }
</script>

<style scoped>
  div {
    height: 3px;
  }
</style>
