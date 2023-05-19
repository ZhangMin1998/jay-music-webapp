<template>
  <div class="singer" v-loading="!singerList.length">
    <listView :singerList="singerList" ref="list" @select="selectSinger"></listView>
    <!-- <router-view :singer="selectedSinger"></router-view> -->
    <!-- <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" :singer="selectedSinger"/>
      </keep-alive>
    </router-view> -->
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
import Singer from '@/assets/js/singer'
import listView from '@/components/listView/listView'
// import storage from 'good-storage'
// import { SINGER_KEY } from '@/assets/js/constant'
const pinyin = require('pinyin')
const HOT_NAME = '热门'
const HOT_SINGERS = 10

export default {
  // eslint-disable-next-line
  name: 'singer',
  components: {
    listView
  },
  data () {
    return {
      singerList: [],
      selectedSinger: null
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
          // this.singerList = res.artists
          const tempList = res.artists
          tempList.forEach(item => {
            // 获取姓氏首字母
            const py = pinyin(item.name[0], {
              style: pinyin.STYLE_FIRST_LETTER
            })
            // 添加initial字段，为姓氏首字母大写
            item.initial = py[0][0].toUpperCase()
          })
          this.singerList = this.normalizeSinger(tempList)
          console.log('处理后的数据', this.singerList)
        }
      })
    },
    // 处理歌手数据
    normalizeSinger (list) {
      const map = {
        hot: {
          title: HOT_NAME, // '热门'
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < HOT_SINGERS) { // HOT_SINGERS = 10
          map.hot.items.push(new Singer({
            id: item.id,
            name: item.name,
            avatar: item.img1v1Url,
            aliaName: item.alias.join(' / ')
          }))
        }

        const key = item.initial
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({
          id: item.id,
          name: item.name,
          avatar: item.img1v1Url,
          aliaName: item.alias[0]
        }))
      })
      const hot = []
      const ret = []
      for (const key in map) {
        const val = map[key]
        if (val.title.match(/[A-Z]/)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    },
    // 点击歌手进入详情
    selectSinger (singer) {
      this.selectedSinger = singer
      this.$router.push({
        // path: '/singer/detail'
        path: `/singer/detail/${singer.id}`
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
