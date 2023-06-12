import MusicList from '@/components/music-list/music-list'
import storage from 'good-storage'
import { processSongs } from '@/service/song'

export default function createDetailComponent(name, key, fetch) {
  return {
    name,
    components: {
      MusicList
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
          const cachedSinger = storage.session.get(key)
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
      const detailResult2 = await fetch(this.singerSource.id)

      this.hotSongs = detailResult2.hotSongs
      this.loading = false
    },
    methods: {

    }
  }
}
