export function addClass (el, className) {
  if (!el.classList.contains(className)) { // 防止重复添加
    el.classList.add(className)
  }
  // if (hasClass(el, className)) {
  //   return
  // }
  // let newClass = el.className.split(' ')
  // newClass.push(className)
  // el.className = newClass.join(' ')
}

export function removeClass (el, className) {
  el.classList.remove(className)
}

export function hasClass (el, className) {
  const reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}
