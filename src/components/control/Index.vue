<template>
  <div>
    控制台主页
    <div style="width: 600px;height: 380px;" id="g2_every_day_log"></div>
  </div>
</template>

<script>
  import {Line} from '@antv/g2plot'
  import {TBaseAPI} from '../../config'

  export default {
    name: 'Index',
    data() {
      return {
        log_data: [],
      }
    },
    beforeCreate() {
    },
    mounted() {
      this.$http(TBaseAPI + '/log/every_day', 'get')
        ._sucLis(it => {
          new Line('g2_every_day_log', {
            description: {visible: true, text: '每日日志产生数量(' + it.result.total + ')'},
            data: it.result.data,
            xField: 'day',
            yField: 'num',
            type: 'point',
          }).render()
        })
        ._execute()
    },
    components: {},
  }
</script>

<style scoped>

</style>
