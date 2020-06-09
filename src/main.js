import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
    Button,
    Icon,
    ConfigProvider,
    Tree,
    Input,
    InputNumber,
    message,
    Tooltip,
} from 'ant-design-vue'

Vue.config.productionTip = false

Vue.use(Button)
Vue.use(Icon)
Vue.use(ConfigProvider)
Vue.use(Tree)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Tooltip)

Vue.prototype.$message = message

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
