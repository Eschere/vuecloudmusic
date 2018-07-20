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
    duration: '',
    currentTime: '',
    running: false,
    playlist: [],
    loopType: 'random', // 'proper', 'random', 'single'
    currentSong: {
      indexInPlaylist: 0,
      singer: '',
      songmid: '',
      album: '',
      albummid: '',
      albumcover: '',
      srcReady: '',
      src: ''
    },
    randomPlayedList: []// 随机播放过的歌曲
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
    }
  },
  mutations: {
    savePlaylist (state, playlist) {
      state.playlist = playlist
    },
    saveCurrentSongInfo (state, {indexInPlaylist, singer, songmid, album, albummid, albumcover, srcReady, src}) {
      if (indexInPlaylist !== undefined) state.currentSong.indexInPlaylist = indexInPlaylist
      if (singer) state.currentSong.singer = singer
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
    pushSongIntoRandomPlayed (state, item) {
      state.randomPlayedList.push(item)
    },
    popSongFromRandomPlayed (state) {
      // 从随机播放过的歌曲中取出记录
      state.randomPlayedList.pop()
    }
  },
  actions: {
    changeSong ({dispatch, state, getters}, {type, callback}) {
      // 根据循环方式播放确定上下首歌曲
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
        callback
      })
    },
    requestSongInfo ({commit, rootState, state}, {index, callback}) {
      let server = rootState.config.server
      let mid = state.playlist[index].songmid
      jsonp(server + '/songinfo?songmid=' + mid, {
        name: 'getOneSongInfoCallback'
      }, (err, data) => {
        if (err) console.log(err)
        else {
          commit('saveCurrentSongInfo', {
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
            indexInPlaylist: index,
            srcReady: true,
            src: `http://dl.stream.qqmusic.qq.com/${data.data.items[0].filename}?vkey=${data.data.items[0].vkey}&guid=${guid}&uin=0&fromtag=66`
          })

          commit('changePlayState', true)
          callback && callback()
        }
      })
    }
  }
}
