<template>
  <div class="player">
    <div class="normal_player" v-show="fullScreen">
      <div class="background">
        <div class="filter"></div>
        <img :src="currentSong.al.picUrl"/>
      </div>
      <div class="top">
        <div class="back">
          <!-- <i class="icon-back"></i> -->
          <i class="fa fa-angle-down"></i>
        </div>
        <h1 class="title">{{ currentSong.name }}</h1>
        <h2 class="subtitle">{{ currentSong.al.name }}</h2>
      </div>
    </div>
    <audio src=""></audio>
  </div>
</template>

<script>
import { getSongsUrl } from '@/api/singer'
import { useStore } from 'vuex'
import { computed, watch } from 'vue'

export default {
  name: 'p-layer',
  components: {

  },
  setup () {
    // vuex
    const store = useStore()
    const fullScreen = computed(() => store.state.fullScreen)
    const currentSong = computed(() => store.getters.currentSong)
    console.log(currentSong.value)

    // watch
    watch(currentSong, (newVal) => {
      if (!newVal.id) return
      getUrl(newVal.id)
    })

    const getUrl = (id) => {
      getSongsUrl(id).then(res => {
        if (res.code === 200) {
          console.log(res.data)
        }
      })
    }

    return {
      // vuex
      fullScreen,
      currentSong,

      getUrl
    }
  }
}
</script>

<style lang="scss" scoped>
.player{
  .normal_player{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 150;
    background: $color-background;
    .background{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.6;
      filter: blur(30px);
      .filter {
        position: absolute;
        width: 100%;
        height: 100%;
        background: black;
        opacity: 0.5;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    .top{
      position: relative;
      margin-bottom: 25px;
      .back{
        position: absolute;
        top: 0;
        left: 6px;
        z-index: 50;
        .icon-back {
          display: block;
          padding: 9px;
          font-size: $font-size-large-x;
          color: $color-theme;
          transform: rotate(-90deg);
        }
        .fa-angle-down {
          display: block;
          padding: 5px 9px;
          font-size: 35px;
          color: $color-theme-l;
        }
      }
      .title{
        width: 70%;
        margin: 0 auto;
        line-height: 30px;
        text-align: center;
        @include no-wrap();
        font-size: $font-size-large;
        // color: $color-text;
        color: $color-theme-l;
      }
      .subtitle{
        line-height: 20px;
        text-align: center;
        font-size: $font-size-medium;
        // color: $color-text;
        color: $color-theme-l;
      }
    }
  }
}
</style>
