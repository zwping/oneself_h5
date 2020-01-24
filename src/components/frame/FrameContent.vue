<template>
  <div>
    <vconfig v-if="vconfig"></vconfig>
  </div>
</template>

<script>
  import vconfig from '../config/VConfig'
  import subscribe from '../../libs/Bus'

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
