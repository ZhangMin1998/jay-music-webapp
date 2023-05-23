import { createApp } from 'vue'
import { addClass, removeClass } from '@/assets/js/dom'

const relativeCls = 'g-relative'

export default function createLoadingLikeDirective (Comp) { // 传入一个组件
  return {
    mounted (el, binding) {
      // 新建vue实例
      const app = createApp(Comp) // app对象根组件就是Comp
      const instance = app.mount(document.createElement('div')) // app对象根组件就是Comp
      const name = Comp.name

      // 解决当多个指令作用在同一个dom上的数据覆盖的bug
      if (!el[name]) {
        el[name] = {}
      }
      el[name].instance = instance // 先保存  el.instance => Comp组件实例   updated中拿不到instance

      // 设置动态title
      const title = binding.arg
      if (typeof title !== 'undefined') {
        instance.setTitle(title)
      }

      if (binding.value) {
        append(el)
      }
    },
    updated (el, binding) {
      // 设置动态title
      const title = binding.arg
      const name = Comp.name
      if (typeof title !== 'undefined') {
        el[name].instance.setTitle(title)
      }

      // 因为Comp值会改变，所以会更新 就会触发updated
      if (binding.value !== binding.oldValue) {
        binding.value ? append(el) : remove(el)
      }
    }
  }

  // 挂载
  function append (el) {
    const name = Comp.name
    const style = getComputedStyle(el)
    if (['absolute', 'fixed', 'relative'].indexOf(style.position) === -1) {
      addClass(el, relativeCls)
    }
    el.appendChild(el[name].instance.$el) // el.instance.$el => Comp组件组件对应的dom对象  => 挂载到el(Comp组件作用的对应dom上)
  }

  // 挂载
  function remove (el) {
    const name = Comp.name
    removeClass(el, relativeCls)
    el.removeChild(el[name].instance.$el)
  }
}
