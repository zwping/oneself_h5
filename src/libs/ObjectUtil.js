import { isNotEmpty } from './Empty'
/**
 * 获取对象真实数据类型
 */
export function realType(ob) {
  return Object.prototype.toString
    .apply(ob)
    .slice(8, -1)
    .toLowerCase()
}

export function hasOwnProperty(ob, key) {
  return Object.prototype.hasOwnProperty.call(ob, key)
}

/**
 * 临时修改对象，自带回滚机制
 * @param ob 待修改对象
 * @param editState 修改状态 true->存对象 false->释放对象(如果old*的值为空即表明修改成功{@link tempEditObOfSuc})
 * @param arguments 对象内待修改的key
 */
export function tempEditOb(ob, editState) {
  let args = [...arguments]
  args.shift()
  args.shift()
  for (let d of args) {
    let old = 'old' + d
    if (editState) {
      ob[old] = ob[d]
    } else {
      if (isNotEmpty(ob[old])) {
        ob[d] = ob[old]
      }
    }
  }
}

/**
 * 临时修改对象，确认内容是否有过修改
 * @param ob 待修改对象
 * @param arguments 对象内待修改的key
 * @return boolean true->需要api存储
 */
export function tempEditObOfConfirm(ob) {
  let args = [...arguments]
  args.shift()
  for (let d of args) {
    let old = 'old' + d
    if (ob[old] !== ob[d]) {
      return true
    }
  }
  return false
}

/**
 * 临时修改对象并修改成功，优先删掉old*值
 * @param ob 已成功修改的对象
 * @param arguments 对象内待修改的key
 */
export function tempEditObOfSuc(ob) {
  let args = [...arguments]
  args.shift()
  for (let d of args) {
    let old = 'old' + d
    ob[old] = ''
  }
}
