<template>
  <div class="suggest" v-loading:[loadingText]="loading">
    <div class="search_suggest">
      <!-- <p class="title">最佳匹配{{ suggest }}</p> -->
      <div class="search_suggest_item" v-for="(item, index) in singer" :key="index">
        <img v-lazy="item.picUrl" width="50" height="50">
        <span>歌手：{{item.name}}</span>
      </div>
      <div class="search_suggest_item" v-for="(item, index) in playlists" :key="index">
        <img :src="item.coverImgUrl" width="50" height="50">
        <div class="text">
          <p>歌单：{{item.name}}</p>
          <p class="singer">{{item.description}}</p>
        </div>
      </div>
    </div>
    <ul class="suggest_list">
      <li class="suggest-item" v-for="(item, index) in songs" :key="index">
        <div class="name">
          <p class="song">{{item.name}}</p>
          <p class="singer">{{item.singer}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { getSearchSongs, getSearchSuggest, getSongDetail } from '@/api/search'
import { createSearchSong } from '@/assets/js/song'

export default {
  name: 's_uggest',
  props: {
    query: {
      type: String,
      default: ''
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  emits: ['noResult'],
  setup (props, { emit }) {
    const singer = ref(null)
    const playlists = ref(null) // 歌单
    const songs = ref([])
    const hasMore = ref(true)
    const page = ref(1)
    let suggest = ref(null)
    let loading = ref(false)
    const loadingText = ref('')
    const noResultText = ref('抱歉，暂无搜索结果')

    // const loading = computed(() => {
    //   return !singer.value && !playlists.value && !songs.value.length
    // })
    // const noResult = computed(() => {
    //   return !singer.value && !playlists.value && !songs.value.length && !hasMore.value
    // })

    watch(() => props.query, async newQuery => {
      if (!newQuery) return
      await search()
    })

    const search = async () => {
      if (!props.query) return

      // 初始化
      singer.value = null
      playlists.value = null
      songs.value = []
      page.value = 1
      hasMore.value = true
      loading.value = true

      const res = await getSearchSongs(props.query, page.value)
      console.log(res)
      hasMore.value = res.result.hasMore || false
      // songs.value = res.result.songs || []
      const list = res.result.songs || []
      const ret = []
      list.forEach((item) => {
        ret.push(createSearchSong(item))
      })
      songs.value = ret
      page.value += 30

      const res2 = await getSearchSuggest(props.query)
      singer.value = res2.result.artists
      playlists.value = res2.result.playlists
      loading.value = false

      emit('noResult', !singer.value && !playlists.value && !songs.value.length && !hasMore.value)
    }

    return {
      singer,
      playlists,
      songs,
      hasMore,
      page,
      suggest,
      loadingText,
      loading,
      noResultText
      // noResult
    }
  }
}
</script>

<style lang="scss" scoped>
.suggest{
  height: 100%;
  overflow: hidden;
  .search_suggest{
    .title{
      font-size: 12px;
      color: $color-theme;
      padding: 0 0 20px 10px;
    }
    .search_suggest_item{
      display: flex;
      align-items: center;
      padding: 8px 20px;
      font-size: $font-size-medium;
      border-bottom: 1px solid rgb(228, 228, 228);
      img {
        flex: 0 0 50px;
        padding-right: 15px;
      }
      .text{
        width: 80%;
        p {
          padding: 3px 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .singer {
          font-size: 12px;
          color: $color-text;
        }
      }
    }
  }
  .suggest_list{
    height: 100%;
    padding-bottom: 45px;
    .suggest-item{
      height: 50px;
      padding: 3px 20px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid rgb(228, 228, 228);
      p {
        padding: 3px 0;
      }
      .song{
        color: $color-text;
        font-size: $font-size-medium-x;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .singer{
        font-size: 12px;
        color: $color-text-g;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
