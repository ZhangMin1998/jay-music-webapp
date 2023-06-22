<template>
  <div class="search_list">
    <transition-group name="list2" tag="ul">
      <li
        v-for="(item, index) in searchList"
        :key="index"
        class="search_item"
        @click="selectItem(item)"
      >
        <span class="text">{{ item }}</span>
        <span class="icon" @click.stop="deleteOne(item)">
          <i class="icon-delete"></i>
        </span>
      </li>
    </transition-group>
  </div>
</template>

<script>
  export default {
    name: "search_list",
    props: {
      searchList: {
        type: Array,
        default: () => []
      }
    },
    emits: ['select', 'delete'],
    methods: {
      deleteOne (item) {
        this.$emit('delete', item)
      },
      selectItem (item) {
        this.$emit('select', item)
      }
    }
  }
</script>

<style lang="scss" scoped>
.search_list{

  .list2-move,
  .list2-enter-active,
  .list2-leave-active {
    transition: all 0.3s;
  }

  .list2-enter-from,
  .list2-leave-to {
    height: 0;
  }
  .search_item{
    height: 35px;
    display: flex;
    align-items: center;
    overflow: hidden;
    font-size: 14px;
    // justify-content: space-between;
    .text{
      flex: 1;
      color: $color-text;
    }
    .icon{
      .icon-delete {
        font-size: $font-size-small;
        color: $color-text;
      }
    }
  }
}
</style>
