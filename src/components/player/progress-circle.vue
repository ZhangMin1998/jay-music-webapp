<template>
  <div class="progress_circle">
    <svg
      :width="radius"
      :height="radius"
      viewBox="0 0 100 100"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        class="progress_background"
        r="50"
        cx="50"
        cy="50"
        fill="transparent"
      />
      <circle
        class="progress_bar"
        r="50"
        cx="50"
        cy="50"
        fill="transparent"
        :stroke-dasharray="dashArray"
        :stroke-dashoffset="dashOffset"
      />
    </svg>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'progress_circle',
  props: {
    radius: {
      type: Number,
      default: 100
    },
    progress: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      dashArray: Math.PI * 50 * 2
    }
  },
  computed: {
    dashOffset () {
      return (1 - this.progress) * this.dashArray
    }
  }
  // watch: {
  //   progress (newVal) {
  //     console.log(newVal)
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.progress_circle{
  position: relative;
  circle {
    stroke-width: 8px;
    transform-origin: center;
    &.progress_background {
      transform: scale(0.9);
      stroke: $color-theme-d;
    }
    &.progress_bar {
      transform: scale(0.9) rotate(-90deg);
      stroke: $color-highlight-background;
    }
  }
}
</style>
