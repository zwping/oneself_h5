<template>
  <div>
    <a-progress :percent="progress" status="active" :showInfo="false"/>
  </div>
</template>

<script>
  import {Progress} from 'ant-design-vue'

  export default {
    name: "RateProgress",
    data() {
      return {
        progress: 99
      }
    },
    components: {
      [Progress.name]: Progress
    }
  }
</script>

<style scoped>
  div {
    height: 3px;
  }
</style>
