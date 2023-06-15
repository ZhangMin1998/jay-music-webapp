<template>
  <div class="search">
    <transition appear name="slide">
      <div class="search_box_wrapper">
        <i class="fa fa-angle-left" @click="goBack"></i>
        <!-- <search-box ref="searchBox" placeholder="搜索歌曲、歌手"></search-box> -->
        <search-box-vue3 v-model='query' placeholder="搜索歌曲、歌手"></search-box-vue3>
      </div>
    </transition>
  </div>
</template>

<script>
// import { useRoute, useRouter } from 'vue-router'
import { useRouter } from 'vue-router'
import { ref, watch } from 'vue'
// import SearchBox from '@/base/search-box/search-box'
import searchBoxVue3 from '@/base/search-box/search-box-vue3'
// import SearchInput from '@/components/search/search-input'
// import Suggest from '@/components/search/suggest'
// import SearchList from '@/components/base/search-list/search-list'
// import Scroll from '@/components/wrap-scroll'
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
    searchBoxVue3
  },
  setup () {
    // const route = useRoute()
    const router = useRouter()

    const query = ref('')
    watch(query, (val) => {
      console.log(val)
    })

    const goBack = () => {
      router.back()
    }
    return {
      query,

      goBack
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
  }
</style>
