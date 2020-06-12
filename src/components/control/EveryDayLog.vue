<template>
    <div class="card shadow">
        <div style="height: 20px;padding: 10px 0 0 15px;">{{ title }}</div>
        <div class="ecahrts" ref="log_line"></div>
    </div>
</template>

<script>
import {TBaseAPI} from '../../config'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'

export default {
    data() {
        return {
            logTimer: '',
            logLine: undefined,
            title: '每日日志产生数量',
        }
    },
    methods: {
        initLogLine() {
            if (this.logLine === undefined) {
                this.logLine = echarts.init(this.$refs.log_line, 'light')
                this.logLine.setOption({
                    tooltip: {
                        formatter: function(params) {
                            return (
                                params.data[0] + '<br /> num:' + params.data[1]
                            )
                        },
                    },
                    grid: {
                        right: '5%',
                        bottom: '10%',
                    },
                    xAxis: {
                        type: 'category',
                    },
                    yAxis: {
                        type: 'value',
                    },
                    series: [
                        {
                            type: 'line',
                            smooth: true,
                            symbol: 'circle',
                        },
                    ],
                })
            }
        },
        get_log() {
            this.$http(TBaseAPI + '/log/every_day', 'get')
                ._sucLis(it => {
                    this.logLine.hideLoading()
                    this.title = '每日日志产生数量(' + it.result.total + ')'
                    let data = []
                    for (let d of it.result.data) {
                        data.push([d.day, d.num])
                    }
                    this.logLine.setOption({
                        dataset: {
                            source: data,
                        },
                    })
                })
                ._execute()
        },
    },
    mounted() {
        this.initLogLine()
        this.logLine.showLoading()
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
    background: #ffffff;
}

.card {
    width: 600px;
    height: 300px;
}

.ecahrts {
    position: relative;
    margin-top: -20px;
    width: 600px;
    height: 300px;
}
</style>
