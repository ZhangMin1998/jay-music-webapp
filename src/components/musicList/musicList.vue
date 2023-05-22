<template>
  <div class="music_list">
    <div class="header">
      <div class="back" @click="goBack">
        <i class="fa fa-angle-left"></i>
      </div>
      <div class="text">
        <h1 class="title">{{ headerTitle }}</h1>
      </div>
    </div>
    <Scroll class="list"
      ref="list"
      :probe-type="3"
      :data="songs"
    >
      <div class="music_list_wrapper">
        <div class="bg_image" :style="bgStyle" ref="bgImage"></div>
        <SongList :songs="songs"></SongList>
      </div>
    </Scroll>
  </div>
</template>

<script>
import Scroll from '@/base/Scroll/Scroll'
import SongList from '@/base/SongList/SongList'

export default {
  name: 'music_list',
  components: {
    Scroll,
    SongList
  },
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
    }
  },
  data () {
    return {

    }
  },
  methods: {
    goBack () {
      this.$router.back()
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
      position: absolute;
      left: 38px;
      line-height: 44px;
      font-size: $font-size-medium-x;
      // @include no-wrap()
    }
  }
  .list{
    width: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    background: $color-background;
    .music_list_wrapper{
      .bg_image{
        width: 100%;
        height: 0;
        position: relative;
        padding-top: 75%;
        transform-origin: top;
        background-size: cover;
        background-position: 0 30%;
      }
    }
  }
}
</style>
