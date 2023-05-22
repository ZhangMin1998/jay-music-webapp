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
    </div>
    <Scroll class="list"
      ref="list"
      v-loading="loading"
      :style="scrollStyle"
      :probe-type="3"
      :data="songs"
      @scroll="onScroll"
    >
      <div class="music_list_wrapper">
        <SongList :songs="songs"></SongList>
      </div>
    </Scroll>
  </div>
</template>

<script>
import Scroll from '@/base/Scroll/Scroll'
import SongList from '@/base/SongList/SongList'

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
    }
  },
  computed: {
    bgImageStyle () {
      const scrollY = this.scrollY
      let zIndex = 0
      let paddingTop = '70%'
      let height = 0
      let backgroundPosition = '0 30%'
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
      return {
        top: `${this.imageHeight}px`
      }
    }
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
    }
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
        position: absolute;
        right: 14px;
        line-height: 44px;
        // font-weight: bold;
        font-size: $font-size-large-s;
      }
    }
  }
  .bg_image{
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
  }
  .list{
    width: 100%;
    position: absolute;
    // top: 0;
    bottom: 0;
    z-index: 0;
    // overflow: hidden;
    .music_list_wrapper{
      background: $color-background;
    }
  }
}
</style>
