import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import {
    Button,
    Icon,
    ConfigProvider,
    Tree,
    Input,
    InputNumber,
    message,
    Tooltip,
    Table,
    Avatar,
    Progress,
    AutoComplete,
    DatePicker,
    Select,
    Tabs,
    Layout,
    Menu,
    Breadcrumb,
    Row,
    Col,
    Upload,
    Badge,
    Dropdown,
    Popover,
    Alert,
    Divider,
    Modal,
} from 'ant-design-vue'

Vue.config.productionTip = false

Vue.use(Button)
Vue.use(Icon)
Vue.use(ConfigProvider)
Vue.use(Tree)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Tooltip)
Vue.use(Table)
Vue.use(Avatar)
Vue.use(Progress)
Vue.use(AutoComplete)
Vue.use(DatePicker)
Vue.use(Select)
Vue.use(Tabs)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Breadcrumb)
Vue.use(Row)
Vue.use(Col)
Vue.use(Upload)
Vue.use(Badge)
Vue.use(Dropdown)
Vue.use(Popover)
Vue.use(Alert)
Vue.use(Divider)
Vue.use(Modal)

Vue.prototype.$message = message
Vue.prototype.$echarts = echarts

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
