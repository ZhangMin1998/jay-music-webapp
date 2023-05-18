<template>
  <div class="singer-detail">
    666
  </div>
</template>

<script>
import { getSingerDetail, getSingerDetail2, getSingerSongs } from '@/api/singer'

export default {
  props: {
    singer: {
      type: Object
    }
  },
  data () {
    return {

    }
  },
  async created () {
    console.log(this.singer)
    const detailResult = await getSingerDetail(this.singer.id)
    const detailResult2 = await getSingerDetail2(this.singer.id)
    const detailResult3 = await getSingerSongs(this.singer.id)
    console.log(detailResult)
    console.log(detailResult2)
    console.log(detailResult3)
  },
  methods: {

  }
}

</script>

<style lang="scss" scoped>

</style>
