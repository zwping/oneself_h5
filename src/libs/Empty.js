function isEmpty(o) {
  if (o === null || o === 'undefined') {
    return true
  }
  let type = typeof o
  if (type === 'string') {
    return o === true || o === '' || o === null
  } else return false
}

function isNotEmpty(o) {
  return !isEmpty(o)
}

export { isEmpty, isNotEmpty }
