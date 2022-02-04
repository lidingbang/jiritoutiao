import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

const TOKEN_KEY = 'TOUTIAO_USEReee'

export default new Vuex.Store({
  state: {
    // 一个对象，存储当前登录用户信息，token等数据
    // user: null
    // user: window.localStorage.getItem(TOKEN_KEY)
    user: getItem(TOKEN_KEY)
  },
  // 用来修改user 的数据
  mutations: {
    setUser (state, data) {
      state.user = data

      // 为了防止刷新丢失，我们需要把数据备份到本地存储
      // window.localStorage.setItem('TOKEN_KEY', JSON.stringify(state.user))
      setItem(TOKEN_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
