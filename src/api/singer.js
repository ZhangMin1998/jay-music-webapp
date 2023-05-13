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
export function getSingerDetail (singerId) {
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
