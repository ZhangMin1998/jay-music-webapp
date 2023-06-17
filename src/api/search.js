import { request } from '@/utils/request'

// 获取热门搜索
export function getSearchHot () {
  return request({
    url: '/search/hot'
    // params: {
    //   id: id
    // }
  })
}

// 歌手搜索
export function getSearchSinger (name) {
  return request({
    url: `/search?keywords=${name}&type=100`
  })
}

// 单曲搜索
export function getSearchSongs (name, page) {
  return request({
    url: `/search?keywords=${name}&type=1&offset=${page}`
  })
}

// 搜索建议
export function getSearchSuggest (name) {
  return request({
    url: `/search/suggest?keywords=${name}`
  })
}

// 获取歌曲详情
export function getSongDetail (id) {
  return request({
    url: `/song/detail?ids=${id}`
  })
}
