<template>
  <m-header></m-header>
  <tab></tab>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</template>

<script>
import Header from '@/components/header/header'
import Tab from '@/components/tab/tab'

export default {
  components: {
    MHeader: Header,
    Tab
  }
}
</script>

<style lang="scss">

</style>
