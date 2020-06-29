<template>
    <div class="root_ly">
        <every-day-log />
        <small-tool />
    </div>
</template>

<script>
import EveryDayLog from './EveryDayLog'
import SmallTool from './SmallTool'
import cryptoJs from 'crypto-js'

export default {
    name: 'Index',
    data() {
        return {}
    },
    beforeCreate() {},
    methods: {
        dec(data) {
            let u = cryptoJs.enc.Utf8.parse('jo8j9wGw%6HbxfFn'),
                d = cryptoJs.enc.Utf8.parse('0123456789ABCDEF')
            let e = cryptoJs.enc.Hex.parse(data)
            let n = cryptoJs.enc.Base64.stringify(e)
            return cryptoJs.AES.decrypt(n, u, {
                iv: d,
                mode: cryptoJs.mode.CBC,
                padding: cryptoJs.pad.Pkcs7,
            }).toString(cryptoJs.enc.Utf8)
        },
    },
    mounted() {
        this.$http(
            'http://jzsc.mohurd.gov.cn/api/webApi/asite/qualapt/apts2?apt_code=D',
            'get',
        )
            ._header(
                'accessToken',
                'jkFXxgu9TcpocIyCKmJ+tfpxe/45B9dbWMUXhdY7vLXy9OcVnSFaIo+hLZMegdyhhpUUKvcMtoMqfGfwdLCb8g==',
            )
            ._header(
                'Cookie',
                'Hm_lvt_b1b4b9ea61b6f1627192160766a9c55c=1592989639; Hm_lpvt_b1b4b9ea61b6f1627192160766a9c55c=1593316242',
            )
            ._sucLis(it => {
                console.log(this.dec(it))
            })
            ._execute()
    },
    beforeDestroy() {},
    components: {
        EveryDayLog,
        SmallTool,
    },
}
</script>

<style scoped>
.root_ly {
    display: flex;
    flex-direction: row;
    /*float: left;*/
}
</style>
