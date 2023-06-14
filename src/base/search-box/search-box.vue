<template>
  <div class="search_box">
    <input :placeholder="placeholder" v-model="query" type="text" class="box">
    <i v-show="query" class="icon-delete" @click="clear"></i>
  </div>
</template>

<script>
export default {
  name: 'search_box',
  props: {
    placeholder: {
      type: String,
      deault: ''
    }
  },
  data () {
    return {
      query: ''
    }
  },
  methods: {
    clear () {
      this.query = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.search_box{
  display: flex;
  align-items: center;
  width: 100%;
  height: 25px;
  border-bottom: 1px solid rgb(235, 235, 235);
  .box{
    flex: 1;
    line-height: 25px;
    font-size: $font-size-medium;
    background: $color-theme;
    color: #fff;
    // border: none;
    outline: 0; // 用于设置元素的轮廓样式。它通常用于在元素获得焦点时显示一个可见的轮廓，以指示当前焦点所在的元素
    &::placeholder {
      color: rgba(255, 255, 255, 0.6);
    }
  }
  .icon-delete{
    font-size: 14px;
    color: rgba(255, 255, 255, 0.8);
    position: absolute;
    right: 12px;
  }
}
</style>
