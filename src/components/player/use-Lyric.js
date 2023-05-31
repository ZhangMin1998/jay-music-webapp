import { useStore } from "vuex"
import { getSongLyric } from "@/api/song"
import { computed, watch, ref } from "vue"
import Lyric from 'lyric-parser'

export default function useLyric () {
  const currentLyric = ref(null)
  const currentLineNum = ref(0) // 当前

  const lyricData = ref('')
  const store = useStore()
  const currentSong = computed(() => store.getters.currentSong)
  watch(currentSong, async newVal => {
    if (!newVal.id) return

    if (!newVal.lyric) {
      const result = await getSongLyric(newVal.id)
      lyricData.value = result.lrc.lyric

      store.commit('addSongLyric', {
        song: currentSong,
        lyric: lyricData
      })
    } else {
      // console.log(currentSong.value.lyric)
      lyricData.value = currentSong.value.lyric
    }
    // console.log(currentSong.value, lyricData)
    if (currentSong.value.lyric !== lyricData.value) { // 防止快速切换currentSong 歌词调用接口慢
      return
    }

    currentLyric.value = new Lyric(lyricData.value, handleLyric)
    // console.log('currentLyric.value', currentLyric.value)
  })

  const handleLyric = ({lineNum, txt }) => {
    currentLineNum.value = lineNum
  }

  return {
    currentLyric,
    currentLineNum
  }
}
