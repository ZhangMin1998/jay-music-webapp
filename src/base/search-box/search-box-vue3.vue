<template>
  <div class="search_box_vue3">
    <input :placeholder="placeholder" v-model.trim="query" type="text" class="box">
    <i v-show="true" class="icon-delete" @click="clear"></i>
  </div>
</template>

<script>
import { debounce } from 'throttle-debounce'
// import { debounceFun } from '@/assets/js/util'

export default {
  name: 'search_box_vue3',
  props: {
    modelValue: String,
    placeholder: {
      type: String,
      deault: ''
    }
  },
  watch: {
    // query (newVal) {
    //   // this.$emit('update:modelValue', newVal)
    //   debounce(300, (newVal) => {
    //     // this.$emit('update:modelValue', newVal) // this的指向不对 ？？？
    //   })
    // }
    modelValue (newVal) { // 监听父组件改变值的时候 自动填充时
      this.query = newVal
    }
  },
  data () {
    return {
      name: 'zm',
      query: this.modelValue
    }
  },
  created () {
    this.$watch('query', debounce(300, (newQuery) => {
      this.$emit('update:modelValue', newQuery)
    }))
  },
  methods: {
    //   clickfun: debounceFun(function() {
    //     console.log(this.name)
    //   }, 500),
    //   clickfun2: debounce(300, () => {
    //     console.log(666)
    //   })
    clear () {
      this.query = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.search_box_vue3{
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
