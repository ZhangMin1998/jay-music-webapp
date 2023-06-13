<template>
  <div class="album">
    <music-list
      :songs="songs"
      :headerTitle="headerTitle"
      :pic="pic"
      :loading="loading"
    ></music-list>
  </div>
</template>

<script>
// import musicList from '@/components/musicList/musicList'
// import storage from 'good-storage'
import { getRecommendListDetail } from '@/api/recommend' // getSingerSongs
import { ALBUM_KEY } from '@/assets/js/constant'
import createDetailComponent from '@/assets/js/create-detail-component'

export default createDetailComponent('a_lbum', '歌单', ALBUM_KEY, getRecommendListDetail)

// export default {
//   name: 'a_lbum',
//   components: {
//     musicList
//   },
//   props: {
//     data: {
//       type: Object
//     }
//   },
//   computed: {
//     dataSource () {
//       let soure = null
//       const data = this.data
//       if (data) {
//         soure = data
//       } else {
//         const cached = storage.session.get(ALBUM_KEY)
//         if (cached && cached.id === Number(this.$route.params.id)) {
//           soure = cached
//         }
//       }
//       return soure
//     },
//     headerTitleTouchDown () {
//       let name = ''
//       const data = this.dataSource
//       if (data.aliaName) {
//         name = data.name + ` (${data.aliaName})`
//       } else {
//         name = data.name
//       }
//       return name
//     },
//     alias () {
//       return this.headerTitleTouchDown
//     },
//     pic () {
//       const data = this.dataSource
//       return data && (data.avatar || data.picUrl)
//     }
//   },
//   provide () {
//     return {
//       alias: this.alias
//     }
//   },
//   data () {
//     return {
//       headerTitle: '歌单',
//       songs: [],
//       loading: true
//     }
//   },
//   async created () {
//     const detailResult = await getRecommendListDetail(this.dataSource.id)

//     this.songs = detailResult.playlist.tracks
//     this.loading = false
//   }
// }

</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable";
@import "@/assets/scss/mixin";
.album{
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
