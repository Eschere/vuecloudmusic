import Vue from 'vue'
import Vuex from 'vuex'
import * as Type from './mutations-methods'
import config from './config'
import router from './router'

import jsonp from 'jsonp'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    config,
    router
  },
  state: {
    asideOn: false, // 边栏菜单状态
    homeData: null
  },
  getters: {
    recomPlaylist (state) {
      return state.homeData ? state.homeData.recomPlaylist.data.v_hot : []
    },
    newAlbum (state) {
      let array = []
      if (state.homeData) {
        for (let {
          album_name: title,
          album_id: id,
          album_mid: mid,
          singers: [
            {
              singerMid,
              singer_name: singer
            }
          ]
        } of state.homeData.new_album.data.list.values()) {
          array.push({
            singerMid,
            singer,
            title,
            subhead: singer,
            id,
            link: '/album/' + mid,
            img: `http://y.gtimg.cn/music/photo_new/T002R300x300M000${mid}.jpg`
          })
        }
      }
      return array
    },
    myPlaylist (state, getters) {
      return getters.recomPlaylist
    },
    focus (state) {
      return state.homeData ? state.homeData.focus.data.content : []
    }
  },
  mutations: {
    // 保存歌曲总数据
    [Type.GET_SONG_SHEETS] (state, data) {
      state.homeData = data
    },
    // 边栏菜单 显示/隐藏
    [Type.TOGGLE_ASIDE] (state, status) {
      state.asideOn = status
    }
  },
  actions: {
    getHomeData ({commit, state}, name) {
      jsonp(state.config.server + '/homeData', {
        name
      }, (err, data) => {
        if (err) console.log('get homeData failed')
        else commit(Type.GET_SONG_SHEETS, data)
      })
    }
  }
})

export default store
