import { ref, computed, watch, onMounted, onUnmounted, nextTick, onActivated, onDeactivated } from 'vue'
import { useStore } from 'vuex'
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'

BScroll.use(Slide)

export default function useMinislider () {
  const sliderWrapperRef = ref(null)
  const slider = ref(null)

  const store = useStore()
  const fullScreen = computed(() => store.state.fullScreen)
  const playlist = computed(() => store.state.playlist)
  const currentIndex = computed(() => store.state.currentIndex)
  // const playing = computed(() => store.state.playing)

  const sliderShow = computed(() => {
    return !fullScreen.value && playlist.value.length > 0
  })

  onMounted(() => {
    let sliderVal
    watch(sliderShow, async (newSliderShow) => {
      if (newSliderShow) {
        await nextTick()
        // if (!sliderVal) {
        sliderVal = slider.value = new BScroll(sliderWrapperRef.value, {
          click: true,
          scrollX: true,
          scrollY: false,
          momentum: false, // 当使用 slide 时，这个值需要设置为 false，用来避免惯性动画带来的快速滚动时的闪烁的问题和快速滑动时一次滚动多页的问题。
          bounce: false, // bounce 值需要设置为 false，否则会在循环衔接的时候出现闪烁
          probeType: 2,
          slide: {
            autoplay: false,
            loop: true
          }
        })

        sliderVal.on('slideWillChange', (page) => {
          console.log(222, page.pageX)
          store.commit('setCurrentIndex', page.pageX)
          store.commit('setPlayingState', true)
        })
        // } else {
        //   sliderVal.refresh()
        // }
        sliderVal.goToPage(currentIndex.value, 0, 0)
      }
    })

    // 监听歌曲变化的时候
    watch(currentIndex, newVal => {
      if (sliderVal && sliderVal.value) {
        sliderVal.goToPage(newVal, 0, 0)
      }
    })
  })

  onUnmounted(() => {
    if (slider.value) {
      slider.value.destroy()
    }
  })

  onActivated(() => {
    // slider.value.enable()
    // slider.value.refresh()
  })

  onDeactivated(() => {
    // slider.value.disable()
  })

  return {
    sliderWrapperRef,
    slider
  }
}
