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
