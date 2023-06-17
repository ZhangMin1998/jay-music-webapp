<template>
  <transition appear name="slide">
    <div class="search">
      <div class="search_box_wrapper">
        <i class="fa fa-angle-left" @click="goBack"></i>
        <!-- <search-box ref="searchBox" placeholder="搜索歌曲、歌手"></search-box> -->
        <search-box-vue3 v-model='query' placeholder="搜索歌曲、歌手"></search-box-vue3>
      </div>
      <scroll class="search_scroll_wrapper" ref="scrollRef">
        <div>
          <div class="search_hots" v-show="!query">
            <p class="title">热门搜索</p>
            <span class="search_hots_item" v-for="(item, index) in hotKeys" :key="index" @click="addQuery(item.first)">
              {{ item.first }}
            </span>
          </div>
        </div>
      </scroll>
    </div>
  </transition>
</template>

<script>
// import { useRoute, useRouter } from 'vue-router'
import { useRouter } from 'vue-router'
import { ref, watch } from 'vue'
// import SearchBox from '@/base/search-box/search-box'
import searchBoxVue3 from '@/base/search-box/search-box-vue3'
import { getSearchHot } from '@/api/search'
// import SearchInput from '@/components/search/search-input'
// import Suggest from '@/components/search/suggest'
// import SearchList from '@/components/base/search-list/search-list'
import Scroll from '@/components/wrap-scroll'
// import Confirm from '@/components/base/confirm/confirm'
// import { getHotKeys } from '@/service/search'
// import { useStore } from 'vuex'
// import { useRouter } from 'vue-router'
// import storage from 'good-storage'
// import { SINGER_KEY } from '@/assets/js/constant'
// import useSearchHistory from '@/components/search/use-search-history'

export default {
  // eslint-disable-next-line
  name: 'search',
  components: {
    // SearchBox,
    searchBoxVue3,
    Scroll
  },
  setup () {
    // const route = useRoute()
    const router = useRouter()

    const query = ref('')
    // watch(query, (val) => {
    //   console.log(val)
    // })

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
    return {
      query,
      hotKeys,

      goBack,
      addQuery
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
      height: 100%;
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
    }
  }
</style>
