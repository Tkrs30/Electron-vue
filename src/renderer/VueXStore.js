import Vue from 'vue'
import Vuex from 'vuex'
import Store from 'electron-store'

Vue.use(Vuex)

const persistentStore = new Store()

export default new Vuex.Store({
  state: {
    count: persistentStore.get('count') || 0
  },
  mutations: {
    incrementCount (state) {
      state['count'] = state['count'] + 1
      persistentStore.set('count', state['count'] + 1)
    }
  }
})
