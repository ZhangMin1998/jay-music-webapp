import { request } from '@/utils/request'

// 热门歌手
export function getSingerList () {
  return request({
    url: '/top/artists',
    params: {
      limit: 100
    }
  })
}
// 歌手详情
export function getSingerDetail2 (singerId) {
  return request({
    url: '/artists', // 获取歌手单曲接口
    params: {
      id: singerId
    }
  })
}
// 获取歌曲
export function getMusic (songId) {
  return request({
    url: '/song/url', // 获取音乐 url
    params: {
      id: songId
    }
  })
}

// 获取歌手详情
export function getSingerDetail (id) {
  return request({
    url: '/artists/detail',
    params: {
      id: id
    }
  })
}
// 获取歌手全部单曲
export function getSingerSongs (id) {
  return request({
    // url: '/artist/top/song',
    url: '/artist/songs',
    params: {
      id: id
      // limit: 100
    }
  })
}

// 获取音乐url
export function getSongsUrl (id) {
  return request({
    // url: '/artist/top/song',
    url: '/song/url',
    params: {
      id: id
    }
  })
}
