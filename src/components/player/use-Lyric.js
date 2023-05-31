import { useStore } from "vuex"
import { getSongLyric } from "@/api/song"
import { computed, watch, ref } from "vue"
import Lyric from 'lyric-parser'

export default function useLyric ({ songReady, currentTime }) {
  const currentLyric = ref(null) // 当前歌曲歌词
  const currentLineNum = ref(0) // 当前播放行数

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
      lyricData.value = currentSong.value.lyric
    }
    if (currentSong.value.lyric !== lyricData.value) { // 防止快速切换currentSong 歌词调用接口慢
      return
    }

    currentLyric.value = new Lyric(lyricData.value, handleLyric)
    // console.log(currentLyric.value)
    if (songReady.value) { // player.vue页面songReady执行了再执行playLyric 但是如果歌词为空  也不执行 所以这里执行下
      playLyric()
    }
  })

  // 歌词播放
  const playLyric = () => {
    const currentLyricVal = currentLyric.value
    if (currentLyricVal) {
      currentLyricVal.seek(currentTime.value * 1000)
    }
  }

  // 歌词格式化
  const handleLyric = ({lineNum, txt }) => {
    currentLineNum.value = lineNum
  }

  return {
    currentLyric,
    currentLineNum,
    playLyric
  }
}
