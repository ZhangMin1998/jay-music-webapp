<template>
  <div class="recommend" v-loading:[loadingText]="loading">
    <Scroll class="recommend-content" ref="scroll" :data="playList">
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
          <div class="box">
            <div v-for="item in playList" :key="item.id" class="item-box">
              <div class="icon" @click="selectItem(item)">
                <!-- <div class="gradients"></div> -->
                <img v-lazy="item.picUrl" />
              </div>
              <p class="play-count">
                <i class="fa fa-headphones"></i>
                {{ tranNumber(item.playCount, 2) }}
                <!-- {{Math.floor(item.playCount / 10000) }}万 -->
              </p>
              <div class="text">{{item.name}}</div>
            </div>
          </div>
        </div>
        <div class="recommend-song" ref="recommendSong">
          <h1 class="title" v-show="!loading">推荐歌曲</h1>
          <div class="box">
            <div v-for="item in recommendMusic" :key="item.id" class="item-box">
              <div class="icon">
                <img v-lazy="item.picUrl" />
              </div>
              <div class="text">{{item.name}}</div>
            </div>
          </div>
          <!-- <ul>
            <li class="item" v-for="item in recommendMusic" :key="item.id" @click="selectSong(item)">
              <div class="icon">
                <img v-lazy="item.picUrl">
              </div>
            </li>
          </ul> -->
        </div>
      </div>
    </Scroll>
    <router-view v-slot="{ Component }">
      <transition appear name="slide">
        <component :is="Component" :data="selectedAlbum"/>
      </transition>
    </router-view>
  </div>
</template>

<script>
import { getBannerData, getRecommendList, getRecommendMusic } from '@/api/recommend'
import Slider from '@/base/Slider/Slider.vue'
// import Scroll from '@/base/Scroll/Scroll.vue'
import Scroll from '@/components/wrap-scroll'
import storage from 'good-storage'
import { ALBUM_KEY } from '@/assets/js/constant'

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
      recommendMusic: [],
      loadingText: '正在加载...',
      selectedAlbum: null
    }
  },
  computed: {
    loading () {
      // console.log(!this.banner.length && !this.playList.length)
      return !this.banner.length && !this.playList.length
    }
  },
  async created () {
    await this.getBannerData()
    await this.getRecommendList()
    await this.getRecommendMusic()
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
    // 获取推荐歌曲
    getRecommendMusic () {
      getRecommendMusic().then((res) => {
        console.log('获取推荐歌曲', res)
        if (res.code === 200) {
          this.recommendMusic = res.result.slice(0, 9)
        }
      })
    },
    // 点击轮播图
    selectBanner (item) {
      console.log(item)
    },
    // 点击歌单
    selectItem (item) {
      this.selectedAlbum = item
      storage.session.set(ALBUM_KEY, item)
      this.$router.push({
        path: `/album/${item.id}`
      })
    },
    // 点击推荐歌曲
    selectSong (item) {

    },
    // 数字转换
    tranNumber (num, point) {
      const numStr = num.toString().split('.')[0]
      if (numStr.length < 6) {
        return numStr
      } else if (numStr.length >= 6 && numStr.length <= 8) {
        const decimal = numStr.substring(numStr.length - 4, numStr.length - 4 + point)
        return parseFloat(parseInt(num / 10000) + '.' + decimal) +
          '万'
      } else if (numStr.length > 8) {
        const decimal = numStr.substring(numStr.length - 8, numStr.length - 8 + point)
        return parseFloat(parseInt(num / 100000000) + '.' + decimal) + '亿'
      }
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
          padding-left: 3%;
          font-size: $font-size-medium;
          font-weight: bold;
          color: $color-text;
        }
        .box{
          padding: 0 3px;
          // padding: 0 7px;
          display: flex;
          flex-wrap: wrap;
          // justify-content: space-between;
          justify-content: space-around;
          flex-direction: row;
          .item-box{
            position: relative;
            width: 114px;
            .icon{
              img{
                width: 114px;
                height: 114px;
                border-radius: 4px;
                object-fit: cover;
              }
            }
            .play-count{
              position: absolute;
              top: 5px;
              right: 2px;
              font-size: $font-size-small-s;
              color: $color-text-l
            }
            .text{
              // float: left;
              // height: 40px;
              line-height: 16px;
              text-align: left;
              overflow: hidden;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              text-overflow: ellipsis;
              margin-bottom: 10px;
              font-size: $font-size-small;
            }
          }
        }
      }
      .recommend-song{
        // margin-top: -20px;
        .title {
          height: 65px;
          line-height: 65px;
          text-align: left;
          padding-left: 3%;
          font-size: $font-size-medium;
          font-weight: bold;
          color: $color-text;
        }
        .box{
          padding: 0 3px;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          // flex-direction: row;
          .item-box{
            position: relative;
            width: 114px;
            .icon{
              img{
                width: 114px;
                height: 114px;
                border-radius: 4px;
                object-fit: cover;
              }
            }
            .text{
              // float: left;
              // height: 40px;
              line-height: 16px;
              text-align: center;
              overflow: hidden;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              text-overflow: ellipsis;
              margin-bottom: 10px;
              font-size: $font-size-small;
            }
          }
        }
        // .item{
        //   display: inline-block;
        //   position: relative;
        //   box-sizing: border-box;
        //   width: 33%;
        //   padding: 0 1%;
        //   .icon{
        //     position: relative;
        //     display: inline-block;
        //     width: 100%;
        //     margin-bottom: 5px;
        //     img{
        //       width: 114px;
        //       height: 114px;
        //       border-radius: 4px;
        //       // object-fit: cover;
        //     }
        //   }
        // }
      }
    }
  }
</style>
