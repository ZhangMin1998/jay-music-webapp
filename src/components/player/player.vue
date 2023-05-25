<template>
  <div class="player">
    <div class="normal_player" v-show="fullScreen">
      <div class="background">
        <div class="filter"></div>
        <img :src="currentSong.al.picUrl" v-if="currentSong.al"/>
      </div>
      <div class="top">
        <div class="back" @click="goBack">
          <!-- <i class="icon-back"></i> -->
          <i class="fa fa-angle-down"></i>
        </div>
        <h1 class="title">{{ currentSong.name }}</h1>
        <h2 class="subtitle" v-if="currentSong.al">{{ currentSong.al.name }}</h2>
      </div>
    </div>
    <audio ref="audioRef" src=""></audio>
  </div>
</template>

<script>
import { getSongsUrl } from '@/api/singer'
import { useStore } from 'vuex'
import { computed, watch, ref } from 'vue'

export default {
  name: 'p-layer',
  components: {

  },
  setup () {
    const audioRef = ref(null)
    // vuex
    const store = useStore()
    const fullScreen = computed(() => store.state.fullScreen)
    const currentSong = computed(() => store.getters.currentSong)
    // console.log(currentSong)

    // watch
    watch(currentSong, (newVal) => {
      if (!newVal.id) return
      getUrl(newVal.id)
    })

    // methods
    const getUrl = (id) => {
      getSongsUrl(id).then(res => {
        if (res.code === 200 && res.data.length) {
          // console.log(currentSong)
          console.log(res.data[0])
          const songData = res.data[0]

          const audioEl = audioRef.value
          audioEl.src = songData.url
          audioEl.play() // 播放
        }
      })
    }

    const goBack = () => {
      store.commit('setFullScreen', false)
    }

    return {
      audioRef,
      // vuex
      fullScreen,
      currentSong,

      getUrl,
      goBack
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
      opacity: 0.7;
      filter: blur(20px);
      .filter {
        position: absolute;
        width: 100%;
        height: 100%;
        background: black;
        opacity: 0.2;
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
