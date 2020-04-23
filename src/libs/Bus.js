import Vue from 'vue'

const bus = new Vue()

/**
 * 发送事件
 * @param tag
 * @param data
 */
export function emit(tag, data) {
  bus.$emit(tag, data)
}

/**
 * 接收事件
 * @param tag
 * @param callBack
 */
export function subscribe(tag, callBack) {
  bus.$on(tag, callBack)
}
