import { ref, computed } from 'vue'

export default function useShortcut (props, groupRef) {
  const listView = ref(null)

  const shortcutList = computed(() => {
    return props.singerList.map((group) => {
      return group.title.substr(0, 1)
    })
  })
  // 定义一个对象，touch开始的坐标，move的坐标，再做差
  const touch = {}

  function onShortcutTouchStart (e) {
    console.log(e)
    const anchorIndex = parseInt(e.target.dataset.index) // 拿到索引
    const targetEl = groupRef.value.children[anchorIndex] // 滚动到的dom

    const scroll = listView.value.scroll
    scroll.scrollToElement(targetEl)
  }

  function onShortcutTouchMove (e) {
    console.log(e)
  }

  return {
    shortcutList,
    listView,
    onShortcutTouchStart,
    onShortcutTouchMove
  }
}
