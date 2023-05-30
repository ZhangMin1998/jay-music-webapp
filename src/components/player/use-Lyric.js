import { useStore } from "vuex"
import { getSongLyric } from "@/api/song"
import { computed, watch, ref } from "vue"
import Lyric from 'lyric-parser'

export default function useLyric () {
  const currentLyric = ref(null)
  const currentLineNum = ref(0) // 当前

  const lyricData = ref('')
  const aaa = 1
  const store = useStore()
  const currentSong = computed(() => store.getters.currentSong)
  watch(currentSong, async newVal => {
    if (!newVal.id) return

    if (!newVal.lyric) {
      const lyric = await getSongLyric(newVal.id)
      lyricData.value = lyric.lrc.lyric
      // console.log('lyric', lyric.lrc.lyric)
      store.commit('addSongLyric', {
        song: currentSong,
        lyric: lyricData
      })
      console.log(currentSong.value.lyric)
    } else {
      // console.log(currentSong.value.lyric)
      lyricData.value = currentSong.value.lyric
    }
    console.log(currentSong.value, lyricData)
    // if (currentSong.value.lyric !== lyricData) { // 防止快速切换currentSong 歌词调用接口慢
    //   return
    // }

    // currentLyric.value = new Lyric(lyricData, handleLyric)
    // console.log(currentLyric.value)
    console.log(currentSong.value.lyric)
  })

  const handleLyric = ({lineNum, txt }) => {
    currentLineNum.value = lineNum
  }

  return {
    currentLyric,
    currentLineNum
  }
}
