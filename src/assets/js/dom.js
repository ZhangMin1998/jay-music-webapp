export function addClass(el, className) {
  // if (!el.classList.contains(className)) {
  //   el.classList.add(className)
  // }
  if (hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}
export function hasClass (el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

export function removeClass(el, className) {
  el.classList.remove(className)
}
