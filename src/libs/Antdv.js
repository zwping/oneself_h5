import Vue from 'vue'
import {message} from 'ant-design-vue'

let vue = new Vue()

/**
 * 按需加载 message
 * @returns {Message}
 * @constructor
 */
let InitMessage = () => {
  Vue.prototype.$message = message
  return vue.$message
}

let msg = new InitMessage()

export {msg}
