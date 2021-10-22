import Vue from 'vue'
import Vuex from 'vuex'

/* eslint-disable */

import { createPersistedState, createSharedMutations } from 'vuex-electron'

import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  plugins: [
    createPersistedState(),
    // createSharedMutations()
  ],
  strict: process.env.NODE_ENV !== 'production',
  state: {
    count: 99,
    token: ''
  },
  mutations: {
    increment (state) {
      state.count++
    },
    setToken (state, token) {
      state.token = token
    },
    unsetToken (state) {
      state.token = null
    }
  }
})
