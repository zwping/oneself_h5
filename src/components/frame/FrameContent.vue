<template>
  <div>
    <vconfig v-if="vconfig"/>
  </div>
</template>

<script>
  import vconfig from '../config/VConfig'

  export default {
    name: "FrameContent",
    data() {
      return {
        vconfig: true
      }
    },
    components: {
      'vconfig': vconfig
    }
  }
</script>

<style scoped>

</style>
