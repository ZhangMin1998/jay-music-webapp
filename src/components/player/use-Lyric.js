import { useStore } from 'vuex'
import { getSongLyric } from '@/api/song'
import { computed, watch, ref } from 'vue'
import Lyric from 'lyric-parser'

export default function useLyric ({ songReady, currentTime }) {
  const currentLyric = ref(null) // 当前歌曲歌词
  const currentLineNum = ref(0) // 当前播放行数
  const pureMusicLyric = ref('') // 无歌词显示提示文字
  const playingLyric = ref('')

  const lyricScrollRef = ref(null)
  const lyricListRef = ref(null)

  const lyricData = ref('')
  const store = useStore()
  const currentSong = computed(() => store.getters.currentSong)

  // 切歌的时候
  watch(currentSong, async newVal => {
    if (!newVal.id) return

    stopLyric()
    currentLyric.value = null
    currentLineNum.value = 0
    pureMusicLyric.value = ''
    playingLyric.value = ''

    if (!newVal.lyric) {
      const result = await getSongLyric(newVal.id)
      lyricData.value = result.lrc.lyric

      store.commit('addSongLyric', {
        song: currentSong,
        lyric: result.lrc.lyric
      })
    } else {
      lyricData.value = currentSong.value.lyric
    }
    if (currentSong.value.lyric !== lyricData.value) { // 防止快速切换currentSong 歌词调用接口慢
      return
    }

    currentLyric.value = new Lyric(lyricData.value, handleLyric)

    const hasLyric = currentLyric.value.lines.length
    if (hasLyric) {
      if (songReady.value) { // player.vue页面songReady执行了再执行playLyric 但是如果歌词为空  也不执行 所以这里执行下
        playLyric()
      }
    } else {
      pureMusicLyric.value = '暂无歌词'
    }
  })

  // 歌词播放
  const playLyric = () => {
    const currentLyricVal = currentLyric.value
    if (currentLyricVal) {
      currentLyricVal.seek(currentTime.value * 1000) // ???
    }
  }

  // 歌词停止
  const stopLyric = () => {
    const currentLyricVal = currentLyric.value
    if (currentLyricVal) {
      currentLyricVal.stop()
    }
  }

  // 歌词格式化
  const handleLyric = ({ lineNum, txt }) => {
    currentLineNum.value = lineNum
    playingLyric.value = txt

    // 使歌词高亮始终在中间位置
    const scrollComponent = lyricScrollRef.value
    const listEl = lyricListRef.value
    if (!listEl) return
    if (lineNum > 5) { // 第六行开始滚动
      const lineEl = listEl.children[lineNum - 5]
      scrollComponent.scroll.scrollToElement(lineEl, 1000) // 滚动时间1s
    } else {
      scrollComponent.scroll.scrollTo(0, 0, 1000) // 不滚动
    }
  }

  return {
    currentLyric,
    currentLineNum,
    playLyric,
    stopLyric,
    lyricScrollRef,
    lyricListRef,
    pureMusicLyric,
    playingLyric
  }
}
