<template>
  <div class="player" v-show="playlist.length">
    <transition name="normal">
      <div class="normal_player" v-show="fullScreen">

        <div class="background">
          <div class="filter"></div>
          <img :src="currentSongPicUrl" v-if="currentSong.al"/>
        </div>

        <!-- top -->
        <div class="top">
          <div class="back" @click="goBack">
            <i class="fa fa-angle-down"></i>
          </div>
          <h1 class="title">{{ currentSong.name }}</h1>
          <h2 class="subtitle" v-if="currentSong.al">{{ currentSong.al.name }}</h2>
        </div>

        <!-- middle -->
        <div
          class="middle"
          @touchstart.prevent="onMiddleTouchStart"
          @touchmove.prevent="onMiddleTouchMove"
          @touchend.prevent="onMiddleTouchEnd"
        >
          <div class="middle_l" :style="middleLStyle">
            <div class="cd_wrapper">
              <div ref="cdRef" class="cd" :class="cdClass">
                <img class="image" ref="imageRef" :src="currentSongPicUrl" />
              </div>
            </div>
            <div class="playing_lyric_wrapper">
              <div class="play_lyric">
                {{ playingLyric }}
              </div>
            </div>
          </div>
          <scroll ref="lyricScrollRef" class="middle_r" :style="middleRStyle">
            <div class="lyric_wrapper">
              <div ref="lyricListRef" v-if="currentLyric">
                <p
                  class="text"
                  :class="{ 'current': currentLineNum === index }"
                  v-for="(line, index) in currentLyric.lines"
                  :key="index"
                >
                  {{line.txt}}
                </p>
              </div>
              <div class="pure-music" v-show="pureMusicLyric">
                <p>{{ pureMusicLyric }}</p>
              </div>
            </div>
          </scroll>
        </div>

        <!-- bottom -->
        <div class="bottom">
          <div class="dot_wrapper">
            <span class="dot" :class="{'active': currentShow === 'cd'}"></span>
            <span class="dot" :class="{'active': currentShow === 'lyric'}"></span>
          </div>
          <div class="progress-wrapper">
            <span class="time time_l">{{ formatTime1(currentTime) }}</span>
            <div class="progress_bar_wrapper">
              <progress-bar
                ref="barRef"
                :progress="progress"
                @progress-changing="onProgressChanging"
                @progress-changed="onProgressChanged"
              ></progress-bar>
            </div>
            <span class="time time_r">{{ formatTime2(currentSongTime) }}</span>

          </div>
          <div class="operators">
            <div class="icon i-left" >
              <i class="iconfont mode" :class="modeIcon" @click="changeMode"></i>
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
              <i class="iconfont" :class="getFavoriteIcon(currentSong)" @click="toggleFavorite(currentSong)"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <mini-player :progress="progress" :togglePlaying="togglePlaying"></mini-player>
    <audio
      ref="audioRef"
      @pause="pause"
      @canplay="ready"
      @error="error"
      @timeupdate="updateTime"
      @ended="end"
    ></audio>
  </div>
</template>

<script>
import Scroll from '@/base/Scroll/Scroll'
import { getSongsUrl } from '@/api/singer'
import { useStore } from 'vuex'
import { computed, watch, ref, nextTick } from 'vue'
import { PLAY_MODE } from '@/assets/js/constant'
import useMode from '@/components/player/use-mode'
import useFavorite from '@/components/player/use-favorite'
import progressBar from '@/components/player/progress-bar'
import useCd from '@/components/player/use-cd'
import useLyric from '@/components/player/use-Lyric'
import useMiddleInteractive from '@/components/player/use-middle-interactive'
// import { formatTime } from '@/assets/js/util'

import miniPlayer from '@/components/player/mini-player'

