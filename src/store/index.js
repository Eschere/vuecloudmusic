import Vue from 'vue'
import Vuex from 'vuex'
import * as Type from './mutations-methods'
import config from './config'
import router from './router'
import songSheet from './songSheet'
import player from './player'
import jsonp from 'jsonp'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    config,
    router,
    songSheet,
    player
  },
  state: {
    asideOn: false, // 边栏菜单状态
    overlayOn: false, // 是或否有悬浮类页面开启
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
        } of state.homeData.new_album.data.list) {
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
    },
    changeOverlayState (state, status) {
      state.overlayOn = status
    }
  },
  actions: {
    getHomeData ({commit, getters}, name) {
      jsonp(getters['config/currentServer'].url + '/homeData', {
        name
      }, (err, data) => {
        if (err) console.log('get homeData failed')
        else commit(Type.GET_SONG_SHEETS, data)
      })
    }
  }
})

export default store
