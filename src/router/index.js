import { createRouter, createWebHashHistory } from 'vue-router'

const Recommend = () => import('@/views/recommend/index.vue'/* webpackChunkName: "recommend" */)
const RecommendDetail = () => import('@/views/recommend/recommendDetail.vue')
const Singer = () => import('@/views/singer/singer.vue'/* webpackChunkName: "singer" */)
const TopList = () => import('@/views/top-list/top-list'/* webpackChunkName: "top-list" */)
const TopListDetail = () => import('@/views/top-list/top-list-detail')
const Search = () => import('@/views/search/search'/* webpackChunkName: "search" */)
const SingerDetail = () => import('@/views/singer/singer-detail.vue'/* webpackChunkName: "singer-detail" */)
// const Album = () => import('@/views/album'/* webpackChunkName: "album" */)
// const TopDetail = () => import('@/views/top-detail'/* webpackChunkName: "top-detail" */)
// const UserCenter = () => import('@/views/user-center'/* webpackChunkName: "user-center" */)

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: Recommend,
    children: [
      {
        path: ':id',
        component: RecommendDetail
      }
    ]
  },
  {
    path: '/singer',
    name: 'Singer',
    component: Singer,
    children: [
      {
        path: ':id',
        name: 'SingerDetail',
        component: SingerDetail
      }
    ]
  },
  {
    path: '/top-list',
    component: TopList,
    children: [
      {
        path: ':id',
        component: TopListDetail
      }
    ]
  },
  {
    path: '/search',
    component: Search
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL), // createWebHashHistory
  routes
})

export default router
