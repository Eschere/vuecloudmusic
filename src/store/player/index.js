import jsonp from 'jsonp'
import {shuffle} from '@/utils'
let guid

try {
  let tmpguid = JSON.parse(localStorage.getItem('guid'))
  let needNew = !tmpguid || !tmpguid.time || Date.now() - 1000 * 60 * 60 * 24 * 10 > tmpguid.time

  if (needNew) {
    let t = new Date().getUTCMilliseconds()
    let guidnew = Math.round(2147483647 * Math.random()) * t % 1e10
    localStorage.setItem('guid', JSON.stringify({guid: guidnew, time: Date.now()}))
    guid = guidnew
  } else {
    guid = tmpguid.guid
  }
} catch (e) {
  let t = new Date().getUTCMilliseconds()
  guid = Math.round(2147483647 * Math.random()) * t % 1e10
}

export default {
  namespaced: true,
  state: {
    guid,
    duration: 0,
    currentTime: 0,
    running: false,
    playlist: [],
    loopType: 'proper', // 'proper', 'random', 'single'
    dataLoading: false,
    currentSong: {
      /* eslint-disable */
      /*indexInPlaylist: 0,
      songname: '',
      singer: '',
      songmid: '',
      album: '',
      albummid: '',
      albumcover: '',
      srcReady: '',
      src: ''*/
      songname: '这是一个测',
      album:"ONE DAY",
albumcover:"https://y.gtimg.cn/music/photo_new/T002R300x300M0000040Z1El30gtpD.jpg?max_age=2592000",
albummid:"0040Z1El30gtpD",
indexInPlaylist:0,
singer:"원",
songmid:"002H8PeZ0F9bfF",
src:"http://dl.stream.qqmusic.qq.com/C400002H8PeZ0F9bfF.m4a?vkey=7B55699D8B48A17565866BB8AE06FDD1CBD98CE9A81AC25BFE9CF7BA702DAAC779A11C30B45BC346F3C119B039225B33BDC68E3F78F0C732&guid=974778006&uin=0&fromtag=66",
srcReady:true
    }
    // randomPlayedList: []// 随机播放过的歌曲
  },
  getters: {
    playOrder (state) {
      if (state.playlist.length === 0) {
        return []
      }
      let array = []
      for (let i = 0; i < state.playlist.length; i++) {
        array[i] = i
      }
      switch (state.loopType) {
        case 'proper':
        case 'single':
          return array
        case 'random':
          return shuffle(array)
      }
    },
    progress (state) {
      if (state.duration === 0) {
        return 0
      }
      return Math.round(state.currentTime / state.duration * 100) / 100
    }
  },
  mutations: {
    savePlaylist (state, playlist) {
      state.playlist = playlist
    },
    saveCurrentSongInfo (state, {indexInPlaylist, singer, songname, songmid, album, albummid, albumcover, srcReady, src}) {
      if (indexInPlaylist !== undefined) state.currentSong.indexInPlaylist = indexInPlaylist
      if (singer) state.currentSong.singer = singer
      if (songname) state.currentSong.songname = songname
      if (songmid) state.currentSong.songmid = songmid
      if (album) state.currentSong.album = album
      if (albummid) state.currentSong.albummid = albummid
      if (albumcover) state.currentSong.albumcover = albumcover
      if (srcReady) state.currentSong.srcReady = srcReady
      if (src) state.currentSong.src = src
    },
    changePlayState (state, playState) {
      // stop为完全停止指令
      if (playState === 'stop') {
        state.running = false
        state.currentTime = 0
      } else if (playState === 'toggle') {
        state.running = !state.running
      } else {
        state.running = playState
      }
    },
    saveDuration (state, timestamp) {
      state.duration = timestamp
    },
    updateCurrentTime (state, timestamp) {
      state.currentTime = timestamp
    },
    changeDataLoading (state, status) {
      state.dataLoading = status
    }
  },
  actions: {
    changeSong ({commit, dispatch, state, getters}, {type, callback, beforeChange}) {
      // 根据循环方式播放确定上下首歌曲
      commit('changeDataLoading', true)
      let keyIndex = getters.playOrder.indexOf(state.currentSong.indexInPlaylist)
      let result
      switch (type) {
        case 'prev':
          result = keyIndex - 1 < 0 ? getters.playOrder.length - 1 : keyIndex - 1
          break
        case 'next':
          result = keyIndex + 1 > getters.playOrder.length - 1 ? 0 : keyIndex + 1
      }
      dispatch('requestSongInfo', {
        index: getters.playOrder[result],
        callback,
        beforeChange
      })
    },
    requestSongInfo ({commit, rootState, state}, {index, callback, beforeChange}) {
      // 切歌前执行的函数
      beforeChange && beforeChange()
      // 切歌程序首先执行歌曲索引切换，保持页面程序的运行
      commit('saveCurrentSongInfo', {
        indexInPlaylist: index
      })
      let server = rootState.config.server
      let mid = state.playlist[index].songmid
      jsonp(server + '/songinfo?songmid=' + mid, {
        name: 'getOneSongInfoCallback'
      }, (err, data) => {
        if (err) console.log(err)
        else {
          commit('saveCurrentSongInfo', {
            songname: data.data[0].title,
            singer: data.data[0].singer[0].name,
            songmid: data.data[0].mid,
            album: data.data[0].album.name,
            albummid: data.data[0].album.mid,
            albumcover: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${data.data[0].album.mid}.jpg?max_age=2592000`
          })
        }
      })

      jsonp(`${server}/songfile?songmid=${mid}&filename=C400${mid}.m4a&guid=${guid}`, {
        name: 'MusicJsonCallback607606642531' + Math.floor((Math.random() * 8999) + 1000)
      }, (err, data) => {
        if (err) console.log(err)
        else {
          commit('saveCurrentSongInfo', {
            srcReady: true,
            src: `http://dl.stream.qqmusic.qq.com/${data.data.items[0].filename}?vkey=${data.data.items[0].vkey}&guid=${guid}&uin=0&fromtag=66`
          })

          callback && callback()
        }
      })
    }
  }
}
