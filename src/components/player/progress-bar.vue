<template>
  <div class="progress_bar" ref="progressBar">
    <div class="bar_inner">
      <div class="progress" ref="progress" :style="progressStyle">

      </div>

      <div
        class="progress_btn_wrapper"
        :style="btnStyle"
      >
        <div class="progress_btn">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
const progressBtnWidth = 16

export default {
  name: 'progress_bar',
  props: {
    progress: {
      type: Number, // 0-1
      default: 0
    }
  },
  computed: {
    progressStyle () {
      return `width: ${this.offset}px`
    },
    btnStyle () {
      return `transform: translate(${this.offset}px, 0)`
    }
  },
  watch: {
    progress(newVal) {
      this.setOffset(newVal)
    }
  },
  data () {
    return {
      offset: 0
    }
  },
  methods: {
    setOffset (progress) {
      const barWidth = this.$el.clientWidth - progressBtnWidth // this.$el 是 progress_bar
      this.offset = barWidth * progress
    }
  }
}
</script>

<style lang="scss" scoped>
.progress_bar{
  height: 30px;
  .bar_inner{
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0, 0, 0, 0.3);
    .progress{
      position: absolute;
      height: 100%;
      background: $color-theme;
    }
    .progress_btn_wrapper{
      position: absolute;
      left: -8px;
      top: -13px;
      width: 30px;
      height: 30px;
     .progress_btn{
      position: relative;
      top: 7px;
      left: 7px;
      box-sizing: border-box;
      width: 16px;
      height: 16px;
      border: 5px solid $color-theme-l;
      border-radius: 50%;
      background: $color-theme;
     }
    }
  }
}
</style>
