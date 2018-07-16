import jsonp from 'jsonp'

let guid = 'useserver'
/*
try {
  guid = JSON.parse(localStorage.getItem('guid'))
  let needNew = !guid || Date.now() - 1000 * 60 * 60 * 24 * 10 > guid.time
  if (needNew) {
    let t = new Date().getUTCMilliseconds()
    let guidnew = Math.round(2147483647 * Math.random()) * t % 1e10
    localStorage.setItem('guid', JSON.stringify({guid: guidnew, time: Date.now()}))
    guid = guidnew
  } else {
    guid = guid.guid
  }
} catch (e) {
  alert(e)
  let t = new Date().getUTCMilliseconds()
  guid = Math.round(2147483647 * Math.random()) * t % 1e10
}
*/
export default {
  namespaced: true,
  state: {
    el: '',
    duration: '',
    currentTime: '',
    running: false,
    playlist: null,
    currentSong: {
      singer: '',
      mid: '',
      album: '',
      srcReady: '',
      src: ''
    }
  },
  mutations: {
    saveAudioElement (state, el) {
      state.el = el
    },
    savePlaylist (state, playlist) {
      state.playlist = playlist
    },
    currentSongInfo (state, {singer, mid, album, srcReady, src}) {
      if (singer) state.currentSong.singer = singer
      if (mid) state.currentSong.mid = mid
      if (album) state.currentSong.album = album
      if (srcReady) state.currentSong.srcReady = srcReady
      if (src) state.currentSong.src = src
      // state.currentSong = {singer, mid, album, srcReady, src}
    },
    changePlayState (state, playState) {
      // stop为完全停止指令
      if (playState === 'stop') {
        state.running = false
        state.currentTime = 0
      } else {
        state.running = playState
      }
    }
  },
  actions: {
    playOfIndex ({commit, rootState, state}, index) {
      let server = rootState.config.server
      let mid = state.playlist[index].songmid
      jsonp(server + '/songinfo?songmid=' + mid, {
        name: 'getOneSongInfoCallback'
      }, (err, data) => {
        if (err) console.log(err)
        else {
          commit('currentSongInfo', {
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
          commit('currentSongInfo', {
            srcReady: true,
            src: `http://dl.stream.qqmusic.qq.com/${data.data.items[0].filename}?vkey=${data.data.items[0].vkey}&guid=${guid}&uin=0&fromtag=66`
          })
          state.el.src = `http://dl.stream.qqmusic.qq.com/${data.data.items[0].filename}?vkey=${data.data.items[0].vkey}&guid=${guid}&uin=0&fromtag=66`
          state.el.play().catch((e) => {
            alert(e)
          })
        }
      })
    }
  }
}
