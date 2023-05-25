<template>
  <m-header></m-header>
  <tab></tab>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
  <player></player>
</template>

<script>
import Header from '@/components/header/header'
import Tab from '@/components/tab/tab'
import player from '@/components/player/player'

export default {
  components: {
    MHeader: Header,
    Tab,
    player
  }
}
</script>

<style lang="scss">

</style>
