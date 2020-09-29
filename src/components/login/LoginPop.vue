<template>
    <div
        class="radius_bg"
        :style="{
            width: `${w}px`,
            height: `${h}px`,
            marginLeft: `-${w / 2}px`,
            marginTop: `-${h / 2}px`,
        }"
    >
        <h3>Sign in</h3>
        <a-input
            v-model="account"
            class="top1"
            placeholder="账号"
            @keyup.enter.native="login_key"
            allowClear
        />
        <a-input-password
            v-model="pwd"
            class="top1"
            placeholder="密码"
            @keyup.enter.native="login_key"
            allowClear
        />
        <a-button
            @click="login"
            id="log_btn"
            class="top2"
            type="primary"
            block
            :loading="httpState.state"
            :disabled="!dis"
            >登录
        </a-button>
        <a-popover
            placement="bottom"
            trigger="click"
            style="float:right;margin-top: 10px"
        >
            <template slot="content">{{ conn_txt }}</template>
            <a-button type="link" style="padding: 0">联系管理员</a-button>
        </a-popover>
    </div>
</template>

<script>
import Cookies from 'js-cookie'
import {LOADING} from '../../libs/HTTP'
import {mapState} from 'vuex'
import {isEmpty} from '../../libs/Empty'
import md5 from 'js-md5'
import axios from 'axios'

export default {
    data() {
        return {
            type: 'password',
            w: 600,
            h: 400,
            account: '',
            pwd: '',
            conn_txt: '1101558280@qq.com',
            httpState: new LOADING(),
        }
    },
    components: {},
    methods: {
        login() {
            this.$http('/account/login')
                ._data('account', this.account)
                ._data('pwd', md5(this.pwd))
                ._loading(this.httpState)
                ._sucLis(r => {
                    this.$store.commit('tokenx/applyUserData', r.result)
                    this.$message.success('欢迎回来 ' + r.result.nickname)
                    Cookies.set('token', r.result.token)
                    this.$store.state.tokenx.token = r.result.token
                })
                ._execute()
        },
        login_key() {
            if (isEmpty(this.account)) {
                this.$message.warning('请输入账号')
            } else if (isEmpty(this.pwd)) {
                this.$message.warning('请输入密码')
            } else {
                this.login()
            }
        },
    },
    watch: {},
    computed: {
        dis() {
            return this.account !== '' && this.pwd !== ''
        },
        ...mapState({
            token: state => state.token.token,
        }),
    },
    created() {},
}
</script>

<style scoped>
.radius_bg {
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 5px;
    z-index: 99;
    left: 50%;
    top: 50%;
    padding: 50px;
}

h3 {
    font-size: 30px;
    text-align: center;
}

.top1 {
    margin-top: 20px;
}

.top2 {
    margin-top: 30px;
}

.conn_service {
    float: right;
    margin-top: 10px;
    font-size: 12px;
}
</style>
