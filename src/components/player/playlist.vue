<template>
  <div class="play_list" v-show="visible && playlist.length" @click.stop="hide">
    <div class="list_wrapper" @click.stop>
      <div class="list_header">
        <div class="title">
          <div class="left" @click="changeMode">
            <i class="iconfont" :class="modeIcon"></i>
            <span class="text">
              {{ modeText }}{{ '(' + playlist.length + ')' }}
            </span>
          </div>
          <div class="right">
            <span class="clear">
              <i class="icon-clear"></i>
            </span>
          </div>
        </div>
      </div>
      <scroll ref="scrollRef" class="list_content">
        <transition-group ref="listRef" name="list" tag="ul">
        <!-- <ul ref="listRef"> -->
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
            <span class="delete" @click.stop="removeSong(song)">
              <i class="icon-delete"></i>
            </span>
          </li>
        <!-- </ul> -->
        </transition-group>
      </scroll>
      <div class="list_close" :class="{'disable': removing}" @click.stop="hide">
        <span>关闭</span>
      </div>
    </div>
  </div>
</template>

<script>
import Scroll from '@/base/Scroll/Scroll'
import { useStore } from 'vuex'
import { ref, computed, watch, nextTick } from 'vue'
import useMode from './use-mode'
import useFavorite from './use-favorite'

export default {
  name: 'play_list',
  components: {
    Scroll
  },
  setup () {
    const visible = ref(false)
    const scrollRef = ref(null)
    const listRef = ref(null)
    const removing = ref(false)

    // vuex
    const store = useStore()
    const playlist = computed(() => store.state.playlist) // 真实播放列表
    const sequenceList = computed(() => store.state.sequenceList) // 顺序播放列表
    const currentSong = computed(() => store.getters.currentSong)

    const { modeIcon, modeText, changeMode } = useMode()
    const { getFavoriteIcon, toggleFavorite } = useFavorite()

    // watch
    watch(currentSong, async newSong => {
      if (!visible.value || !newSong.id) return
      await nextTick()
      scrollToCurrent() // 只要歌曲变化 就滚动到当前播放歌曲
    })

    const hide = () => {
      visible.value = false
    }
    const show = async () => {
      visible.value = true
      await nextTick() // 解决列表不能滚动的问题 scroll初始化实例的时候 页面还没加载
      refreshScroll()
      scrollToCurrent()
      // console.log(listRef.value)
    }

    // 点击歌曲切歌
    const selectItem = (song) => {
      const index = playlist.value.findIndex(item => {
        return song.id === item.id
      })
      if (index === -1) return
      store.commit('setCurrentIndex', index)
      store.commit('setPlayingState', true)
    }
    const getCurrentIcon = (song) => {
      if (song.id === currentSong.value.id) {
        return 'fa-volume-up'
      }
    }

    const refreshScroll = () => {
      scrollRef.value.scroll.refresh()
    }

    // 跳转到当前播放歌曲
    const scrollToCurrent = () => {
      const index = sequenceList.value.findIndex(song => {
        return song.id === currentSong.value.id
      })
      if (index === -1) return
      // console.log(listRef.value)
      const target = listRef.value.$el.children[index]
      scrollRef.value.scroll.scrollToElement(target, 300)
    }

    // 删除歌曲
    const removeSong = song => {
      if (removing.value) return // 防止多次点击 会报错

      removing.value = true
      store.dispatch('removeSong', song)

      setTimeout(() => { // 因为list动画就是300ms
        removing.value = false
      }, 300)
    }

    return {
      visible,
      scrollRef,
      listRef,
      removing,

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
      refreshScroll,
      scrollToCurrent,
      removeSong
    }
  }
}
</script>

<style lang="scss" scoped>
.play_list{
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
        justify-content: space-between;
        .left{
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
        }
        .right{
          .clear{
            .icon-clear {
              font-size: $font-size-medium;
              color: $color-text-g;
            }
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
          margin-right: 15px;
          .icon-like {
            color: $color-sub-theme;
          }
        }
        .delete{
          font-size: $font-size-small;
          color: $color-theme;
          &.disable{
            color: $color-text-g;
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
