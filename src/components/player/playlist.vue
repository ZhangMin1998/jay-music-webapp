<template>
  <div class="playlist">
    <div class="list_wrapper">
      <div class="list_header">
        <h1 class="title">
          <i class="iconfont"></i>
          <span class="text"></span>
          <span class="clear">
            <i class="icon-clear"></i>
          </span>
        </h1>
      </div>
    </div>
    <scroll ref="scrollRef" class="list_content"></scroll>
  </div>
</template>

<script>
import Scroll from '@/base/Scroll/Scroll'

export default {
  name: 'playlist',
  components: {
    Scroll
  },
  setup () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.playlist{
  .list_wrapper{
    .list_header{
      .title{
        .iconfont{

        }
        .text{

        }
        .clear{
          .icon-clear{

          }
        }
      }
    }
  }
  .list_content{

  }
}
</style>
