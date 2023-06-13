import MusicList from '@/components/musicList/musicList'
import storage from 'good-storage'

export default function createDetailComponent (name, headerTitle, key, fetch) {
  return {
    name,
    components: {
      MusicList
    },
    props: {
      data: {
        type: Object
      }
    },
    computed: {
      dataSource () {
        let soure = null
        const data = this.data
        if (data) {
          soure = data
        } else {
          const cached = storage.session.get(key)
          if (cached && cached.id === Number(this.$route.params.id)) {
            soure = cached
          }
        }
        return soure
      },
      headerTitleTouchDown () {
        let name = ''
        const data = this.dataSource
        if (data.aliaName) {
          name = data.name + ` (${data.aliaName})`
        } else {
          name = data.name
        }
        return name
      },
      alias () {
        return this.headerTitleTouchDown
      },
      // bgStyle () {
      //   const singer = this.dataSource
      //   return `background-image: url(${singer.avatar})`
      // },
      pic () {
        const data = this.dataSource
        return data && (data.avatar || data.picUrl || data.coverImgUrl)
      }
    },
    provide () {
      return {
        alias: this.alias
      }
    },
    data () {
      return {
        headerTitle: headerTitle,
        hotSongs: [],
        loading: true
      }
    },
    async created () {
      if (name === 'a_lbum') {
        const detailResult = await fetch(this.dataSource.id)
        this.songs = detailResult.playlist.tracks
        this.loading = false
      } else if (name === 'singer') {
        const detailResult = await fetch(this.dataSource.id)
        this.songs = detailResult.hotSongs
        this.loading = false
      }
    }
  }
}
