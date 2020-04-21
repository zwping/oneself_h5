function realType(o) {
  /**
   * 获取对象真实数据类型
   */
  return Object.prototype.toString.apply(o)
}

export { realType }
