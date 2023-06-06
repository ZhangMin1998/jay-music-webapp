import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'

export default function useMiniSlider () {
  const sliderRef = ref(null)
  const slider = ref(null)

  const store = useStore()
  const fullScreen = computed(() => store.state.fullScreen) // 是否全屏
  const currentIndex = computed(() => store.state.currentIndex) // 当前歌曲索引
  const playlist = computed(() => store.state.playlist) // 当前播放列表

  const sliderShow = computed(() => {
    return !fullScreen.value && !!playlist.value
  })

  onMounted(() => {

  })
  onUnmounted(() => {

  })

  return {
    slider,
    sliderRef
  }
}
