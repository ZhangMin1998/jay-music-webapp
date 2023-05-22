<template>
  <div class="singer-detail">
    <music-list
      :songs="hotSongs"
      :headerTitle="headerTitle"
      :pic="pic"
      :bgStyle="bgStyle"
    ></music-list>
  </div>
</template>

<script>
import musicList from '@/components/musicList/musicList'
import { getSingerDetail } from '@/api/singer' // getSingerSongs

export default {
  components: {
    musicList
  },
  props: {
    singer: {
      type: Object
    }
  },
  computed: {
    headerTitleTouchDown () {
      let name = ''
      if (this.singer.aliaName) {
        name = this.singer.name + ` (${this.singer.aliaName})`
      } else {
        name = this.singer.name
      }
      return name
    },
    alias () {
      return this.headerTitleTouchDown
    },
    bgStyle () {
      return `background-image: url(${this.singer.avatar})`
    },
    pic () {
      return this.singer.avatar
    }
  },
  provide () {
    return {
      alias: this.alias
    }
  },
  data () {
    return {
      headerTitle: '歌手',
      hotSongs: []
    }
  },
  async created () {
    console.log('singer-detail-singer', this.singer)
    // const detailResult = await getSingerDetail(this.singer.id)
    const detailResult2 = await getSingerDetail(this.singer.id)
    // const detailResult3 = await getSingerSongs(this.singer.id)
    // console.log(detailResult)
    console.log(detailResult2)
    this.hotSongs = detailResult2.hotSongs
    // console.log(detailResult3)
  },
  methods: {

  }
}

</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable";
@import "@/assets/scss/mixin";
.singer-detail{
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  // background: pink;
  background: $color-background;
}
</style>
