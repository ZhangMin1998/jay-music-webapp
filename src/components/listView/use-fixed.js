// 先拿到高度区间，再监听滚动事件拿到滚动位置， 再监听滚动位置，判断落在哪个高度区间，最后拿到title
import { ref, watch, computed, nextTick } from 'vue'

export default function useFixed (props) {
  const groupRef = ref(null)
  const listHeights = ref([]) // 高度区间
  const scrollY = ref(0) // 纵向滚动值
  const currentIndex = ref(0) // 当前渲染值的索引 （展示的字母）
  const distance = ref(0) // 偏移量  当前组的下一组距离容器顶部的距离
  const TITLE_HEIGHT = 30 // 固定title默认高度值

  // 计算出改显示的字母
  const fixedTitle = computed(() => {
    if (scrollY.value < 0) {
      return ''
    }
    const currentGroup = props.singerList[currentIndex.value]
    return currentGroup ? currentGroup.title : ''
  })

  const fixedStyle = computed(() => {
    const distanceVal = distance.value
    // 计算偏移值  diff是负数
    const diff = (distanceVal > 0 && distanceVal < TITLE_HEIGHT) ? distanceVal - TITLE_HEIGHT : 0
    // console.log(diff)
    return {
      transform: `translate(0,${diff}px)`
    }
  })

  // 数据变化后，dom更新后  重新计算高度区间
  watch(() => props.singerList, async () => {
    await nextTick()
    calculate()
  })

  // 监听滚动高度，拿到区间索引
  watch(scrollY, newY => {
    const listHeightsVal = listHeights.value
    for (let i = 0; i < listHeightsVal.length - 1; i++) {
      // -1是因为区间值比list大1
      const heightTop = listHeightsVal[i]
      const heightBottom = listHeightsVal[i + 1]
      // 判断在哪个区间
      if (newY >= heightTop && newY <= heightBottom) {
        currentIndex.value = i
        distance.value = heightBottom - newY
      }
    }
  })

  // 计算高度区间
  function calculate () {
    const list = groupRef.value.children
    const listHeightsVal = listHeights.value
    let height = 0

    listHeightsVal.length = 0 // 清空
    listHeightsVal.push(height)

    for (let i = 0; i < list.length; i++) {
      height += list[i].clientHeight
      listHeightsVal.push(height)
    }
  }

  // 滚动事件
  function onScroll (pos) {
    // console.log(pos)
    scrollY.value = -pos.y
  }

  return {
    groupRef,
    onScroll,
    fixedTitle,
    fixedStyle
  }
}
