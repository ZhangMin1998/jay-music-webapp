<template>
  <div class="music_list">
    <div class="header">
      <div class="back" @click="goBack">
        <i class="fa fa-angle-left"></i>
      </div>
      <div class="text">
        <h1 class="title">{{ headerTitle }}</h1>
        <h2 class="list-title" v-if="!showAlias">{{alias}}</h2>
      </div>
    </div>
    <div class="bg_image" :style="bgImageStyle" ref="bgImage">
      <div class="text" v-if="showAlias">
        <h2 class="list-title">{{alias}}</h2>
      </div>
      <!-- <div class="play_btn_wrapper">
        <div class="play_btn">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div> -->
      <div class="filter" :style="filterStyle"></div>
    </div>
    <Scroll
      class="list"
      ref="list"
      v-loading="loading"
      v-no-result:[noResultText]="noResult"
      :style="scrollStyle"
      :probe-type="3"
      :data="songs"
      @scroll="onScroll"
    >
      <div class="music_list_wrapper">
        <div class="sequence_play" v-show="songs.length" @click="random">
          <i class="iconfont icon-bofangicon"></i>
          <span class="text">随机播放</span>
          <span class="count">(共{{songs.length}}首)</span>
        </div>
        <SongList :songs="songs" @select="selectItem"></SongList>
      </div>
    </Scroll>
  </div>
</template>

<script>
// import Scroll from '@/base/Scroll/Scroll'
import Scroll from '@/components/wrap-scroll'
import SongList from '@/base/SongList/SongList'
import { mapActions, mapState } from 'vuex'

const RESERVED_HEIGHT = 44 // 返回栏高度44

export default {
  name: 'music_list',
  components: {
    Scroll,
    SongList
  },
  inject: ['alias'],
  props: {
    songs: {
      type: Array
    },
    headerTitle: {
      type: String
    },
    pic: {
      type: String
    },
    bgStyle: {
      type: String
    },
    loading: {
      type: Boolean
    },
    noResultText: {
      type: String,
      default: '抱歉，没有找到可播放的歌曲'
    }
  },
  computed: {
    bgImageStyle () {
      const scrollY = this.scrollY
      let zIndex = 0
      let paddingTop = '70%'
      let height = 0
      let backgroundPosition = '0 50%'
      let translateZ = 0 // ios适配

      if (scrollY > this.maxTranslateY) {
        zIndex = 10
        paddingTop = 0
        height = `${RESERVED_HEIGHT}px`
        backgroundPosition = '0 10%'
        translateZ = 1 // ios适配
      }

      // 下拉放大效果
      let scale = 1 // 初始值
      if (scrollY < 0) { // 往下拉
        scale = 1 + Math.abs(scrollY / this.imageHeight) // 求绝对值
      }

      return {
        zIndex,
        paddingTop,
        height,
        backgroundPosition,
        backgroundImage: `url(${this.pic})`,
        transform: `scale(${scale})translateZ(${translateZ}px)` //  // ios适配
      }
    },
    scrollStyle () {
      const bottom = this.playlist.length ? '40px' : '0'
      return {
        top: `${this.imageHeight}px`,
        bottom
      }
    },
    filterStyle () {
      let blur = 0
      const scrollY = this.scrollY
      const imageHeight = this.imageHeight
      if (scrollY >= 0) { // 往上拉   需要模糊
        blur = Math.min(scrollY / imageHeight, this.maxTranslateY / imageHeight) * 10
      }
      return {
        backdropFilter: `blur(${blur}px)`
      }
    },
    noResult () {
      return !this.loading && !this.songs.length
    },
    ...mapState([
      'playlist'
    ])
  },
  watch: {
    scrollY: {
      handler (newVal) {
        if (newVal >= this.maxTranslateY) {
          this.showAlias = false
        } else {
          this.showAlias = true
        }
      }
    }
  },
  data () {
    return {
      showAlias: true,
      imageHeight: 0, // 图片的高度
      scrollY: 0, // 滚动的距离
      maxTranslateY: 0 // 最大可滚动距离
    }
  },
  mounted () {
    this.imageHeight = this.$refs.bgImage.clientHeight
    this.maxTranslateY = this.imageHeight - RESERVED_HEIGHT
  },
  methods: {
    goBack () {
      this.$router.back()
    },
    onScroll (pos) {
      this.scrollY = -pos.y
    },
    // 点击音乐播放
    selectItem ({ song, index }) {
      this.selectPlay({
        list: this.songs,
        index
      })
    },
    // 随机播放全部
    random () {
      this.randomPlay(this.songs)
    },
    ...mapActions([
      'selectPlay',
      'randomPlay'
    ])
  }
}
</script>

<style lang="scss" scoped>
.music_list{
  // position: relative;
  // height: 100%;
  .header{
    width: 100%;
    height: 44px;
    color: #fff;
    position: fixed;
    top: 0;
    z-index: 100;
    .back{
      position: absolute;
      top: 0;
      left: 4px;
      .fa-angle-left {
        padding: 5px 10px;
        font-size: 30px;
      }
    }
    .text {
      .title{
        position: absolute;
        left: 38px;
        line-height: 44px;
        font-size: $font-size-medium-x;
      }
      .list-title{
        width: 70%;
        overflow: hidden;
        white-space:nowrap;
        text-overflow:ellipsis;
        position: absolute;
        right: 14px;
        line-height: 44px;
        // font-weight: bold;
        font-size: $font-size-large-s;
      }
    }
  }
  .bg_image{
    // filter: blur(3px);
    width: 100%;
    // height: 0;
    position: relative;
    // padding-top: 70%;
    transform-origin: top;
    background-size: cover;
    // background-position: 0 30%;
    .text{
      width: 80%;
      height: 20px;
      position: absolute;
      bottom: 20px;
      left: 20px;
      color: #fff;
      .list-title{
        font-size: $font-size-large-s;
        line-height: 18px;
        font-weight: bold;
        letter-spacing: 1px;
        position: absolute;
        bottom: 0;
      }
    }
    .filter{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.1);
    }
  }
  .list{
    width: 100%;
    position: absolute;
    // top: 0;
    bottom: 0;
    z-index: 0;
    // overflow: hidden;
    .music_list_wrapper{
      position: relative;
      border-radius: 10px;
      top:-10px;
      padding: 40px 0 20px 0;
      // background: pink;
      background: $color-background;
      .sequence_play{
        width: 100%;
        height: 40px;
        padding-left: 16px;
        border-bottom: 1px solid rgb(228, 228, 228);
        position: absolute;
        top: 0;
        display: flex;
        align-items: center;
        .iconfont{
          font-size: 18px;
          color: $color-text;
          padding-right: 14px;
        }
        .text{
          font-size: $font-size-medium-x;
        }
        .count{
          font-size: $font-size-medium;
          color: $color-text-g;
        }
      }
    }
  }
}
</style>
