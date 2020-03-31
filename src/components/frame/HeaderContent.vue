<template>
  <div id="root">
    <div>
      <span>Oneself - 管理系统</span>
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
    justify-content: flex-end;
    align-items: center
  }

  span {
  }
</style>
