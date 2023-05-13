<template>
  <div class="singer" v-loading="!singerList.length">
    singer
    <listView :data="singerList" ref="list"></listView>
    <!-- <index-list
      :data="singers"
      @select="selectSinger"
    ></index-list>
    <router-view v-slot="{ Component }">
      <transition appear name="slide">
        <component :is="Component" :data="selectedSinger"/>
      </transition>
    </router-view> -->
  </div>
</template>

<script>
import { getSingerList } from '@/api/singer'
import listView from '@/components/listView/listView'
// import storage from 'good-storage'
// import { SINGER_KEY } from '@/assets/js/constant'
const pinyin = require('pinyin')

export default {
  // eslint-disable-next-line
  name: 'singer',
  components: {
    listView
  },
  data () {
    return {
      singerList: []
      // selectedSinger: null
    }
  },
  created () {
    this.getSingerList()
    console.log(pinyin('张敏'))
  },
  methods: {
    // 获取歌手列表
    getSingerList () {
      getSingerList().then((res) => {
        console.log('获取歌手列表', res)
        if (res.code === 200) {
          this.singerList = res.artists
        }
      })
    }
  }
  // async created () {
  //   const result = await getSingerList()
  //   this.singers = result.singers
  // },
  // methods: {
  //   selectSinger (singer) {
  //     this.selectedSinger = singer
  //     this.cacheSinger(singer)
  //     this.$router.push({
  //       path: `/singer/${singer.mid}`
  //     })
  //   },
  //   cacheSinger (singer) {
  //     // storage.session.set(SINGER_KEY, singer)
  //   }
  // }
}
</script>

<style lang="scss" scoped>
  .singer {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
  }
</style>
