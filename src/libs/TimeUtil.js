export function stime(second) {
  if (second.toString().length === 10) {
    second = second * 1000
  }
  let d = new Date(second)
  let h = d.getHours().toString()
  let m = d.getMinutes().toString()
  let s = d.getSeconds().toString()
  return d.getFullYear() + '-' + d.getMonth() + '-' + d.getDay() + ' ' +
    (h.length === 1 ? '0' + h : h) + ':' + (m.length === 1 ? '0' + m : m) + ':' + (s.length === 1 ? '0' + s : s)
}
