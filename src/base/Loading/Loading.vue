<template>
  <div class="loading">
    <div class="loading-content">
      <img src="./loading.gif" width="24" height="24" />
      <p class="desc">{{title}}</p>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line
  name: 'loading',
  props: {
    // title: {
    //   type: String,
    //   default: '正在加载'
    // }
  },
  data () {
    return {
      title: '正在加载...'
    }
  },
  methods: {
    setTitle (title) {
      this.title = title
    }
  }
}
</script>

<style lang="scss" scoped>
.loading{
  position: absolute; // 要求外层为非static
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  // background: pink;
  .loading-content{
    text-align: center;
    img{
      margin-top: 1px;
    }
    .desc{
      line-height: 20px;
      font-size: $font-size-small;
      color: $color-sub-theme;
    }
  }
}
</style>
