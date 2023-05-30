import { request } from '@/utils/request'

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

// 获取音乐歌词
export function getSongLyric (id) {
  return request({
    url: '/lyric',
    params: {
      id: id
    }
  })
}