export default {
  name: 'p-layer',
  components: {
    progressBar,
    Scroll,
    miniPlayer
  },
  setup () {
    const audioRef = ref(null)
    const barRef = ref(null)
    const songReady = ref(false)
    const currentTime = ref(0) // 当前歌曲播放时长
    const currentSongTime = ref(0) // 当前歌曲播放总时长
    const currentSongPicUrl = ref('')
    let progressChanging = false

    // vuex
    const store = useStore()
    const fullScreen = computed(() => store.state.fullScreen) // 是否全屏
    const currentSong = computed(() => store.getters.currentSong) // 当前歌曲
    const playing = computed(() => store.state.playing) // 播放状态
    const currentIndex = computed(() => store.state.currentIndex) // 当前播放索引
    const playlist = computed(() => store.state.playlist) // 当前播放列表
    const playMode = computed(() => store.state.playMode)

    // hooks
    const { modeIcon, changeMode } = useMode()
    const { getFavoriteIcon, toggleFavorite } = useFavorite()
    const { cdRef, imageRef, cdClass } = useCd()
    const { currentLyric, currentLineNum, playLyric, stopLyric, lyricScrollRef, lyricListRef, pureMusicLyric, playingLyric } = useLyric({ songReady, currentTime })
    const { currentShow, middleLStyle, middleRStyle, onMiddleTouchStart, onMiddleTouchMove, onMiddleTouchEnd } = useMiddleInteractive()

    // computed
    const playIcon = computed(() => {
      return playing.value ? 'iconfont icon-stop' : 'iconfont icon-bofangicon'
    })
    const disableCls = computed(() => {
      return songReady.value ? '' : 'disable'
    })
    const progress = computed(() => {
      return currentTime.value / (currentSongTime.value / 1000)
    })

    // watch
    watch(currentSong, (newVal) => {
      if (!newVal.id) return
      // console.log(newVal)
      currentTime.value = 0 // 播放时长计为0
      songReady.value = false // 切歌的时候
      getUrl(newVal.id)
    })
    watch(playing, (newVal) => { // 播放 停止
      if (!songReady.value) return
      const audioEl = audioRef.value
      // newVal ? audioEl.play() : audioEl.pause()
      if (newVal) {
        audioEl.play()
        playLyric()
      } else {
        audioEl.pause()
        stopLyric()
      }
    })
    watch(playMode, (newVal) => {
      console.log(newVal)
    })
    watch(fullScreen, async (newFullScreen) => {
      if (newFullScreen) {
        await nextTick()
        barRef.value.setOffset(progress.value)
      }
    })

    // methods
    const getUrl = (id) => {
      getSongsUrl(id).then(res => {
        if (res.code === 200 && res.data.length) {
          // console.log(currentSong)
          // console.log(res.data[0])

          const songData = res.data[0]
          currentSongTime.value = songData.time
          currentSongPicUrl.value = currentSong.value.al.picUrl

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
      playLyric() // 如果歌词先到 songReady未触发  那就等songReady触发后执行
    }

    const error = () => { // 有问题也能切换
      songReady.value = true
    }

    const updateTime = (e) => {
      if (!progressChanging) {
        currentTime.value = e.target.currentTime
      }
    }
    const formatTime1 = (interval) => {
      interval = interval | 0 // 向下取整
      const minute = ((interval / 60 | 0) + '').padStart(2, '0') // 保持2位，不足2位填充0
      let second = interval % 60
      if (second < 10) {
        second = '0' + second
      }
      return minute + ':' + second
    }
    const formatTime2 = (interval) => {
      interval = (interval / 1000) | 0 // 向下取整
      const minute = ((interval / 60 | 0) + '').padStart(2, '0') // 保持2位，不足2位填充0
      let second = interval % 60
      if (second < 10) {
        second = '0' + second
      }
      return minute + ':' + second
    }
    const onProgressChanging = (progress) => {
      progressChanging = true
      currentTime.value = progress * currentSongTime.value / 1000
      // 歌词先动后停
      playLyric()
      stopLyric()
    }
    const onProgressChanged = (progress) => { // 这里真正修改
      progressChanging = false
      audioRef.value.currentTime = currentTime.value = progress * currentSongTime.value / 1000
      // audioRef.value.play()
      if (!playing.value) {
        store.commit('setPlayingState', true)
      }
      playLyric()
    }
    const end = () => {
      currentTime.value = 0
      if (playMode.value === PLAY_MODE.loop) {
        loop()
      } else {
        next()
      }
    }

    return {
      audioRef,
      barRef,
      currentTime,
      currentSongTime,
      currentSongPicUrl,
      // vuex
      fullScreen,
      currentSong,
      currentIndex,
      playlist,

      playIcon,
      disableCls,
      progress,

      modeIcon,
      changeMode,
      getFavoriteIcon,
      toggleFavorite,
      cdRef,
      imageRef,
      cdClass,
      currentLyric,
      currentLineNum,
      lyricScrollRef,
      lyricListRef,
      pureMusicLyric,
      playingLyric,
      currentShow,
      middleLStyle,
      middleRStyle,
      onMiddleTouchStart,
      onMiddleTouchMove,
      onMiddleTouchEnd,

      getUrl,
      goBack,
      togglePlaying,
      pause,
      prev,
      next,
      ready,
      error,
      updateTime,
      formatTime1,
      formatTime2,
      onProgressChanging,
      onProgressChanged,
      end
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
        object-fit: cover;
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
        color: $color-theme-l;
      }
      .subtitle{
        line-height: 20px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme-l;
      }
    }
    .middle{
      width: 100%;
      position: fixed;
      top: 80px;
      bottom: 170px;
      font-size: 0;
      white-space: nowrap;
      // background: pink;
      // display: flex;
      // align-items: center;
      .middle_l{
        // display: none;
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 80%;
        .cd_wrapper {
          position: absolute;
          left: 10%;
          top: 15%;
          width: 80%;
          height: 100%;
          box-sizing: border-box;
          .cd {
            width: 100%;
            height: 100%;
            // box-sizing: border-box;
            // border: 15px solid rgba(255, 255, 255, 0.1);
            // border-radius: 50%;
            &.play {
              animation: rotate 20s linear infinite;
            }
            &.pause {
              animation-play-state: paused;
            }
            .image {
              position: absolute;
              left: 0;
              top: 0;
              width: 90%;
              height: 90%;
              border-radius: 50%;
              border: 15px solid rgba(255, 255, 255, 0.1);
            }
          }
        }
        .playing_lyric_wrapper{
          width: 80%;
          margin: 100px auto 0 auto;
          overflow: hidden;
          text-align: center;
          .play_lyric{
            height: 20px;
            line-height: 20px;
            color: $color-text-ggg;
            font-size: $font-size-medium;
          }
        }
      }
      .middle_r{
        display: inline-block;
        vertical-align: top;
        width: 100%;
        height: 100%;
        overflow: hidden;
        // position: absolute;
        // top: 0;
        .lyric_wrapper{
          width: 80%;
          margin: 0 auto;
          overflow: hidden;
          text-align: center;
          .text{
            line-height: 32px;
            color: $color-text-ggg;
            font-size: $font-size-medium;
            &.current {
              color: #FFF;
            }
          }
          .pure-music{
            padding-top: 50%;
            line-height: 32px;
            color: $color-text-ggg;
            font-size: $font-size-medium;
          }
        }
      }
    }
    .bottom{
      position: absolute;
      bottom: 50px;
      width: 100%;
      .dot_wrapper{
        text-align: center;
        font-size: 0;
        .dot{
          display: inline-block;
          vertical-align: middle;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: $color-text-l;
          margin: 0 4px;
          &.active{
            width: 20px;
            border-radius: 5px;
            background: $color-text-ll;
          }
        }
      }
      .progress-wrapper{
        display: flex;
        align-items: center;
        width: 80%;
        margin: 0 auto;
        padding: 10px 0;
        .time{
          width: 30px;
          line-height: 30px;
          flex: 0 0 30px;
          color: $color-text-l;
          font-size: $font-size-small;
        }
        &.time_l{
          text-align: left;
        }
        &.time_r{
          text-align: right;
          // color: $color-text-gg;
        }
        .progress_bar_wrapper{
          flex: 1;
        }
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
    &.normal-enter-active, &.normal-leave-active {
      transition: all 0.6s;
      .top, .bottom {
        // transition: all 0.6s ease-in-out;
        transition: all 0.6s cubic-bezier(0.45, 0, 0.55, 1);
      }
    }
    &.normal-enter-from, &.normal-leave-to {
      opacity: 0;
      .top {
        transform: translate3d(0, -100px, 0);
      }
      .bottom {
        transform: translate3d(0, 100px, 0)
      }
    }
  }
  @keyframes rotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
