import { ref, watch, computed, nextTick } from 'vue'

export default function useFixed(props) {
  const groupRef = ref(null)
  const listHeights = ref([])

  function calculate () {
    const list = groupRef.value.children
    const listHeightsVal = listHeights.value
    let height = 0

    listHeightsVal.length = 0
    listHeightsVal.push(height)
  }

  return {
    groupRef
  }
}
