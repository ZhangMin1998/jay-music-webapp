<template>
  <transition name="slide">
    <div class="user" v-no-result:[noResultText]="noResult">
      <div class="back">
        <i class="fa fa-angle-left" @click="goBack"></i>
      </div>
      <div class="switches_wrapper">
        <switches :switches="switches" v-model="currentIndex"></switches>
      </div>
      <div class="sequence_play" @click="random">
        <i class="iconfont icon-bofangicon"></i>
        <span class="text">随机播放</span>
        <span class="count">(共{{songLength}}首)</span>
      </div>
      <div class="list-wrapper" ref="listWrapperRef">
        <Scroll class="list_scroll" v-if="currentIndex === 0">
          <div class="list-inner">
            <song-list :songs="favoriteList" @select="selectSong"></song-list>
          </div>
        </Scroll>
        <Scroll class="list_scroll" v-if="currentIndex === 1">
          <div class="list-inner">
            <song-list :songs="playHistory" @select="selectSong"></song-list>
          </div>
        </Scroll>
      </div>
    </div>
  </transition>
</template>

<script>
import switches from '@/base/switches/switches'
import Scroll from '@/components/wrap-scroll'
import SongList from '@/base/SongList/SongList'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'user-center',
  components: {
    switches,
    Scroll,
    SongList
  },
  computed: {
    ...mapState([
      'favoriteList',
      'playHistory'
    ]),
    noResult() {
      return this.currentIndex === 0 ? !this.favoriteList.length : !this.playHistory.length
    },
    noResultText() {
      return this.currentIndex === 0 ? '暂无收藏歌曲' : '你还没有听过歌曲'
    },
  },
  data () {
    return {
      switches: [
        { name: '我的收藏' },
        { name: '最近播放' }
      ],
      currentIndex: 0
    }
  },
  methods: {
    goBack () {
      this.$router.back()
    },
    random () {

    },
    selectSong () {

    }
  }
}
</script>

<style lang="scss" scoped>
.user{
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 100;
  width: 100%;
  background: $color-background;
  .back {
    position: absolute;
    top: 0;
    left: 4px;
    .fa-angle-left {
      padding: 5px 10px;
      font-size: 30px;
      color: #fff;
    }
  }
  .switches_wrapper {
    display: flex;
    align-items: center;
    background: $color-theme;
    height: 44px;
  }
  .sequence_play{
    // position: absolute;
    // top: 44px;
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    padding-left: 16px;
    border-bottom: 1px solid rgb(228, 228, 228);
    .iconfont {
      font-size: 18px;
      color: $color-text;
      padding-right: 14px;
    }
    .text {
      font-size: $font-size-medium-x;
    }
    .count {
      font-size: $font-size-medium;
      color: $color-text-g;
    }
  }
  .list-wrapper{
    // position: absolute;
    // top: 84px;
    // bottom: 0;
    // width: 100%;
    // .list_scroll{
    //   height: 100%;
    //   overflow: hidden;
    //   .list-inner{
    //     // padding: 20px 30px;
    //   }
    // }
  }
}
</style>
