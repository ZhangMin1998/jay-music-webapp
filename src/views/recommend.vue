<template>
  <div class="recommend">
    <Scroll class="recommend-content" ref="scroll" :data="playList" v-loading="loading">
      <!-- Scroll对第一个子元素生效 -->
      <div>
        <div v-show="banner.length" class="decorate"></div>
        <div v-if="banner.length" class="slider-wrapper">
          <slider :banner="banner" @selectBanner="selectBanner">
            <!-- <div v-for="item in banner" :key="item.targetId" @click.stop="selectBanner(item)" class="slide-page">
              <img :src="item.imageUrl" style="object-fit: cover;width: 360px;height: 200px;">
            </div> -->
          </slider>
        </div>
        <div class="recommend-list" ref="recommendList">
          <h1 class="title" v-show="!loading">推荐歌单</h1>
          <ul>
            <li class="item" v-for="item in playList" :key="item.id">
              <div class="icon">
                <img v-lazy="item.picUrl" />
                <!-- <img :src="item.picUrl" alt=""> -->
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Scroll>
    <!-- <scroll class="recommend-content">
      <div>
        <div class="slider-wrapper">
          <div class="slider-content">
            <slider v-if="sliders.length" :sliders="sliders"></slider>
          </div>
        </div>
        <div class="recommend-list">
          <h1 class="list-title" v-show="!loading">热门歌单推荐</h1>
          <ul>
            <li
              v-for="item in albums"
              class="item"
              :key="item.id"
              @click="selectItem(item)"
            >
              <div class="icon">
                <img width="60" height="60" v-lazy="item.pic">
              </div>
              <div class="text">
                <h2 class="name">
                  {{ item.username }}
                </h2>
                <p class="title">
                  {{item.title}}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
    <router-view v-slot="{ Component }">
      <transition appear name="slide">
        <component :is="Component" :data="selectedAlbum"/>
      </transition>
    </router-view> -->
  </div>
</template>

<script>
import { getBannerData, getRecommendList } from '@/api/recommend'
import Slider from '@/base/Slider/Slider.vue'
import Scroll from '@/base/Scroll/Scroll.vue'
// import storage from 'good-storage'
// import { ALBUM_KEY } from '@/assets/js/constant'

export default {
  // eslint-disable-next-line
  name: 'recommend',
  components: {
    Slider,
    Scroll
  },
  data () {
    return {
      banner: [],
      playList: [],
      recommendMusic: []
    }
  },
  computed: {
    loading () {
      // console.log(!this.banner.length && !this.playList.length)
      return !this.banner.length && !this.playList.length
    }
  },
  created () {
    this.getBannerData()
    this.getRecommendList()
  },
  methods: {
    // 获取轮播图
    getBannerData () {
      getBannerData().then((res) => {
        console.log('获取轮播图', res)
        if (res.code === 200) {
          this.banner = res.banners.slice(0, 4)
        }
      })
    },
    // 获取推荐歌单
    getRecommendList () {
      getRecommendList().then((res) => {
        console.log('获取推荐歌单', res)
        if (res.code === 200) {
          this.playList = res.result
        }
      })
    },
    // 点击轮播图
    selectBanner (item) {
      console.log(item)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable";
@import "@/assets/scss/mixin";
  .recommend {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
    overflow: scroll;
    .recommend-content {
      width: 100%;
      height: 100%;
      overflow: hidden;
      .decorate {
        position: absolute;
        top: -30vh;
        z-index: -10;
        background: $color-theme;
        width: 100%;
        height: 50vh;
        vertical-align: inherit;
      }
      // 轮播图
      .slider-wrapper {
        width: 96%;
        margin: 0 auto;
        border-radius: 5px;
        overflow: hidden;
        .slider-content {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
        }
      }
      // 推荐歌单
      .recommend-list {
        .title {
          height: 65px;
          line-height: 65px;
          text-align: left;
          padding-left: 1.5%;
          font-size: $font-size-medium;
          font-weight: bold;
          color: $color-text;
        }
        .item {
          display: flex;
          box-sizing: border-box;
          align-items: center;
          padding: 0 20px 20px 20px;

          .icon {
            flex: 0 0 60px;
            width: 60px;
            padding-right: 20px;
            img {
              width: 100%;
              height: 100%;
              border-radius: 3px;
            }
          }
          .text {
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex: 1;
            line-height: 20px;
            overflow: hidden;
            font-size: $font-size-medium;
          }
          .name {
            margin-bottom: 10px;
            color: $color-text;
          }
          .title {
            color: $color-text-d;
          }
        }
      }
    }
  }
</style>
