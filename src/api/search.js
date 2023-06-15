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
