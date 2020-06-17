<template>
    <div class="card shadow content">
        <div style="position: relative">
            <div class="ecahrts" ref="log_line"></div>
            <div class="title">
                {{ title }}
                <a-icon
                    @click="get_log(true)"
                    :spin="logLoading.state"
                    type="sync"
                />
            </div>
        </div>
    </div>
</template>

<script>
import {TBaseAPI} from '../../config'
import {LOADING} from '../../libs/HTTP'

export default {
    data() {
        return {
            logLoading: new LOADING(),
            logTimer: '',
            logLine: undefined,
            title: '日志数量走势图',
        }
    },
    methods: {
        initLogLine() {
            if (this.logLine === undefined) {
                this.logLine = this.$echarts.init(this.$refs.log_line)
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
                        bottom: '15%',
                        top: '20%',
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
                            lineStyle: {
                                color: '#1890ff',
                            },
                            itemStyle: {
                                color: '#1890ff',
                            },
                        },
                    ],
                })
            }
        },
        get_log(refresh = false) {
            if (refresh && this.logLoading.state) return
            this.$http(TBaseAPI + '/log/every_day', 'get')
                ._loading(this.logLoading)
                ._sucLis(it => {
                    this.logLine.hideLoading()
                    this.title = '日志数量走势图(' + it.result.total + ')'
                    let data = []
                    for (let d of it.result.data) {
                        data.push([d.day, d.num])
                    }
                    this.logLine.setOption({
                        dataset: {
                            source: data,
                        },
                    })
                    if (refresh) this.$message.success('刷新成功')
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

.content {
}

.title {
    height: 30px;
    padding: 10px 0 0 15px;
    z-index: 99;
    position: absolute;
    top: 0px;
}

.ecahrts {
    position: relative;
    width: 600px;
    height: 300px;
}
</style>
