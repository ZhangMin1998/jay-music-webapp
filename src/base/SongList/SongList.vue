<template>
  <div class="song_list">
    <ul>
      <li v-for="(item, index) in songs" :key="index" class="item" @click="selectItem(item, index)">
        <div class="rank" v-if="rank">
          <span :class="getRankCls(index)">{{ getRankText(index) }}</span>
        </div>
        <p class="count" v-else>{{index + 1}}</p>
        <div class="content">
          <h2 class="name">{{ item.name }}</h2>
          <!-- <p class="desc">{{ this.alias }}</p> -->
          <p class="desc">{{ item.al.name }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'song_list',
  props: {
    songs: {
      type: Array,
      default: () => []
    },
    rank: {
      type: Boolean,
      default: false
    }
  },
  // inject: ['alias'],
  emits: ['select'],
  data () {
    return {
      // getDesc (item) {
      //   if (item.aliaName) {
      //     return `${item.singer} - ${item.aliaName}`
      //   } else {
      //     return `${item.singer}`
      //   }
      // }
    }
  },
  methods: {
    selectItem (item, index) {
      this.$emit('select', { item, index })
    },
    getRankText (index) {
      if (index > 2) {
        return index + 1
      }
    },
    getRankCls (index) {
      if (index <= 2) {
        return `icon icon${index}`
      } else {
        return 'text'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable";
@import "@/assets/scss/mixin";
.song_list{
  .item{
    height: 60px;
    position: relative;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    border-bottom: 1px solid rgb(228, 228, 228);
    .count{
      width: 50px;
      flex: 0 0 50px;
      text-align: center;
      color: $color-text-g;
    }
    .rank {
      width: 50px;
      // flex: 0 0 50px;
      // margin-right: 20px;
      text-align: center;
      .icon {
        display: inline-block;
        width: 25px;
        height: 24px;
        background-size: 25px 24px;
        &.icon0 {
          @include bg-image('first');
        }
        &.icon1 {
          @include bg-image('second');
        }
        &.icon2 {
          @include bg-image('third');
        }
      }
      .text {
        color: $color-text-g;
        // font-size: $font-size-large;
      }
    }
    .content{
      flex: 1;
      line-height: 20px;
      overflow: hidden;
      .name{
        margin-top: 4px;
        width: 80%;
        @include no-wrap();
        color: $color-text;
      }
      .desc{
        @include no-wrap();
        width: 80%;
        font-size: 12px;
        color: $color-text-g;
      }
    }
  }
}
</style>
