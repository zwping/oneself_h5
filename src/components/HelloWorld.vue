<template>
    <div>
        <div>
            <div class>
                <lgbg v-if="nullToken">登录窗口</lgbg>
                <frameLayout v-show="!tokenVerifyIng" v-if="tokenVerifySuc"
                    >登录成功</frameLayout
                >
                <loading v-if="tokenVerifyIng">校验token</loading>
                <!--        <rate-progress></rate-progress>-->
            </div>
        </div>
    </div>
</template>

<script>
import loginBg from './login/LoginBg'
import loading from './Loading'
import frameLayout from './frame/FrameLayout'
import rateProgress from './frame/RateProgress'
import Cookies from 'js-cookie'
import {mapGetters} from 'vuex'

export default {
    data() {
        return {}
    },
    components: {
        lgbg: loginBg,
        loading: loading,
        frameLayout: frameLayout,
        // rateProgress: rateProgress,
    },
    computed: {
        ...mapGetters('tokenx', {
            tokenVerifyIng: 'token_verify_ing',
            nullToken: 'null_token',
            tokenVerifySuc: 'token_verify_suc',
        }),
    },
    methods: {},
    watch: {
        nullToken(val) {
            this.$store.dispatch('tokenx/verifyToken')
        },
    },
    created() {
        this.$store.state.tokenx.token = Cookies.get('token')
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
