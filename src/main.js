import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import lazyPlugin from 'vue3-lazy'
import loadingDirective from './base/Loading/directive'
import noResultDirective from './base/no-result/directive'
// import { load, saveAll } from '@/assets/js/array-store'
// import { FAVORITE_KEY, PLAY_KEY } from '@/assets/js/constant'

// 引入全局样式文件
import '@/assets/scss/index.scss'

createApp(App).use(store).use(router).use(lazyPlugin, {
  loading: require('@/assets/images/jay.png')
}).directive('loading', loadingDirective).directive('no-result', noResultDirective).mount('#app')
