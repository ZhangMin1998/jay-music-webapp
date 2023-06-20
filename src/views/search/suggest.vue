<template>
  <div class="suggest" ref="rootRef" v-loading:[loadingText]="loading" v-no-result:[noResultText]="noResult">
    <div class="search_suggest">
      <p class="title" v-if="!noResult">最佳匹配</p>
      <div class="search_suggest_item" v-for="(item, index) in singer" :key="index" @click="selectSinger(item)">
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
      <li class="suggest-item" v-for="(item, index) in songs" :key="index" @click="selectSong(item)">
        <div class="name">
          <p class="song">{{item.name}}</p>
          <p class="singer">{{item.singer}}</p>
        </div>
      </li>
      <div v-loading:[loadingText]="pullUpLoading"></div>
    </div>
    <!-- <ul class="suggest_list">
      <li class="suggest-item" v-for="(item, index) in songs" :key="index">
        <div class="name">
          <p class="song">{{item.name}}</p>
          <p class="singer">{{item.singer}}</p>
        </div>
      </li>
      <div class="suggest-item" v-loading:[loadingText]="pullUpLoading"></div>
    </ul> -->
  </div>
</template>

<script>
import { ref, watch, computed } from 'vue'
import { getSearchSongs, getSearchSuggest, getSongDetail } from '@/api/search'
import { createSearchSong } from '@/assets/js/song'
import usePullUpLoad from '@/views/search/use-pull-up-load'

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
  // emits: ['noResult'],
  emits: ['selectSong', 'select-singer'],
  setup (props, { emit }) {
    const singer = ref(null)
    const playlists = ref(null) // 歌单
    const songs = ref([])
    const hasMore = ref(true)
    const page = ref(1)
    // let suggest = ref(null)
    const loading = ref(false)
    const loadingText = ref('正在加载...')
    const noResultText = ref('抱歉，暂无搜索结果')

    // const loading = computed(() => {
    //   return !singer.value && !playlists.value && !songs.value.length
    // })
    const noResult = computed(() => {
      return !singer.value && !playlists.value && !songs.value.length && !hasMore.value
    })

    const pullUpLoading = computed(() => {
      return isPullUpLoad.value && hasMore.value
    })

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

      // emit('noResult', !singer.value && !playlists.value && !songs.value.length && !hasMore.value)
    }

    const searchMore = async () => {
      if (!hasMore.value || !props.query || !songs.value.length) return
      // page.value++
      const res = await getSearchSongs(props.query, page.value)
      hasMore.value = res.result.hasMore || false
      const list = res.result.songs || []
      const ret = []
      list.forEach((item) => {
        ret.push(createSearchSong(item))
      })
      songs.value = songs.value.concat(ret)
      page.value += 30
    }

    // hook
    const { rootRef, isPullUpLoad } = usePullUpLoad(searchMore)

    // 点击歌曲
    const selectSong = (item) => {
      getSongDetail(item.id).then((res) => {
        if (res.code === 200) {
          // item.al.picUrl = res.songs[0].al.picUrl
          emit('select-song', res.songs[0])
        }
      })
      // emit('select-song', item)
    }

    // 点击歌手
    const selectSinger = item => {
      // console.log(item)
      item.avatar = item.picUrl
      emit('select-singer', item)
    }

    return {
      singer,
      playlists,
      songs,
      hasMore,
      page,
      // suggest,
      loadingText,
      loading,
      noResultText,
      noResult,

      rootRef,
      pullUpLoading,

      selectSong,
      selectSinger
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
      padding: 10px 0 10px 20px;
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
  // .suggest_list{
  //   height: 100%;
  //   padding-bottom: 45px;
  //   .suggest-item{
  //     height: 50px;
  //     padding: 3px 20px;
  //     display: flex;
  //     align-items: center;
  //     border-bottom: 1px solid rgb(228, 228, 228);
  //     p {
  //       padding: 3px 0;
  //     }
  //     .song{
  //       color: $color-text;
  //       font-size: $font-size-medium-x;
  //       white-space: nowrap;
  //       overflow: hidden;
  //       text-overflow: ellipsis;
  //     }
  //     .singer{
  //       font-size: 12px;
  //       color: $color-text-g;
  //       white-space: nowrap;
  //       overflow: hidden;
  //       text-overflow: ellipsis;
  //     }
  //   }
  // }
}
</style>
