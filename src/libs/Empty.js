export function isEmpty(o) {
  if (o === null || o === 'undefined') {
    return true
  }
  let type = typeof o
  if (type === 'undefined') {
    return true
  } else if (type === 'string') {
    return o === true || o === '' || o === null
  } else return false
}

export function isNotEmpty(o) {
  return !isEmpty(o)
}
