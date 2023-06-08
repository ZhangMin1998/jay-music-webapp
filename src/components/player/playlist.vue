<template>
  <div class="playlist" v-show="visible && playlist.length" @click="hide">
    <div class="list_wrapper">
      <div class="list_header">
        <h1 class="title">
          <i class="iconfont" :class="modeIcon" @click.stop="changeMode"></i>
          <span class="text" @click.stop="changeMode">
            {{ modeText }}{{ '(' + playlist.length + ')' }}
          </span>
          <span class="clear">
            <i class="icon-clear"></i>
          </span>
        </h1>
      </div>
      <scroll ref="scrollRef" class="list_content">
        <transition-group ref="listRef" name="list" tag="ul">
          <li
            class="item"
            ref="listItem"
            v-for="song in sequenceList"
            :key="song.id"
            @click="selectItem(song)"
          >
            <i class="current fa" :class="getCurrentIcon(song)"></i>
            <span class="text">{{ song.name }}</span>
            <span class="favorite" @click="toggleFavorite(song)">
              <i class="iconfont" :class="getFavoriteIcon(song)"></i>
            </span>
          </li>
        </transition-group>
      </scroll>
      <div class="list_close" @click.stop="hide">
        <span>关闭</span>
      </div>
    </div>
  </div>
</template>

<script>
import Scroll from '@/base/Scroll/Scroll'
import { useStore } from 'vuex'
import { ref, computed, nextTick } from 'vue'
import useMode from './use-mode'
import useFavorite from './use-favorite'

export default {
  name: 'playlist',
  components: {
    Scroll
  },
  setup () {
    const visible = ref(false)
    const scrollRef = ref(null)

    // vuex
    const store = useStore()
    const playlist = computed(() => store.state.playlist) // 真实播放列表
    const sequenceList = computed(() => store.state.sequenceList) // 顺序播放列表
    const currentSong = computed(() => store.getters.currentSong)

    const { modeIcon, modeText, changeMode } = useMode()
    const { getFavoriteIcon, toggleFavorite } = useFavorite()

    const hide = () => {
      visible.value = false
    }
    const show = async () => {
      visible.value = true
      await nextTick() // 解决列表不能滚动的问题 scroll初始化实例的时候 页面还没加载
      refreshScroll()
    }

    const selectItem = () => {

    }
    const getCurrentIcon = (song) => {
      if (song.id === currentSong.value.id) {
        return 'fa-volume-up'
      }
    }

    const refreshScroll = () => {
      scrollRef.value.scroll.refresh()
    }

    return {
      visible,
      scrollRef,
      playlist,
      sequenceList,

      // mode
      modeIcon,
      modeText,
      changeMode,

      // favorite
      getFavoriteIcon,
      toggleFavorite,

      hide,
      show,
      selectItem,
      getCurrentIcon,
      refreshScroll
    }
  }
}
</script>

<style lang="scss" scoped>
.playlist{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 200;
  background-color: rgba(0, 0, 0, 0.3);
  .list_wrapper{
    position: absolute;
    left: 0;
    bottom: 0;
    // z-index: 210;
    width: 100%;
    border-radius: 8px;
    background-color: $color-background;
    .list_header{
      position: relative;
      padding: 20px 30px 20px 20px;
      .title{
        display: flex;
        align-items: center;
        .iconfont{
          margin-right: 10px;
          font-size: 20px;
          color: $color-text-g;
        }
        .text{
          flex: 1;
          font-size: $font-size-medium;
          color: $color-text;
        }
        .clear{
          .icon-clear {
            font-size: $font-size-medium;
            color: $color-text-g;
          }
        }
      }
    }
    .list_content{
      max-height: 240px;
      overflow: hidden;
      .item{
        display: flex;
        align-items: center;
        height: 40px;
        padding: 0 30px 0 20px;
        overflow: hidden;
        &.list-enter-active, &.list-leave-active {
          transition: all 0.1s;
        }
        &.list-enter, &.list-leave-to {
          height: 0;
        }
        .fa-volume-up {
          color: $color-theme;
          margin-right: 5px;
        }
        .text{
          flex: 1;
          line-height: 20px;
          font-size: $font-size-medium;
          color: $color-text;
          // @include no-wrap();
        }
        .favorite{
          .icon-like {
            color: $color-sub-theme;
          }
        }
      }
    }
    .list_close{
      line-height: 50px;
      text-align: center;
      background: $color-background;
      font-size: $font-size-medium-x;
      color: $color-text;
    }
  }
}
</style>
