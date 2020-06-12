export function isEmpty(ob) {
    if (ob === null || ob === '' || ob === undefined) {
        return true
    }
    let type = Object.prototype.toString
        .call(ob)
        .slice(8, -1)
        .toLowerCase()
    switch (type) {
        case 'undefined':
            return true
        case 'string':
            return String(ob).trim() === '' || ob === null
        case 'object':
            return Object.keys(ob).length === 0
        case 'array':
            return ob.length === 0
        default:
            return false
    }
}

export function isNotEmpty(o) {
    return !isEmpty(o)
}

/**
 * 对象集中是否都为空
 * @param arguments 可变对象
 * @returns {boolean}
 */
export function isEmptys() {
    for (let d of arguments) {
        if (isNotEmpty(d)) return false
    }
    return true
}

/**
 * 对象集中是否都不为空
 * @param arguments 可变对象
 * @returns {boolean}
 */
export function isNotEmptys() {
    for (let d of arguments) {
        if (isEmpty(d)) return false
    }
    return true
}

/**
 * 对象集中是否有一个对象为空
 * @param arguments 可变对象
 * @returns {boolean}
 */
export function isEmptyII() {
    for (let d of arguments) {
        if (isEmpty(d)) return true
    }
    return false
}

/**
 * 对象集中是否有一个对象不为空
 * @param arguments 可变对象
 * @returns {boolean}
 */
export function isNotEmptyII() {
    for (let d of arguments) {
        if (isNotEmpty(d)) return true
    }
    return false
}
