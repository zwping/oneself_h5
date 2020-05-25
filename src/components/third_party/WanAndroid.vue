<template>
  <div>
    <table2 ref="t2" :cusColumns="columns" :get_list="get_list">

    </table2>
  </div>
</template>

<script>
  import Table2 from '../cus_template/Table2'

  export default {
    name: 'WanAndroid',
    data() {
      return {
        columns: [],
      }
    },
    methods: {
      get_list(page = 1) {
        this.$http('/wanandroid/blog', 'get')
          ._sucLis(it => {

          })
          ._execute()
      }
    },
    components: {
      Table2
    }
  }
</script>

<style scoped>

</style>
