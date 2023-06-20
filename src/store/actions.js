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

// 删除歌曲
export function removeSong ({ commit, state }, song) {
  const sequenceList = state.sequenceList.slice() // 拷贝
  const playlist = state.playlist.slice()

  // 找索引
  const sequenceIndex = findIndex(sequenceList, song)
  const playIndex = findIndex(playlist, song)
  if (sequenceIndex < 0 || playIndex < 0) return

  // 删除
  sequenceList.splice(sequenceIndex, 1)
  playlist.splice(playIndex, 1)

  // 删除后当前播放索引可能会变
  let currentIndex = state.currentIndex
  if (playIndex < currentIndex || currentIndex === playlist.length) { // 或当前播放是最后一首 删除最后一首
    currentIndex--
  }

  commit('setSequenceList', sequenceList)
  commit('setPlaylist', playlist)
  commit('setCurrentIndex', currentIndex)
  // 如果全部删除完了
  if (!playlist.length) {
    commit('setPlayingState', false)
  }
}

// 清空列表
export function clearSongList ({ commit }) {
  commit('setSequenceList', [])
  commit('setPlaylist', [])
  commit('setCurrentIndex', 0)
  commit('setPlayingState', false)
}

// 添加歌曲
export function addSong ({ commit, state }, song) {
  const sequenceList = state.sequenceList.slice() // 拷贝
  const playlist = state.playlist.slice()
  let currentIndex = state.currentIndex
  const playIndex = findIndex(playlist, song)

  if (playIndex > -1) { // 播放列表中有这首歌
    currentIndex = playIndex
  } else {
    playlist.push(song)
    currentIndex = playlist.length - 1
  }

  const sequenceIndex = findIndex(sequenceList, song)
  if (sequenceIndex === -1) {
    sequenceList.push(song)
  }

  commit('setSequenceList', sequenceList)
  commit('setPlaylist', playlist)
  commit('setCurrentIndex', currentIndex)

  commit('setPlayingState', true)
  commit('setFullScreen', true)
}

function findIndex (list, song) {
  return list.findIndex(item => {
    return item.id === song.id
  })
}
