<template>
  <div class="progress_bar" ref="progressBar">
    <div class="bar_inner" @click="onClick">
      <div class="progress" ref="progress" :style="progressStyle"></div>
      <div
        class="progress_btn_wrapper"
        :style="btnStyle"
        @touchstart.prevent="onTouchStart"
        @touchmove.prevent="onTouchMove"
        @touchend.prevent="onTouchEnd"
      >
        <div class="progress_btn"></div>
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
  emits: ['progress-changing', 'progress-changed'],
  computed: {
    progressStyle () {
      return `width: ${this.offset}px`
    },
    btnStyle () {
      return `transform: translate(${this.offset}px, 0)`
    }
  },
  watch: {
    progress (newVal) {
      this.setOffset(newVal)
    }
  },
  data () {
    return {
      offset: 0,
      touch: {}
    }
  },
  methods: {
    setOffset (progress) {
      const barWidth = this.$el.clientWidth - progressBtnWidth // this.$el 是 progress_bar
      this.offset = barWidth * progress
      // console.log(barWidth, progress, this.offset)
    },
    onTouchStart (e) {
      // console.log('onTouchStart', e.touches[0])
      this.touch.x1 = e.touches[0].pageX
      this.touch.beginWidth = this.$refs.progress.clientWidth // 红色进度条-初始宽度
    },
    onTouchMove (e) {
      // console.log('onTouchMove')
      const delta = e.touches[0].pageX - this.touch.x1 // 拿到偏移值
      const tempWidth = this.touch.beginWidth + delta // 移动后红色进度条宽度
      const barWidth = this.$el.clientWidth - progressBtnWidth // 红色进度条最大值
      const progress = Math.min(1, Math.max(tempWidth / barWidth, 0))
      this.offset = barWidth * progress

      this.$emit('progress-changing', progress)
    },
    onTouchEnd (e) {
      // console.log('onTouchEnd')
      const barWidth = this.$el.clientWidth - progressBtnWidth // 红色进度条最大值
      const progress = this.$refs.progress.clientWidth / barWidth
      this.$emit('progress-changed', progress)
    },
    onClick (e) {
      // console.log(this.$el.getBoundingClientRect(), e.pageX)
      const rect = this.$el.getBoundingClientRect()
      const offsetWidth = e.pageX - rect.left // 点击处到刻度0的距离
      const barWidth = this.$el.clientWidth - progressBtnWidth // 红色进度条最大值
      // console.log(offsetWidth)
      const progress = offsetWidth / barWidth
      this.$emit('progress-changed', progress)
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
