import { ref } from 'vue'
import animations from 'create-keyframe-animation'

export default function useAnimation () {
  const cdWrapperRef = ref(null)
  let entering = false
  let leaving = false

  const enter = (el, done) => {
    if (leaving) {
      afterLeave()
    }
    entering = true

    const { x, y, scale } = getPosAndScale()
    const animation = {
      '0%': {
        transform: `translate(${x}px, ${y}px) scale(${scale})`
      },
      '100%': {
        transform: 'translate(0, 0, 0) scale(1)'
      }
    }
    animations.registerAnimation({
      name: 'move',
      animation,
      presets: {
        duration: 600,
        easing: 'cubic-bezier(0.45, 0, 0.55, 1)'
      }
    })
    animations.runAnimation(cdWrapperRef.value, 'move', done) // player内部的一个动画 所以不用el
  }

  const afterEnter = () => {
    entering = false

    animations.unregisterAnimation('move')
    cdWrapperRef.value.style.animation = ''
  }

  const leave = (el, done) => { // 用transition实现
    if (entering) {
      afterEnter()
    }
    leaving = true

    const { x, y, scale } = getPosAndScale()
    const cdWrapperEl = cdWrapperRef.value

    cdWrapperEl.style.transition = 'all 0.6s cubic-bezier(0.45, 0, 0.55, 1)'
    cdWrapperEl.style.transform = `translate(${x}px, ${y}px) scale(${scale})`

    const next = () => {
      cdWrapperEl.removeEventListener('transitionend', next) // 解绑
      done()
    }
    cdWrapperEl.addEventListener('transitionend', next)
  }

  const afterLeave = () => {
    leaving = false

    const cdWrapperEl = cdWrapperRef.value

    cdWrapperEl.style.transition = ''
    cdWrapperEl.style.transform = ''
  }

  // 计算偏移量和缩放比例
  const getPosAndScale = () => {
    const targetWidth = 40 // 小cd宽度/直径 40
    const paddingLeft = 40 // 小cd圆心距离左边的距离  半径20 + paddingleft 20
    const paddingBottom = 30 // 小cd圆心距离底部的距离  半径20 + 10
    const paddingTop = 80 // 大cd距离顶部的距离
    const width = window.innerWidth * 0.8 // 大cd 宽度/直接 屏幕宽度的80%
    const x = -(window.innerWidth / 2 - paddingLeft)
    const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
    const scale = targetWidth / width

    return {
      x,
      y,
      scale
    }
  }

  return {
    cdWrapperRef,
    enter,
    afterEnter,
    leave,
    afterLeave
  }
}
