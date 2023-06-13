<template>
  <div class="top_list" v-loading="loading">
    <scroll class="top_list_content">
      <ul>
        <li
          class="item"
          v-for="item in topList"
          :key="item.id"
          @click="selectItem(item)"
        >
          <div class="icon">
            <img
              width="100"
              height="100"
              v-lazy="item.coverImgUrl"
            />
          </div>
          <ul class="song_list">
            <li
              class="song"
              v-for="(song, index) in item.tracks"
              :key="index">
              <span>{{index + 1}}. </span>
              <span>{{song.first}}-{{song.second}}</span>
            </li>
          </ul>
        </li>
      </ul>
    </scroll>
    <!-- <router-view></router-view> -->
    <router-view v-slot="{ Component }">
      <transition appear name="slide">
        <component :is="Component" :data="selectedTop"/>
      </transition>
    </router-view>
  </div>
</template>

<script>
import Scroll from '@/components/wrap-scroll'
import { getTopList } from '@/api/top-list'
import { TOP_KEY } from '@/assets/js/constant'
import storage from 'good-storage'

export default {
  name: 'top-list',
  components: {
    Scroll
  },
  data () {
    return {
      topList: [],
      loading: true,
      selectedTop: null
    }
  },
  async created () {
    const result = await getTopList()
    // console.log(result)
    this.topList = result.list
    // result.list.forEach(item => {
    //   if (item.tracks.length) {
    //     this.topList.push(item)
    //   }
    // })
    this.loading = false
  },
  methods: {
    // 点击排行榜列表
    selectItem (top) {
      this.selectedTop = top
      storage.session.set(TOP_KEY, top) // 解决刷新后无数据的问题
      this.$router.push({
        path: `/top-list/${top.id}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .top_list {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
    .top_list_content {
      height: 100%;
      // padding-top: 5px;
      overflow: hidden;
      .item {
        display: flex;
        margin: 0 20px;
        padding-top: 20px;
        // margin: 0 10px;
        // padding: 3px 0;
        height: 100px;
        &:last-child {
          padding-bottom: 20px;
        }
        .icon {
          flex: 0 0 100px;
          width: 100px;
          height: 100px;
          img {
            border-radius: 4px;
          }
        }
        .song_list {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 20px;
          height: 100px;
          overflow: hidden;
          background: $color-dialog-background;
          color: $color-text;
          font-size: $font-size-small-x;
          .song {
            @include no-wrap();
            line-height: 26px;
          }
        }
      }
    }
  }
</style>
