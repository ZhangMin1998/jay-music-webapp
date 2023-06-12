<template>
  <div class="singer-detail">
    <music-list
      :songs="hotSongs"
      :headerTitle="headerTitle"
      :pic="pic"
      :bgStyle="bgStyle"
      :loading="loading"
    ></music-list>
  </div>
</template>

<script>
import musicList from '@/components/musicList/musicList'
import { getRecommendListDetail } from '@/api/recommend' // getSingerSongs
import storage from 'good-storage'
import { SINGER_KEY } from '@/assets/js/constant'

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
    singerSource () {
      let soure = null
      const singer = this.singer
      if (singer) {
        soure = singer
      } else {
        const cachedSinger = storage.session.get(SINGER_KEY)
        if (cachedSinger && cachedSinger.id === Number(this.$route.params.id)) {
          soure = cachedSinger
        }
      }
      return soure
    },
    headerTitleTouchDown () {
      let name = ''
      const singer = this.singerSource
      if (singer.aliaName) {
        name = singer.name + ` (${singer.aliaName})`
      } else {
        name = singer.name
      }
      return name
    },
    alias () {
      return this.headerTitleTouchDown
    },
    bgStyle () {
      const singer = this.singerSource
      return `background-image: url(${singer.avatar})`
    },
    pic () {
      const singer = this.singerSource
      return singer && singer.avatar
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
      hotSongs: [],
      loading: true
    }
  },
  async created () {
    const detailResult2 = await getRecommendListDetail(this.singerSource.id)

    this.hotSongs = detailResult2.hotSongs
    this.loading = false
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
