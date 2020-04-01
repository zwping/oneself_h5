<template>
  <div>
    <jdConfigureView v-if="jdConfigureView"/>
  </div>
</template>

<script>
  import jdConfigureView from '../configure/JDConfigure'

  export default {
    name: "FrameContent",
    data() {
      return {
        jdConfigureView: true
      }
    },
    components: {
      'jdConfigureView': jdConfigureView
    }
  }
</script>

<style scoped>

</style>
