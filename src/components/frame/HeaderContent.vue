<template>
  <div id="root">
    <span class="title">Oneself - 管理系统</span>
    <div class="portrait">
      <a-badge dot>
        <a-avatar shape="square" icon="user"/>
      </a-badge>
    </div>
  </div>
</template>

<script>
  import {Badge, Avatar} from 'ant-design-vue'

  export default {
    name: "TopContent",
    components: {
      [Badge.name]: Badge,
      [Avatar.name]: Avatar
    }
  }
</script>

<style scoped>
  #root {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
  }

  .title {
    color: white;
    font-size: 18px;
    font-weight: bold;
    font-family: "Arial Black";
  }

  .portrait {
    align-content: center;
  }

</style>
