import { useStore } from 'vuex'
import { SEARCH_KEY } from '@/assets/js/constant'
import { save, remove, clear } from '@/assets/js/array-store'

export default function useSearchHistory () {
  const store = useStore()
  const maxLen = 200

  const saveSearch = query => {
    const historyList = save(query, SEARCH_KEY, (item) => {
      return item === query
    }, maxLen)
    store.commit('setSearchHistory', historyList)
  }

  const deleteSearch = query => {
    const historyList = remove(SEARCH_KEY, (item) => {
      return item === query
    }, maxLen)
    store.commit('setSearchHistory', historyList)
  }

  const clearSearch = () => {
    const historyList = clear(SEARCH_KEY)
    store.commit('setSearchHistory', historyList)
  }

  return {
    saveSearch,
    deleteSearch,
    clearSearch
  }
}
