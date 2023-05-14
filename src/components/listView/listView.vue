<template>
  <Scroll class="listView" ref="listView" :probeType="3">
    <div>
      666
    </div>
  </Scroll>
</template>

<script>
import Scroll from '@/base/Scroll/Scroll.vue'

export default {
  components: {
    Scroll
  },
  props: {
    singerList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {

    }
  },
  created () {

  },
  mounted () {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.listView{

}
</style>
