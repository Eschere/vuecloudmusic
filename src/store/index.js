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
    asideOn: false, // 边栏菜单状态
    songSheet: null
  },
  getters: {
    recomPlaylist (state) {
      return state.songSheet ? state.songSheet.recomPlaylist.data.v_hot : []
    },
    myPlaylist (state, getters) {
      return getters.recomPlaylist
    },
    focus (state) {
      return state.songSheet ? state.songSheet.focus.data.content : []
    }
  },
  mutations: {
    // 保存歌曲总数据
    [Type.GET_SONG_SHEETS] (state, data) {
      state.songSheet = data
    },
    // 边栏菜单 显示/隐藏
    [Type.TOGGLE_ASIDE] (state, status) {
      state.asideOn = status
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
