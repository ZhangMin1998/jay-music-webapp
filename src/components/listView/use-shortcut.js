import { ref, computed } from 'vue'

export default function useShortcut (props, groupRef) {
  const ANCHOR_HEIGHT = 18 // 锚点的高度
  const listView = ref(null)

  const shortcutList = computed(() => {
    return props.singerList.map((group) => {
      return group.title.substr(0, 1)
    })
  })
  // 定义一个对象，touch开始的坐标，move的坐标，再做差
  const touch = {} // 简单js闭包技巧

  function onShortcutTouchStart (e) {
    // console.log(e)
    const anchorIndex = parseInt(e.target.dataset.index) // 拿到索引
    touch.y1 = e.touches[0].pageY // 保存y
    touch.anchorIndex = anchorIndex // 保存此时索引

    scrollTo(anchorIndex)
  }

  function onShortcutTouchMove (e) {
    // console.log(e)
    touch.y2 = e.touches[0].pageY
    const delta = (touch.y2 - touch.y1) / ANCHOR_HEIGHT | 0 // 向下取整
    const anchorIndex = touch.anchorIndex + delta // 更新索引

    scrollTo(anchorIndex)
  }

  // 跳转滚动公共方法
  function scrollTo (index) {
    if (isNaN(index)) return // 点击顶底部的黑边NaN
    // console.log(index)
    // 限制index  0 ~ shortcutList.value.length - 1
    index = Math.max(0, Math.min(shortcutList.value.length - 1, index))
    const targetEl = groupRef.value.children[index] // 滚动到的dom
    const scroll = listView.value.scroll
    scroll.scrollToElement(targetEl)
  }

  return {
    shortcutList,
    listView,
    onShortcutTouchStart,
    onShortcutTouchMove
  }
}
