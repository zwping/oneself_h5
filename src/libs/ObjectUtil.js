import {isEmpty, isNotEmpty} from './Empty'
import get from 'lodash/get'

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

/**
 * $set方法变种，针对list深层次对象更改数据界面不重新渲染
 * @param vue vue
 * @param item 对象
 * @param diffKey 对比的key
 * @param dataKey vue顶层数据的key
 * @param childrenKey 子数据的key，非null则表明item可能在子数据中
 */
export function setRender(
    vue,
    item,
    {dataKey = 'data', diffKey = 'key', childrenKey = null} = {},
) {
    let data = get(vue, dataKey)
    if (isEmpty(data)) {
        throw 'dataKey错误, 未找到待更新的数据'
    }
    for (let i in data) {
        let d = get(data[i], diffKey)
        if (isNotEmpty(d) && d === get(item, diffKey)) {
            vue.$set(data, i, item)
            return
        }
        if (childrenKey != null) {
            let data1 = get(data[i], childrenKey)
            if (isNotEmpty(data1)) {
                __childSetRender(
                    vue,
                    data1,
                    item,
                    dataKey,
                    diffKey,
                    childrenKey,
                )
            }
        }
    }
}

/*** 子类set，针对修改数据界面不重新渲染 ***/
function __childSetRender(vue, data, item, dataKey, diffKey, childrenKey) {
    for (let i in data) {
        let d = get(data[i], diffKey)
        if (isNotEmpty(d) && d === get(data[i], diffKey)) {
            vue.$set(data, i, item)
            return
        }
        let data1 = get(data[i], childrenKey)
        if (isNotEmpty(data1)) {
            __childSetRender(vue, data1, item, dataKey, diffKey, childrenKey)
        }
    }
}
