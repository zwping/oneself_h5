function isEmpty(o) {
  let type = typeof o
  if (type === 'undefined') {
    return true
  } else if (type === 'string') {
    return o === true || o === '' || o === null
  } else return false
}

export {isEmpty}
