<template>
  <div style="display: flex; justify-content: flex-end; align-items: center">
    <div>
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

</style>
