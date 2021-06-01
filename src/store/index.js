import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userId: null,
    isLogin: 0,
    user: null,
  }
})
export default store