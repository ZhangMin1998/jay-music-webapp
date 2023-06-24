<template>
  <ul class="switches">
    <li
      class="switch_item"
      v-for="(item, index) in switches"
      :key="index"
      :class="{'active': modelValue === index}"
      @click="switchItem(index)"
    >
      <span>{{item.name}}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 's_witches',
  props: {
    switches: {
      type: Array,
      default: () => []
    },
    modelValue: {
      type: Number,
      default: 0
    }
  },
  methods: {
    switchItem (index) {
      this.$emit('update:modelValue', index)
    }
  }
}
</script>

<style lang="scss" scoped>
.switches{
  width: 240px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  .switch_item{
    flex: 1;
    padding: 8px;
    margin: 0 20px;
    text-align: center;
    font-size: $font-size-medium;
    color: $color-text-l;
    border-bottom: 2px solid $color-theme;
    &.active {
      border-bottom: 2px solid $color-text-l;
      color: #fff;
    }
  }
}
</style>
