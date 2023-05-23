<template>
  <div class="no-result">
    <div class="no-result-content">
      <div class="no-result-icon">
        <i class="fa fa-music"></i>
      </div>
      <p class="no-result-text">{{title}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'no-result',
  data () {
    return {
      title: '抱歉，没有结果'
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
.no-result{
  position: absolute; // 要求外层为非static
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .no-result-content{
    text-align: center;
    .no-result-icon {
      color: $color-text-gg;
      font-size: 50px;
    }
    .no-result-text {
      margin-top: 30px;
      font-size: $font-size-medium;
      color: $color-text;
    }
  }
}
</style>
