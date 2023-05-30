import { useStore } from 'vuex'
import { computed, ref, watch } from 'vue'

export default function useCd () {
  const store = useStore()

  const cdRef = ref(null)
  const imageRef = ref(null)

  const playing = computed(() => store.state.playing)
  const cdClass = computed(() => {
    return playing.value ? 'play' : 'play pause'
  })

  return {
    cdRef,
    imageRef,
    cdClass
  }
}
