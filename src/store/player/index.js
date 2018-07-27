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
    cdMoveDirection: '', // 播放器的切歌方向，用于控制cd切换动画
    duration: 0,
    currentTime: 0, // 原生播放器向store更新时间 用 updateCurrentTime 提交
    // store 向 原生播放器触发更新 用setCurrentTime 提交
    // 重置该参数时将其设置为null, 不要设置成0
    currentTimeSetter: null,
    running: false, // 播放器播放状态
    volume: 0.5,
    playlist: [],
    loopType: 'proper', // 'proper', 'random', 'single'
    dataLoading: true, // 歌曲相关信息加载状态
    loadedTime: 0, // 已加载时长
    currentSong: {
      /* eslint-disable */
      /*indexInPlaylist: 0,
      songname: '',
      singer: '',
      songmid: '',
      songid: '',
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
songid: '',
src:"http://dl.stream.qqmusic.qq.com/C400002H8PeZ0F9bfF.m4a?vkey=7B55699D8B48A17565866BB8AE06FDD1CBD98CE9A81AC25BFE9CF7BA702DAAC779A11C30B45BC346F3C119B039225B33BDC68E3F78F0C732&guid=974778006&uin=0&fromtag=66",
srcReady:true
    },
    /*currentSongComment: {
      comment: {
        list: [],
        total: 0
      },
      hotcomment: {
        list: [],
        total: 0
      }
    }*/
    // randomPlayedList: []// 随机播放过的歌曲
  },
  getters: {
    playOrder (state) {
      if (state.playlist.length === 0) {
        return []
      }
      let array = []
      for (let i = 0; i < state.playlist.length; i++) {
        if (!state.playlist[i].disable) {
          array.push(i)
        }
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
    addPlayListItem (state, {item, type='push'}) {
      if (type === 'push') {
        state.playlist.push(item)
      } else if (type === 'follow') {
        state.playlist.splice(state.currentSong.indexInPlaylist + 1, 0, item)
      }
    },
    removePlaylistItem (state, index) {
      state.playlist.splice(index, 1)
    },
    setDisableItem (state, index) {
      state.playlist.splice(index, 1, {
        ...state.playlist[index],
        disable: true
      })
    },
    clearPlaylist (state) {
      state.running = false
      state.currentSong = {
        indexInPlaylist: 0,
        songname: '',
        singer: '',
        songmid: '',
        songid: '',
        album: '',
        albummid: '',
        albumcover: '',
        srcReady: '',
        src: ''
      }
      state.currentTimeSetter = 0
      state.duration = 0
      state.loadedTime = 0
      state.playlist = []
    },
    saveCurrentSongInfo (state, {indexInPlaylist, singer, songname, songmid, songid, album, albummid, albumcover, srcReady, src}) {
      if (indexInPlaylist !== undefined) state.currentSong.indexInPlaylist = indexInPlaylist
      if (singer) state.currentSong.singer = singer
      if (songname) state.currentSong.songname = songname
      if (songmid) state.currentSong.songmid = songmid
      if (songid) state.currentSong.songid = songid
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
    toggleLoopType (state) {
      switch (state.loopType) {
        case 'proper': 
          state.loopType = 'single'
          break
        case 'single': 
          state.loopType = 'random'
          break
        case 'random': 
          state.loopType = 'proper'
          break
      }
    },
    saveLoadedTime (state, timestamp) {
      state.loadedTime = timestamp
    },
    saveDuration (state, timestamp) {
      state.duration = timestamp
    },
    updateCurrentTime (state, timestamp) {
      state.currentTime = timestamp
    },
    setCurrentTime (state, timestamp) {
      state.currentTimeSetter = timestamp
    },
    changeDataLoading (state, status) {
      state.dataLoading = status
    },
    changeCdMoveDirection (state, direction) {
      state.cdMoveDirection = direction
    },
    changeVolume (state, volume) {
      state.volume = volume
    }
    /*
    updateCurrentSongComment(state, {type = false, commnet}) {
      // 更新当前歌曲评论
      // type = true 完全更新
      // type = false push更新
      if (type === true) {
        state.currentSongComment = commnet
      } else {
        state.currentSongComment.comment.list.push(comment)
      }
    }*/
  },
  actions: {
    changeSong ({commit, dispatch, state, getters}, {type, callback, beforeChange}) {
      // 根据循环方式播放确定上下首歌曲
      let keyIndex = getters.playOrder.indexOf(state.currentSong.indexInPlaylist)
      let result
      switch (type) {
        case 'prev':
          commit('changeCdMoveDirection', 'right')
          result = keyIndex - 1 < 0 ? getters.playOrder.length - 1 : keyIndex - 1
          break
        case 'next':
          commit('changeCdMoveDirection', 'left')
          result = keyIndex + 1 > getters.playOrder.length - 1 ? 0 : keyIndex + 1
      }
      dispatch('requestSongInfo', {
        index: getters.playOrder[result],
        callback,
        beforeChange
      })
    },
    removePlaylistItem({state, dispatch, commit}, index) {
      if (state.currentSong.indexInPlaylist ===  index) {
        dispatch('changeSong', {type: 'next'})
      }
      if ( state.currentSong.indexInPlaylist > index) {
        commit('saveCurrentSongInfo', {
          indexInPlaylist: state.currentSong.indexInPlaylist - 1
        })
      }
      commit('removePlaylistItem', index)
    },
    // changeSongByIndex () {

    // },
    requestSongInfo ({commit, state, rootGetters}, {index, callback, beforeChange}) {
      // 切歌前执行的函数
      beforeChange && beforeChange()
      commit('changeDataLoading', true)
      // 切歌程序首先执行歌曲索引切换，保持页面程序的运行
      commit('saveCurrentSongInfo', {
        indexInPlaylist: index
      })
      let server = rootGetters['config/currentServer'].url
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
            songid: data.data[0].id,
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
    },
    // 获取单曲评论
    /* 
    requestSongComment({commit, rootState, state}, {topic, pagenum, }) {
      jsonp(`/songcomment?topic=${topic}&pagenum=${pagenum}&songmid=${songmid}`, {
        name: 'jsoncallback851167396932' + Math.floor((Math.random() * 8999) + 1000)
      }, (err, data) => {
        if (err) console.log('Get Songcommet Failed')
        else {
          if (pagenum === 0) {
            commit('updateCurrentSongComment', {
              type: true,
              comment: {
                comment: {
                  list: data.comment.commnetlist,
                  total: data.comment.commenttotal
                },
                hotcomment: {
                  list: data.hot_commnet.commnetlist,
                  total: data.hot_commnet.commenttotal
                }
              }
            })
          } else {
            commit('updataCurrentSongComment', {
              comment: data.comment.commnetlist
            })
          }
        }
      })
    } */
  }
}
