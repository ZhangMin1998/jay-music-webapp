import { createRouter, createWebHashHistory } from 'vue-router'

const Recommend = () => import('@/views/recommend'/* webpackChunkName: "recommend" */)
const Singer = () => import('@/views/singer/singer.vue'/* webpackChunkName: "singer" */)
const TopList = () => import('@/views/top-list'/* webpackChunkName: "top-list" */)
const Search = () => import('@/views/search'/* webpackChunkName: "search" */)
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
    component: Recommend
    // children: [
    //   {
    //     path: ':id',
    //     component: Album
    //   }
    // ]
  },
  {
    path: '/singer',
    name: 'Singer',
    component: Singer,
    children: [
      {
        path: '/detail/:id',
        name: 'SingerDetail',
        component: SingerDetail
      }
    ]
  },
  // {
  //   path: '/singer/detail/:id',
  //   component: SingerDetail
  // },
  {
    path: '/top-list',
    component: TopList
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
