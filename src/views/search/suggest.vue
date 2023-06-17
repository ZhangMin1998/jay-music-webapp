<template>
  <div class="suggest" v-loading:[loadingText]="!Object.keys(suggest).length">
    <div class="search_suggest">
      <p class="title">最佳匹配</p>
      <div class="search_suggest_item" v-if="suggest.artists">
        <img :src="suggest.artists[0].picUrl" width="50" height="50">
        <span>歌手：{{suggest.artists[0].name}}</span>
      </div>
      <div class="search_suggest_item" v-if="suggest.playlists">
        <img :src="suggest.playlists[0].coverImgUrl" width="50" height="50">
        <div class="text">
          <p>歌单：{{suggest.playlists[0].name}}</p>
          <p class="singer">{{suggest.albums[0].artist.name}}</p>
        </div>
      </div>
    </div>
    <ul class="suggest_list">

    </ul>
  </div>
</template>

<script>
import { ref, watch, reactive } from 'vue'
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
  setup (props) {
    const singer = ref(null)
    const songs = ref([])
    const hasMore = ref(true)
    const page = ref(1)
    const suggest = reactive({})
    const loadingText = ref('')

    watch(() => props.query, async newQuery => {
      if (!newQuery) return
      await search()
    })

    const search = async () => {
      if (!props.query) return

      // 初始化
      singer.value = null
      songs.value = []
      page.value = 1
      hasMore.value = true

      const res = await getSearchSongs(props.query, page.value)
      console.log(res)
      const list = res.result.songs
      const ret = []
      list.forEach((item) => {
        ret.push(createSearchSong(item))
      })
      songs.value = ret
      page.value += 30

      const res2 = await getSearchSuggest(props.query)
      console.log(res2)
      Object.assign(suggest, res2.result)
      console.log(suggest)
    }

    return {
      singer,
      songs,
      hasMore,
      page,
      suggest,
      loadingText
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
      img {
        flex: 0 0 50px;
        padding-right: 15px;
      }
      .text{
        width: 100%;
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

  }
}
</style>
