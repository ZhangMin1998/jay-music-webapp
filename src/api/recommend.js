import { request } from '@/utils/request'

// 轮播图
export function getBannerData () {
  return request({
    url: '/banner',
    params: {
      type: 0
    }
  })
}
// 推荐歌单
export function getRecommendList () {
  return request({
    url: '/personalized',
    params: {
      limit: 9
    }
  })
}
