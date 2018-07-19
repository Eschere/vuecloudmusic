import jsonp from 'jsonp'

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
    currentSong: {
      singer: '',
      mid: '',
      album: '',
      srcReady: '',
      src: ''
    }
  },
  mutations: {
    savePlaylist (state, playlist) {
      state.playlist = playlist
    },
    saveCurrentSongInfo (state, {singer, mid, album, srcReady, src}) {
      if (singer) state.currentSong.singer = singer
      if (mid) state.currentSong.mid = mid
      if (album) state.currentSong.album = album
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
    }
  },
  actions: {
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
            mid: data.data[0].mid,
            album: data.data[0].album.name
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

          commit('changePlayState', true)
        }
      })
    }
  }
}
