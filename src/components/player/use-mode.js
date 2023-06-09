import { computed } from 'vue'
import { useStore } from 'vuex'
import { PLAY_MODE } from '@/assets/js/constant'

export default function useMode () {
  const store = useStore()
  const playMode = computed(() => store.state.playMode)

  const modeIcon = computed(() => {
    const playModeVal = playMode.value
    return playModeVal === PLAY_MODE.sequence ? 'icon-next' : (playModeVal === PLAY_MODE.random ? 'icon-random' : 'icon-loop')
  })

  const changeMode = () => {
    const mode = (playMode.value + 1) % 3
    store.dispatch('changeMode', mode)
  }

  const modeText = computed(() => {
    const playModeVal = playMode.value
    return playModeVal === PLAY_MODE.sequence ? '顺序播放' : (playModeVal === PLAY_MODE.random ? '随机播放' : '单曲循环')
  })

  return {
    modeIcon,
    modeText,
    changeMode
  }
}
