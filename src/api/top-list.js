import { request } from '@/utils/request'

// 获取排行榜列表
export function getTopList () {
  return request({
    url: '/toplist/detail'
    // params: {
    //   id: id
    // }
  })
}

// 获取排行榜详情
export function getTopListDetail (id) {
  return request({
    url: '/playlist/detail',
    params: {
      id: id
    }
  })
}
