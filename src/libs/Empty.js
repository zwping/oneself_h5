export function isEmpty(o) {
  if (o === null || o === '' || o === undefined) {
    return true
  }
  let type = Object.prototype.toString.call(o).slice(8, -1).toLowerCase()
  switch (type) {
    case 'undefined':
      return true
    case 'string':
      return String(o).trim() === '' || o === null
    case 'object':
      return Object.keys(o).length === 0
    case 'array':
      return o.length === 0
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
