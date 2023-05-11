import { request } from '@/utils/request'

export function getBannerData () {
  return request({
    url: '/banner',
    params: {
      type: 0
    }
  })
}
