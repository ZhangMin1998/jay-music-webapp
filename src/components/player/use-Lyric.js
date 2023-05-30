import { useStore } from "vuex"
import { getSongLyric } from "@/api/song"
import { computed, watch, ref } from "vue"
import Lyric from 'lyric-parser'

export default function useLyric () {
  const currentLyric = ref(null)
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
        song: newVal,
        lyric: lyricData
      })
    } else {
      // console.log(currentSong.value.lyric)
      lyricData.value = currentSong.value.lyric
    }
    if (currentSong.value.lyric !== lyricData) { // 防止快速切换currentSong 歌词调用接口慢
      return
    }

    currentLyric.value = new Lyric(lyricData, handleLyric)
  })

  const handleLyric = () => {

  }

  return {
    aaa
  }
}
