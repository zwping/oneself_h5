function isEmpty(o) {
  if (o === undefined) {
    return true
  } else if (o instanceof String) {
    return o === true || o === '' || o === null
  } else return false
}

export {isEmpty}
