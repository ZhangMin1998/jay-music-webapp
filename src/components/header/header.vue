<template>
  <div class="header">
    <!-- <span class="icon"></span> -->
    <h1 class="text">Jay Music</h1>
    <router-link class="mine" to="/user">
      <i class="icon-mine"></i>
    </router-link>
    <router-link to="/search" class="search">
      <i class="iconfont icon-search"></i>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'm-header'
}
</script>

<style lang="scss" scoped>
  .header {
    height: 44px;
    width: 100%;
    text-align: center;
    background: $color-theme;
    .text {
      display: inline-block;
      vertical-align: top;
      line-height: 44px;
      color: $color-text-l;
      letter-spacing: 3px;
      // font-size: $font-size-large;
    }
    .mine {
      position: absolute;
      top: 0;
      left: 0;
      .icon-mine {
        display: block;
        padding: 12px;
        // font-size: $font-size-large-x;
        color: $color-theme-l;
      }
    }
    .search{
      position: absolute;
      top: 0;
      right: 0;
      .iconfont {
        display: block;
        padding: 12px;
        // font-size: $font-size-large-x;
        color: $color-theme-l;
      }
    }
  }
</style>
