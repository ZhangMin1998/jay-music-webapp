import { ref } from 'vue'

export default function useMiddleInteractive () {
  const currentShow = ref('cd') // 控制切换圆点
  const middleLStyle = ref(null)
  const middleRStyle = ref(null)

  const touch = {} // 保存初始值
  let currentView = 'cd'

  const onMiddleTouchStart = e => {
    // console.log(e.touches[0].pageX)
    touch.startX = e.touches[0].pageX // 初始位置
    touch.startY = e.touches[0].pageY
    touch.directionLocked = '' // 方向锁
  }

  const onMiddleTouchMove = e => {
    // console.log(e.touches[0].pageX)
    const deltaX = e.touches[0].pageX - touch.startX // 位移
    const deltaY = e.touches[0].pageY - touch.startY

    // 取绝对值
    const absDeltaX = Math.abs(deltaX)
    const absDeltaY = Math.abs(deltaY)

    if (!touch.directionLocked) {
      touch.directionLocked = absDeltaX >= absDeltaY ? 'h' : 'v'
    }
    if (touch.directionLocked === 'v') { // 如果是纵向 return
      return
    }

    const left = currentView === 'cd' ? 0 : -window.innerWidth // 初始位移
    // const offsetWidth = left + deltaX
    const offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + deltaX)) // 歌词视图的偏移量
    touch.percent = Math.abs(offsetWidth / window.innerWidth) // 偏移比例

    if (currentView === 'cd') {
      if (touch.percent > 0.2) {
        currentShow.value = 'lyric'
      } else {
        currentShow.value = 'cd'
      }
    } else {
      if (touch.percent < 0.8) {
        currentShow.value = 'cd'
      } else {
        currentShow.value = 'lyric'
      }
    }

    middleLStyle.value = {
      opacity: 1 - touch.percent
    }
    middleRStyle.value = {
      transform: `translate(${offsetWidth}px, 0)`
    }
  }

  const onMiddleTouchEnd = () => {
    let offsetWidth
    let opacity

    if (currentShow.value === 'cd') {
      currentView = 'cd'
      opacity = 1
      offsetWidth = 0
    } else {
      currentView = 'lyric'
      opacity = 0
      offsetWidth = -window.innerWidth
    }

    const duration = 300
    middleLStyle.value = {
      opacity,
      transitionDuration: `${duration}ms`
    }
    middleRStyle.value = {
      transform: `translate(${offsetWidth}px, 0)`,
      transitionDuration: `${duration}ms`
    }
  }

  return {
    currentShow,
    middleLStyle,
    middleRStyle,
    onMiddleTouchStart,
    onMiddleTouchMove,
    onMiddleTouchEnd
  }
}
