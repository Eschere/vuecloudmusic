import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    playlist: []
  },
  mutations: {
    playlistPush (state, p) {
      state.playlist.push(p)
    }
  }
})

export default store
