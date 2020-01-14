// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ant from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import store from './store'

Vue.use(ant)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {App},
  template: '<App/>'
})
