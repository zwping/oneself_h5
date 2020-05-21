<template>
  <div>
    控制台主页
    <div class="card shadow" id="g2_log_container"></div>
  </div>
</template>

<script>
  import {Line} from '@antv/g2plot'
  import {TBaseAPI} from '../../config'

  export default {
    name: 'Index',
    data() {
      return {
        logTimer: '',
        logLine: undefined,
      }
    },
    beforeCreate() {
    },
    methods: {
      initLogLine() {
        if (this.logLine === undefined) {
          this.logLine = new Line(document.getElementById('g2_log_container'), {
            description: {visible: true, text: '每日日志产生数量'},
            data: [],
            width: 600,
            height: 300,
            xField: 'day',
            yField: 'num',
          })
          this.logLine.render()
        }
      },
      get_log() {
        this.$http(TBaseAPI + '/log/every_day', 'get')
          ._sucLis(it => {
            this.logLine.updateConfig({
              description: {visible: true, text: '每日日志产生数量(' + it.result.total + ')'},
              data: it.result.data
            })
            this.logLine.render()
          })
          ._execute()
      },
    },
    mounted() {
      this.initLogLine()
      this.get_log()
      this.logTimer = setInterval(this.get_log, 30 * 1000)
    },
    beforeDestroy() {
      clearInterval(this.logTimer)
    },
    components: {},
  }
</script>

<style scoped>
  .shadow {
    -webkit-box-shadow: #666 0px 0px 10px;
    -moz-box-shadow: #666 0px 0px 10px;
    box-shadow: #666 0px 0px 10px;
    margin: 10px auto;
    background: #FFFFFF;
  }

  .card {
    width: 600px;
    height: 300px;
  }
</style>
