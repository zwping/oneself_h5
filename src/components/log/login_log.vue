<template>
  <div>登录日志</div>
<!--  <a-table>-->
<!--    -->
<!--  </a-table>-->
</template>

<script>
  import {TBaseAPI} from "../../config"
  import {Table} from 'ant-design-vue'

  export default {
    name: "login_log",
    data() {
      return {}
    },
    methods: {
      get_list() {
        this.$http('/log')
          ._baseUrl(TBaseAPI)
          ._get()
          ._execute()
      }
    },
    components: {
      [Table.name]: Table
    },
    created() {
      this.get_list()
    }
  }
</script>

<style scoped>

</style>
