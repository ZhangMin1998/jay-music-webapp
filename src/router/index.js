import { createRouter, createWebHashHistory } from 'vue-router'

const Recommend = () => import('@/views/recommend/index.vue'/* webpackChunkName: "recommend" */)
const RecommendDetail = () => import('@/views/recommend/recommendDetail.vue')
const Singer = () => import('@/views/singer/singer.vue'/* webpackChunkName: "singer" */)
const TopList = () => import('@/views/top-list/top-list'/* webpackChunkName: "top-list" */)
const TopListDetail = () => import('@/views/top-list/top-list-detail')
const Search = () => import('@/views/search/search'/* webpackChunkName: "search" */)
const SingerDetail = () => import('@/views/singer/singer-detail.vue'/* webpackChunkName: "singer-detail" */)
const User = () => import('@/views/user/user.vue'/* webpackChunkName: "user-center" */)
// const Album = () => import('@/views/album'/* webpackChunkName: "album" */)
// const TopDetail = () => import('@/views/top-detail'/* webpackChunkName: "top-detail" */)

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: Recommend
    // children: [
    //   {
    //     path: 'album/:id',
    //     component: RecommendDetail
    //   }
    // ]
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
    component: Search,
    children: [
      {
        path: '/singer/:id',
        component: SingerDetail
      }
      // {
      //   path: '/album/:id',
      //   component: RecommendDetail
      // }
    ]
  },
  {
    path: '/album/:id',
    name: 'Album',
    component: RecommendDetail
  },
  {
    path: '/user',
    name: 'User',
    component: User
    // 命名路由  与 router-view name='user'搭配使用
    // components: {
    //   user: UserCenter
    // }
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL), // createWebHashHistory
  routes
})

export default router
