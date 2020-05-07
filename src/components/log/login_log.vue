<template>
  <div>登录日志</div>
</template>

<script>
  export default {
    name: "login_log",
    data() {
      return {}
    },
    methods: {
      get_list() {
        this.$http('/log')
          ._get()
      }
    },
    created() {

    }
  }
</script>

<style scoped>

</style>
