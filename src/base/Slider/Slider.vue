<template>
  <div class="slide-banner">
    <div class="banner-wrapper">
      <div class="slide-banner-wrapper" ref="slide">
        <div class="slide-banner-content" ref="sliderGroup">
          <!-- <slot></slot> -->
          <div v-for="item in banner" :key="item.targetId" class="slide-page" @click.stop="selectBanner(item)">
            <img :src="item.imageUrl" style="object-fit: cover;width: 360px;height: 200px;">
          </div>
          <!-- <div v-for="num in nums" class="slide-page" :class="'page' + num" :key="num">page {{num}}</div> -->
        </div>
      </div>
      <div class="dots-wrapper">
        <span
          class="dot"
          v-for="num in nums"
          :key="num"
          :class="{'active': currentPageIndex === (num - 1)}"></span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'

BScroll.use(Slide)

export default {
  // eslint-disable-next-line
  name: 'Slider',
  props: {
    banner: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      nums: null,
      currentPageIndex: 0
    }
  },
  mounted () {
    setTimeout(() => {
      this.init()
    }, 200)
  },
  beforeUnmount () {
    this.slide.destroy()
  },
  methods: {
    init () {
      this.slide = new BScroll(this.$refs.slide, {
        scrollX: true,
        scrollY: false,
        slide: true,
        momentum: false,
        bounce: false,
        probeType: 3
      })
      this.slide.on('scrollEnd', this.onScrollEnd)

      this.slide.on('slideWillChange', (page) => {
        this.currentPageIndex = page.pageX
      })

      // v2.1.0
      this.slide.on('slidePageChanged', (page) => {
        // console.log('CurrentPage changed to => ', page)
      })
      this.nums = this.banner.length
      // console.log(this.slide)
      // console.log(this.banner)
      // console.log(this.$refs.sliderGroup.children)
    },
    onScrollEnd () {
      // console.log('CurrentPage => ', this.slide.getCurrentPage())
    },
    selectBanner (item) {
      this.$emit('selectBanner', item)
    }
  }
}
</script>

<style lang="scss" scoped>
.slide-banner{
  .banner-wrapper{
    position:relative;
    .slide-banner-wrapper{
      min-height:1px;
      overflow:hidden;
      .slide-banner-content{
        z-index: 999;
        height:200px;
        white-space:nowrap;
        font-size:0;
        .slide-page {
          display:inline-block;
          height:200px;
          width:100%;
          line-height:200px;
          text-align:center;
          font-size:26px;
          // &.page1 {
          //   background-color:#95B8D1;
          // }
          // &.page2 {
          //   background-color:#DDA789;
          // }
          // &.page3 {
          //   background-color:#C3D899;
          // }
          // &.page4 {
          //   background-color:#F2D4A7;
          // }
        }
      }
    }
    .dots-wrapper{
      position:absolute;
      bottom:4px;
      left: 50%;
      transform:translateX(-50%);
      .dot{
        display:inline-block;
        margin:0 4px;
        width:8px;
        height:8px;
        border-radius:50%;
        background:#eee;
        &.active {
          width:20px;
          border-radius:5px;
        }
      }
    }
  }
  .btn-wrap{
    margin-top:20px;
    display:flex;
    justify-content:center;
    button{
      margin: 0 10px;
      padding: 10px;
      color: #fff;
      border-radius: 4px;
      background-color: #666;
    }
  }
}

</style>
