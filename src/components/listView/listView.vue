<template>
  <Scroll class="listView" ref="listView" :probeType="3">
    <div>
      <ul>
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
      <div class="list-shortcut">
        <ul>
          <li v-for="(item, index) in shortcutList" :key="index" class="item">{{ item }}</li>
        </ul>
      </div>
    </div>
  </Scroll>
</template>

<script>
import Scroll from '@/base/Scroll/Scroll.vue'

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
  data () {
    return {

    }
  },
  created () {

  },
  mounted () {

  },
  methods: {

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
    .list-group-title{
      height: 20px;
      line-height: 20px;
      padding-left: 12px;
      margin-bottom: 10px;
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
        border-radius: 4px;
      }
      .name {
        margin-left: 20px;
        color: $color-text;
        font-size: $font-size-medium;
      }
    }
  }
  .list-shortcut{
    .item{

    }
  }
}
</style>
