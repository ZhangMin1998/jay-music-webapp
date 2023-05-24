<template>
  <div class="song_list">
    <ul>
      <li v-for="(item, index) in songs" :key="index" class="item" @click="selectItem(item, index)">
        <p class="count">{{index + 1}}</p>
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
    }
  },
  inject: ['alias'],
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
