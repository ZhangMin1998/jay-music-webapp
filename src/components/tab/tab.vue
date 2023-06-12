<template>
  <div class="tab">
    <router-link
      class="tab-item"
      v-for="tab in tabs"
      :key="tab.path"
      :to="tab.path"
    >
      <span class="tab-link">
        {{tab.name}}
      </span>
    </router-link>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line
  name: 'tab',
  data () {
    return {
      tabs: [
        {
          name: '推荐',
          path: '/recommend'
        },
        {
          name: '歌手',
          path: '/singer'
        },
        {
          name: '排行',
          path: '/top-list'
        },
        {
          name: '搜索',
          path: '/search'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .tab {
    display: flex;
    height: 44px;
    line-height: 44px;
    font-size: $font-size-medium;
    background: $color-theme;

    .tab-item {
      flex: 1;
      text-align: center;

      .tab-link {
        padding: 6px;
        color: $color-text-lm;
      }

      &.router-link-active {
        .tab-link {
          color: $color-text-l;
          border-bottom: 2px solid $color-text-l;
        }
      }
    }
  }
</style>
