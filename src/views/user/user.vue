<template>
  <transition name="slide">
    <div class="user">
      <div class="back">
        <i class="fa fa-angle-left" @click="goBack"></i>
      </div>
      <div class="switches_wrapper">
        <switches :switches="switches" v-model="currentIndex"></switches>
      </div>
    </div>
  </transition>
</template>

<script>
import switches from '@/base/switches/switches'

export default {
  name: 'user-center',
  components: {
    switches
  },
  computed: {

  },
  data () {
    return {
      switches: [
        { name: '我的收藏' },
        { name: '最近播放' }
      ],
      currentIndex: 0
    }
  },
  methods: {
    goBack () {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
.user{
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 100;
  width: 100%;
  background: $color-background;
  .back {
    position: absolute;
    top: 0;
    left: 4px;
    .fa-angle-left {
      padding: 5px 10px;
      font-size: 30px;
      color: #fff;
    }
  }
  .switches_wrapper {
    display: flex;
    align-items: center;
    background: $color-theme;
    height: 44px;
  }
}
</style>
