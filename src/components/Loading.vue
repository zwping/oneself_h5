<template>
  <div>
    <span>校验Token中</span>
    <a-spin></a-spin>
  </div>
</template>

<script>
import { Spin } from 'ant-design-vue'

export default {
  components: {
    [Spin.name]: Spin
  },
  created() {}
}
</script>

<style scoped>
div {
  width: 100%;
  height: 100%;
  background-color: white;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  float: left;
  display: flex;
  align-items: center; /*定义body的元素垂直居中*/
  justify-content: center; /*定义body的里的元素水平居中*/
}

</style>
