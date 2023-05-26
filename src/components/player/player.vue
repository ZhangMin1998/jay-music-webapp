<template>
  <div class="player">
    <div class="normal_player" v-show="fullScreen">
      <div class="background">
        <div class="filter"></div>
        <img :src="currentSong.al.picUrl" v-if="currentSong.al"/>
      </div>
      <!-- top -->
      <div class="top">
        <div class="back" @click="goBack">
          <!-- <i class="icon-back"></i> -->
          <i class="fa fa-angle-down"></i>
        </div>
        <h1 class="title">{{ currentSong.name }}</h1>
        <h2 class="subtitle" v-if="currentSong.al">{{ currentSong.al.name }}</h2>
      </div>
      <!-- bottom -->
      <div class="bottom">
        <div class="progress-bar-wrapper">

        </div>
        <div class="operators">
          <div class="icon i-left" >
            <i class="iconfont mode icon-random"></i>
          </div>
          <div class="icon i-left" :class="disableCls">
            <i class="iconfont icon-prev" @click="prev"></i>
          </div>
          <div class="icon i-center" :class="disableCls">
            <i :class="playIcon" @click="togglePlaying"></i>
            <!-- <i class="iconfont icon-bofangicon"></i> -->
          </div>
          <div class="icon i-right" :class="disableCls">
            <i class="iconfont icon-test" @click="next"></i>
          </div>
          <div class="icon i-right">
            <i class="iconfont icon-like"></i>
          </div>
        </div>
      </div>
    </div>
    <audio
      ref="audioRef"
      @pause="pause"
      @canplay="ready"
      @error="error"
    ></audio>
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
    const songReady = ref(false)
    // vuex
    const store = useStore()
    const fullScreen = computed(() => store.state.fullScreen) // 是否全屏
    const currentSong = computed(() => store.getters.currentSong) // 当前歌曲
    const playing = computed(() => store.state.playing) // 播放状态
    const currentIndex = computed(() => store.state.currentIndex) // 当前播放索引
    const playlist = computed(() => store.state.playlist) // 当前播放列表
    // console.log(currentSong)
    const playIcon = computed(() => {
      return playing.value ? 'iconfont icon-stop' : 'iconfont icon-bofangicon'
    })
    const disableCls = computed(() => {
      return songReady.value ? '' : 'disable'
    })

    // watch
    watch(currentSong, (newVal) => {
      if (!newVal.id) return
      songReady.value = false // 切歌的时候
      getUrl(newVal.id)
    })
    watch(playing, (newVal) => { // 播放 停止
      if (!songReady.value) return
      const audioEl = audioRef.value
      newVal ? audioEl.play() : audioEl.pause()
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

    const togglePlaying = () => { // 点击播放暂停
      if (!songReady.value) return
      store.commit('setPlayingState', !playing.value)
    }

    const pause = () => { // 非人为导致播放暂停，显式修改状态 不然状态混乱
      store.commit('setPlayingState', false)
    }

    const prev = () => {
      const list = playlist.value
      if (!songReady.value || !list.length) return
      if (list.length === 1) {
        // 如果列表只有一首歌，就循环播放
        loop()
      } else {
        let index = currentIndex.value - 1
        if (index === -1) {
          index = list.length - 1
        }
        store.commit('setCurrentIndex', index)
        if (!playing.value) {
          store.commit('setPlayingState', true)
        }
      }
    }

    const next = () => {
      const list = playlist.value
      if (!songReady.value || !list.length) return
      if (list.length === 1) {
        // 如果列表只有一首歌，就循环播放
        loop()
      } else {
        let index = currentIndex.value + 1
        if (index === list.length) {
          index = 0
        }
        store.commit('setCurrentIndex', index)
        if (!playing.value) {
          store.commit('setPlayingState', true)
        }
      }
    }

    const loop = () => {
      const audioEl = audioRef.value
      audioEl.currentTime = 0
      audioEl.play()
      store.commit('setPlayingState', true)
    }

    const ready = () => {
      if (songReady.value) return
      songReady.value = true
    }

    const error = () => { // 有问题也能切换
      songReady.value = true
    }

    return {
      audioRef,
      // vuex
      fullScreen,
      currentSong,
      currentIndex,
      playlist,

      playIcon,
      disableCls,

      getUrl,
      goBack,
      togglePlaying,
      pause,
      prev,
      next,
      ready,
      error
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
      filter: blur(10px);
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
    .bottom{
      position: absolute;
      bottom: 50px;
      width: 100%;
      .progress-wrapper{

      }
      .operators{
        display: flex;
        align-items: center;
        .icon{
          flex: 1;
          color: $color-theme-l;
          &.disable {
            color: $color-theme;
          }
          &.i-left {
            text-align: right;
          }
          &.i-center {
            padding: 0 20px;
            text-align: center;
            i {
              font-size: 40px;
            }
          }
          &.i-right {
            text-align: left;
          }
          i {
            font-size: 30px;
          }
          .mode {
            font-size: 25px;
          }
          .icon-like {
            color: $color-sub-theme;
          }
        }
      }
    }
  }
}
</style>
