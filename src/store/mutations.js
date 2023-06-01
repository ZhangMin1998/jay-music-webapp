const mutations = {
  // 修改播放状态
  setPlayingState (state, playing) {
    state.playing = playing
  },
  // 设置顺序播放列表
  setSequenceList (state, list) {
    state.sequenceList = list
  },
  // 设置播放列表
  setPlaylist (state, list) {
    state.playlist = list
  },
  // 设置播放模式
  setPlayMode (state, mode) {
    state.playMode = mode
  },
  // 设置当前播放索引
  setCurrentIndex (state, index) {
    state.currentIndex = index
  },
  // 设置是否全屏播放
  setFullScreen (state, fullScreen) {
    state.fullScreen = fullScreen
  },
  // 设置收藏
  setFavoriteList (state, list) {
    state.favoriteList = list
  },
  // 保存歌词
  addSongLyric (state, { song, lyric }) {
    // console.log('song', song)
    state.sequenceList.map(item => {
      if (song.value.id === item.id) {
        item.lyric = lyric
      }
      return item
    })
  }
}

export default mutations
