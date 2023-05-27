import { PLAY_MODE } from '@/assets/js/constant'
import { shuffle } from '@/assets/js/util' // 随机洗牌算法

// 选择播放
export function selectPlay ({ commit, state }, { list, index }) {
  commit('setPlayMode', PLAY_MODE.sequence)
  commit('setSequenceList', list)
  commit('setPlayingState', true)
  commit('setFullScreen', true)
  commit('setPlaylist', list)
  commit('setCurrentIndex', index)
}

// 随机播放
export function randomPlay ({ commit }, list) {
  commit('setPlayMode', PLAY_MODE.random)
  commit('setSequenceList', list)
  commit('setPlayingState', true)
  commit('setFullScreen', true)
  commit('setPlaylist', shuffle(list))
  commit('setCurrentIndex', 0)
}

// 切换播放模式
export function changeMode ({ commit, state, getters }, mode) {
  const currentId = getters.currentSong.id // 拿到当前播放的id
  if (mode === PLAY_MODE.random) {
    commit('setPlaylist', shuffle(state.sequenceList))
  } else {
    commit('setPlaylist', state.sequenceList)
  }
  const index = state.playlist.findIndex(song => { // 在新播放列表中找到当前播放的索引
    return currentId === song.id
  })
  commit('setCurrentIndex', index) // 保证在切换模式后新列表 还是播放当前歌曲
  commit('setPlayMode', mode)
}
