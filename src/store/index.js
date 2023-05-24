import { createStore, createLogger } from 'vuex'
import state from './state'
import mutations from './mutations'
import * as getters from './getters'
import * as actions from './actions'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  state,
  getters,
  mutations,
  actions,
  strict: debug, // 开启严格模式判断state的状态修改是否是提交给mutations, 否则警告
  plugins: debug ? [createLogger()] : []
})
