<template>
  <m-header></m-header>
  <tab></tab>
  <!-- <keep-alive>
    <router-view :style="viewStyle"></router-view>
  </keep-alive> -->
  <router-view :style="viewStyle" v-slot="{ Component }">
    <keep-alive>
      <component :is="Component"/>
    </keep-alive>
  </router-view>
  <player></player>
</template>

<script>
import Header from '@/components/header/header'
import Tab from '@/components/tab/tab'
import player from '@/components/player/player'
import { mapState } from 'vuex'

export default {
  components: {
    MHeader: Header,
    Tab,
    player
  },
  computed: {
    ...mapState([
      'playlist'
    ]),
    viewStyle () {
      const bottom = this.playlist.length ? '60px' : '0'
      return {
        bottom
      }
    }
  }
}
</script>

<style lang="scss">

</style>
