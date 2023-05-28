import { PLAY_MODE, FAVORITE_KEY } from '@/assets/js/constant'
import { load } from '@/assets/js/array-store'

const state = {
  sequenceList: [], // 顺序播放列表
  playlist: [], // 真实播放列表
  playing: false, // 播放状态
  playMode: PLAY_MODE.sequence, // 播放模式
  currentIndex: 0, // 当前播放索引
  fullScreen: false, // 全屏播放还是收缩

  favoriteList: load(FAVORITE_KEY) // 收藏歌曲列表
}

export default state
