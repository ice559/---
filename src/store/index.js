import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

const TOKEN_KEY = 'TOUTIAO_USER'
export default new Vuex.Store({
  state: {
    // 进行本地存储的 获取
    user: getItem(TOKEN_KEY)
  },
  getters: {
  },
  mutations: { // 通过mutations函数来修该state数据
    // 进行本地存储 存入
    /**
     * 定义函数 setUser (state,data)函数
     * 第一个参数一定为state 这是固定规则
     * 第二个参数 data 为传入的数据
    */
    setUser (state, data) {
      state.user = data
      setItem(TOKEN_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
