import Vue from 'vue'
import Vuex from 'vuex'
import * as Type from './mutations-methods'
import config from './config'
import jsonp from 'jsonp'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    config
  },
  state: {
    songSheet: null
  },
  getters: {
    recomPlaylist (state) {
      return state.songSheet ? state.songSheet.recomPlaylist.data.v_hot : []
    },
    myPlaylist (state, getters) {
      return getters.recomPlaylist
    }
  },
  mutations: {
    [Type.GET_SONG_SHEETS] (state, data) {
      state.songSheet = data
    }
  },
  actions: {
    getSongSheets ({commit, state}, name) {
      jsonp(state.config.server + '/songSheet', {
        name
      }, (err, data) => {
        if (err) console.log('get songSheets failed')
        else commit(Type.GET_SONG_SHEETS, data)
      })
    }
  }
})

export default store
