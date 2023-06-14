<template>
  <div class="search">
    <transition appear name="slide">
      <div class="search_box_wrapper">
        <i class="fa fa-angle-left" @click="goBack"></i>
      </div>
    </transition>
  </div>
</template>

<script>
// import { useRoute, useRouter } from 'vue-router'
import { useRouter } from 'vue-router'
// import SearchInput from '@/components/search/search-input'
// import Suggest from '@/components/search/suggest'
// import SearchList from '@/components/base/search-list/search-list'
// import Scroll from '@/components/wrap-scroll'
// import Confirm from '@/components/base/confirm/confirm'
// import { ref, computed, watch, nextTick } from 'vue'
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
    // Confirm,
    // Scroll,
    // SearchList,
    // SearchInput,
    // Suggest
  },
  setup () {
    // const route = useRoute()
    const router = useRouter()

    const goBack = () => {
      router.back()
    }
    return {
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
      background: $color-theme;
      .fa-angle-left {
        color: #fff;
        padding: 5px 10px;
        font-size: 30px;
      }
    }
  }
</style>
