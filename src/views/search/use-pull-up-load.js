import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'
import ObserveDOM from '@better-scroll/observe-dom' // 监听DOM变化后自动刷新
import { ref, onMounted, onUnmounted } from 'vue'

BScroll.use(Pullup)
BScroll.use(ObserveDOM)

export default function upPullUpLoad (requestData) {
  const scroll = ref(null)
  const rootRef = ref(null)
  const isPullUpLoad = ref(false)

  onMounted(() => {
    const scrollVal = scroll.value = new BScroll(rootRef.value, {
      pullUpLoad: true,
      observeDOM: true,
      click: true
    })

    const pullingUpHandler = async () => {
      isPullUpLoad.value = true
      await requestData()
      scrollVal.finishPullUp() // pullingUp 事件的消费机会只有一次，因此你需要调用 finishPullUp() 来告诉 BetterScroll 来提供下一次 pullingUp 事件的消费机会
      scrollVal.refresh()
      isPullUpLoad.value = false
    }

    scrollVal.on('pullingUp', pullingUpHandler)
  })
  onUnmounted(() => {
    scroll.value.destroy()
  })

  return {
    scroll,
    rootRef,
    isPullUpLoad
  }
}
