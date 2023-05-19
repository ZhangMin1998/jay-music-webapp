<template>
  <div class="singer-detail">
    666666666
    <!-- <song-list></song-list> -->
  </div>
</template>

<script>
// import SongList from '@/base/SongList/SongList'
// import { getSingerDetail, getSingerSongs } from '@/api/singer'

export default {
  components: {
    // SongList
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
    title () {
      return this.headerTitleTouchDown
    },
    bgStyle () {
      return `background-image: url(${this.singer.avatar})`
    }
  },
  data () {
    return {

    }
  },
  async created () {
    console.log(99999999999)
    // // console.log('singer', this.singer)
    // // const detailResult = await getSingerDetail(this.singer.id)
    // const detailResult2 = await getSingerDetail()
    // const detailResult3 = await getSingerSongs()
    // // console.log(detailResult)
    // console.log(detailResult2)
    // console.log(detailResult3)
  },
  methods: {

  }
}

</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable";
.singer-detail{
  width: 100%;
  height: 100%;
  background: pink;
}
</style>
