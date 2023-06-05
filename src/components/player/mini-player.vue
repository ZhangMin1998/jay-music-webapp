<template>
  <div class="mini_player" v-show="!fullScreen" @click="showNormalPlayer">
    <div class="cd_wrapper">
      <div ref="cdRef" class="cd">
        <img ref="imageRef" :src="currentSong.al.picUrl" :class="cdClass">
      </div>
    </div>
    <div class="text">
      <h2 class="name">{{currentSong.name}}</h2>
      <p class="desc">{{currentSong.ar[0].name}}</p>
    </div>
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
import { computed } from 'vue'
import { useStore } from 'vuex'
// import { useRoute } from 'vue-router'
import useCd from '@/components/player/use-cd'
import progressCircle from '@/components/player/progress-circle'

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

    // vuex
    const store = useStore()
    const fullScreen = computed(() => store.state.fullScreen) // 是否全屏
    const currentSong = computed(() => store.getters.currentSong) // 当前歌曲
    const playing = computed(() => store.state.playing)

    const miniIcon = computed(() => {
      return playing.value ? 'fa-stop' : 'fa-play'
    })

    // hooks
    const { cdRef, imageRef, cdClass } = useCd()

    const showNormalPlayer = () => {
      store.commit('setFullScreen', true)
    }

    return {
      fullScreen,
      currentSong,
      miniIcon,

      cdRef,
      imageRef,
      cdClass,

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
  .text{
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    overflow: hidden;
    .name{
      margin-bottom: 2px;
      line-height: 14px;
      font-size: $font-size-medium;
      color: $color-text;
    }
    .desc{
      font-size: $font-size-small;
      color: $color-text;
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
