<template>
  <transition appear name="slide">
    <div class="search">
      <div class="search_box_wrapper">
        <i class="fa fa-angle-left" @click="goBack"></i>
        <!-- <search-box ref="searchBox" placeholder="搜索歌曲、歌手"></search-box> -->
        <search-box-vue3 v-model='query' placeholder="搜索歌曲、歌手"></search-box-vue3>
      </div>
      <scroll class="search_scroll_wrapper" ref="scrollRef" v-show="!query">
        <div>
          <!-- 热门搜索 -->
          <div class="search_hots">
            <p class="title">热门搜索</p>
            <span class="search_hots_item" v-for="(item, index) in hotKeys" :key="index" @click="addQuery(item.first)">
              {{ item.first }}
            </span>
          </div>
          <div class="search_history" v-show="historyList.length">
            <div class="title">
              <span class="text">搜索历史</span>
              <span class="clear" @click="showConfirm">
                <i class="icon-clear" ></i>
              </span>
            </div>
            <Confirm
              ref="confirmRef"
              text="是否清空所有搜索历史"
              confirm-btn-text="清空"
              @confirm="clearSearch"
            >
            </Confirm>
            <search-history
              :searchList="historyList"
              @select="addQuery"
              @delete="deleteSearch"
            ></search-history>
          </div>
        </div>
      </scroll>
      <!-- 搜索结果 -->
      <div class="search_result" v-show="query">
        <suggest
          :query="query"
          @noResult="noResultFun"
          @select-song="selectSong"
          @select-singer="selectSinger"
          @select-album="selectAlbum"
        ></suggest>
      </div>
      <router-view v-slot="{ Component }">
        <transition appear name="slide">
          <component :is="Component" :data="selectedItem"/>
        </transition>
      </router-view>
    </div>
  </transition>
</template>

<script>
// import { useRoute, useRouter } from 'vue-router'
import { useRouter } from 'vue-router'
import { ref, computed, watch, nextTick } from 'vue'
import { useStore } from 'vuex'
import searchBoxVue3 from '@/base/search-box/search-box-vue3'
import searchHistory from '@/views/search/search-history'
import { getSearchHot } from '@/api/search'
import Scroll from '@/components/wrap-scroll'
import suggest from '@/views/search/suggest'
import storage from 'good-storage'
import { SINGER_KEY, ALBUM_KEY } from '@/assets/js/constant'
import useSearchHistory from '@/views/search/use-search-history'
import Confirm from '@/base/Comfirm/comfirm.vue'


export default {
  // eslint-disable-next-line
  name: 'search',
  components: {
    searchBoxVue3,
    searchHistory,
    Scroll,
    suggest,
    Confirm
  },
  setup () {
    // const route = useRoute()
    const router = useRouter()

    const store = useStore()

    const query = ref('')
    const confirmRef = ref(null)
    const scrollRef = ref(null)
    const selectedItem = ref(null)
    watch(query, async (val) => {
      if (!val) {
        await nextTick()
        refreshScroll()
      }
    })

    const refreshScroll = () => {
      scrollRef.value.scroll.refresh()
    }

    const noResultText = ref('抱歉，暂无搜索结果')
    const noResult = ref(false)

    const historyList = computed(() => store.state.searchHistory)
    const { saveSearch, deleteSearch, clearSearch } = useSearchHistory()

    const hotKeys = ref([])
    getSearchHot().then(res => {
      hotKeys.value = res.result.hots
    })

    const goBack = () => {
      router.back()
    }
    const addQuery = (s) => {
      query.value = s
    }
    const noResultFun = (e) => {
      noResult.value = e
    }

    const selectSong = song => { // 添加一首歌 就是往playlist sequenslist添加一首
      saveSearch(query.value)
      store.dispatch('addSong', song)
    }

    const selectSinger = item => {
      // console.log(item)
      saveSearch(query.value)
      selectedItem.value = item
      storage.session.set(SINGER_KEY, item)
      router.push({
        path: `/singer/${item.id}`
      })
    }
    const selectAlbum = item => {
      saveSearch(query.value)
      selectedItem.value = item
      storage.session.set(ALBUM_KEY, item)
      router.push({
        path: `/album/${item.id}`
      })
    }
    const showConfirm = () => {
      confirmRef.value.show()
    }

    return {
      query,
      noResultText,
      hotKeys,
      selectedItem,
      confirmRef,
      scrollRef,

      historyList,

      goBack,
      addQuery,
      noResultFun,
      noResult,

      selectSong,
      selectSinger,
      selectAlbum,

      deleteSearch,
      clearSearch,
      showConfirm
    }
  }
}
</script>

<style lang="scss" scoped>
  .search {
    position: fixed;
    width: 100%;
    top: 0;
    bottom: 0;
    background: $color-background;
    display: flex;
    flex-direction: column;
    .search_box_wrapper{
      padding: 0px 35px 0px 5px;
      background: $color-theme;
      display: flex;
      align-items: center;
      .fa-angle-left {
        color: #fff;
        padding: 5px 10px;
        font-size: 30px;
        // position: absolute;
        // top: 3px;
        // left: 5px;
      }
    }
    .search_scroll_wrapper{
      flex: 1;
      // height: 100%;
      overflow: hidden;
      .search_hots{
        margin: 0 20px;
        .title{
          height: 30px;
          line-height: 30px;
          padding: 15px 5px 0 5px;
          font-size:$font-size-small-x;
          color: $color-text-g;
        }
        .search_hots_item{
          display: inline-block;
          line-height: 20px;
          margin: 4px;
          padding: 3px 5px;
          border: 0.8px solid $color-text-ggg;
          border-radius: 5px;
          color: $color-text;
          font-size: $font-size-medium;
        }
      }
      .search_history{
        margin: 10px 20px;
        .title{
          height: 30px;
          display: flex;
          align-items: center;
          font-size: $font-size-small-x;
          color: $color-text-g;
          .text{
          flex: 1;
          }
          .clear{
          .icon-clear {
            font-size: $font-size-medium;
            color: $color-text;
          }
          }
        }
      }
    }
    .search_result{
      flex: 1;
      overflow: hidden;
      // width: 100%;
      // height: 100%;
      // position: relative;
      // top: 10px;
      // bottom: 0;
    }
  }
</style>
