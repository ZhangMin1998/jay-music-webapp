<template>
  <div class="mini_player" v-if="!fullScreen && currentSong" @click="showNormalPlayer">
    <div class="cd_wrapper">
      <div ref="cdRef" class="cd">
        <img ref="imageRef" :src="picUrl" :class="cdClass">
      </div>
    </div>
    <div ref="sliderWrapperRef" class="slider_wrapper">
      <div class="slider_group">
        <div class="slider_page" v-for="song in playlist" :key="song.id">
          <h2 class="name">{{ song.name }}</h2>
          <p class="desc">{{ song.ar[0].name }}</p>
        </div>
      </div>
    </div>
    <!-- <div class="text">
      <h2 class="name">{{name}}</h2>
      <p class="desc">{{singer}}</p>
    </div> -->
    <div class="control">
      <progress-circle :radius="32" :progress="progress">
        <i class="fa" :class="miniIcon" @click.stop="togglePlaying"></i>
      </progress-circle>
    </div>
    <!-- <div class="control">
      <i class="iconfont icon-caidan1"></i>
    </div> -->
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
// import { useRoute } from 'vue-router'
import useCd from '@/components/player/use-cd'
import progressCircle from '@/components/player/progress-circle'
import useMiniSlider from '@/components/player/use-mini-slider'

export default {
  name: 'mini_player',
  components: {
    progressCircle
  },
  props: {
    progress: {
      type: Number,
      default: 0
    },
    togglePlaying: Function
  },

  setup () {
    // const route = useRoute()
    const picUrl = ref(null)
    const name = ref(null)
    const singer = ref(null)

    // vuex
    const store = useStore()
    const fullScreen = computed(() => store.state.fullScreen) // 是否全屏
    const currentSong = computed(() => store.getters.currentSong) // 当前歌曲
    const playing = computed(() => store.state.playing)
    const playlist = computed(() => store.state.playlist) // 当前播放列表
    // console.log(currentSong.value)

    const miniIcon = computed(() => {
      return playing.value ? 'fa-stop' : 'fa-play'
    })

    watch(currentSong, (newSong) => {
      if (!newSong.id) {
        return
      }
      picUrl.value = currentSong.value.al.picUrl
      name.value = currentSong.value.name
      singer.value = currentSong.value.ar[0].name
    })

    // hooks
    const { cdRef, imageRef, cdClass } = useCd()
    const { sliderWrapperRef } = useMiniSlider()

    const showNormalPlayer = () => {
      store.commit('setFullScreen', true)
    }

    return {
      picUrl,
      name,
      singer,

      fullScreen,
      currentSong,
      playlist,
      miniIcon,

      cdRef,
      imageRef,
      cdClass,
      sliderWrapperRef,

      showNormalPlayer
    }
  }
}
</script>

<style lang="scss" scoped>
.mini_player{
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 180;
  background: rgba(255, 255, 255, 0.85);
  .cd_wrapper{
    width: 40px;
    height: 40px;
    padding: 0 10px 0 20px;
    // flex: 0 0 40px;
    .cd{
      height: 100%;
      width: 100%;
      img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        &.play {
          animation: rotate 10s linear infinite;
        }
        &.pause {
          animation-play-state: paused;
        }
      }
    }
  }
  .slider_wrapper{
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    // line-height: 20px;
    overflow: hidden;
    .slider_group{
      position: relative;
      overflow: hidden;
      white-space: nowrap;
      .slider_page{
        width: 100%;
        display: inline-block;
        transform: translate3d(0, 0, 0);
        // transform: translate(0, 0);
        backface-visibility: hidden;
        .name{
          @include no-wrap();
          margin-bottom: 2px;
          line-height: 14px;
          font-size: $font-size-medium;
          color: $color-text;
        }
        .desc{
          @include no-wrap();
          font-size: $font-size-small;
          color: $color-text;
        }
      }
    }
  }
  .control{
    width: 30px;
    padding: 0 10px;
    flex: 0 0 30px;
    .icon-play-mini, .icon-pause-mini, .icon-playlist, .iconfont {
      font-size: 30px;
      color: $color-theme-d;
    }
    .fa-play {
      color: $color-theme-d;
      font-size: 14px;
      position: absolute;
      left: 12px;
      top: 8.5px;
    }
    .fa-stop {
      color: $color-theme-d;
      font-size: 12px;
      position: absolute;
      left: 11px;
      top: 10px;
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
