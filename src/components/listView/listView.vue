<template>
  <Scroll class="listView" ref="listView" :probeType="3" @scroll="onScroll">
    <ul ref="groupRef">
      <li v-for="(group, index) in singerList" :key="index" ref="listGroup" class="listGroup">
        <h2 class="list-group-title">{{ group.title }}</h2>
        <ul>
          <li class="list-group-item" v-for="item in group.items" :key="item.id">
            <img v-lazy="item.avatar" class="avatar">
            <span class="name">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div
      class="fixed"
      v-show="fixedTitle"
      :style="fixedStyle"
    >
      <div class="fixed-title">{{fixedTitle}}</div>
    </div>
    <div class="list-shortcut">
      <ul>
        <li v-for="(item, index) in shortcutList" :key="index" class="item">{{ item }}</li>
      </ul>
    </div>
  </Scroll>
</template>

<script>
import Scroll from '@/base/Scroll/Scroll.vue'
import useFixed from '@/components/listView/use-fixed'

export default {
  components: {
    Scroll
  },
  props: {
    singerList: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    shortcutList () {
      return this.singerList.map((group) => {
        return group.title.substr(0, 1)
      })
    }
    // fixedTitle () {
    //   if (this.scrollY > 0) {
    //     return ''
    //   }
    //   return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
    // }
  },
  setup (props) {
    const { groupRef, onScroll, fixedTitle, fixedStyle } = useFixed(props)

    return {
      groupRef,
      onScroll, // 暴露出来后useFixed里面才会执行
      fixedTitle,
      fixedStyle
    }
  },
  data () {
    return {

    }
  },
  created () {

  },
  mounted () {

  },
  methods: {
    // onScroll (pos) {
    //   console.log(666)
    //   // console.log(pos)
    //   // this.scrollY = pos.y
    // }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable";
.listView{
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $color-background;
  .listGroup{
    padding-bottom: 5px;
    .list-group-title{
      height: 30px;
      line-height: 30px;
      padding-left: 12px;
      // margin-bottom: 10px;
      font-size: $font-size-small;
      color: #fff;
      background:rgba(0, 0, 0, 0.1);
    }
    .list-group-item{
      display: flex;
      align-items: center;
      padding: 5px 0;
      margin: 0 5px;
      border-bottom: 1px solid rgb(228, 228, 228);
      &:last-child {
        border: none;
        margin-bottom: 10px;
      }
      .avatar{
        width: 50px;
        height: 50px;
        // border-radius: 4px;
        border-radius: 50%;
      }
      .name {
        margin-left: 20px;
        color: $color-text;
        font-size: $font-size-medium;
      }
    }
  }
  .fixed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    .fixed-title {
      height: 30px;
      line-height: 30px;
      padding-left: 12px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
  }
  .list-shortcut{
    width: 20px;
    position: absolute;
    z-index: 99;
    right: 3px;
    top: 50%;
    transform: translateY(-50%);
    padding: 200px 0;
    border-radius: 4px;
    text-align: center;
    font-family:Helvetica;
    .item{
      padding: 4px;
      line-height: 1;
      color: $color-text-g;
      font-size: $font-size-small;
      font-weight: bold;
      &.current {
        color: $color-theme;
      }
    }
  }
}
</style>
