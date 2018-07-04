<template>
  <div id="app">
    <button @click="songSheet">songSheet</button>
    <button @click="playlist">playlist</button>
    <button @click="songinfo">songinfo</button>

    <div>
      <div
        v-for="(song,index) in songlist"
        :key="song.id"
      >
        <button @click="songfile(index)">{{song.songname}}</button>
        <button @click="songlyric(index)">歌词{{song.songname}}</button>
      </div>
    </div>
    <!-- <button @click="songfile(0)">songfile</button>
    <button @click="songfile(1)">songfile2</button> -->
    <!-- <button @click="songlyric">lyric</button> -->
    <audio :src="src" controls></audio>

    <pre>{{lyric}}</pre>
    <pre>{{trans}}</pre>
  </div>
</template>

<script>
import jsonp from 'jsonp'
function url (path) {
  return `http://localhost:8080${path}`
}
export default {
  data () {
    return {
      recomplaylist: null,
      songlist: null,
      guid: '',
      src: '',
      lyric: '',
      trans: ''
    }
  },
  created () {
    let guid = localStorage.getItem('guid')
    if (guid) {
      this.guid = guid
    } else {
      let t = new Date().getUTCMilliseconds()
      let guid = Math.round(2147483647 * Math.random()) * t % 1e10
      localStorage.setItem('guid', guid)
      this.guid = guid
    }
  },
  methods: {
    songSheet () {
      jsonp(url('/songSheet'), {
        name: 'recom0289'
      }, (err, data) => {
        if (err) console.log(err)
        else console.log(data)

        // 歌单列表
        this.songSheet = data.recomPlaylist.data.v_hot
      })
    },
    playlist () {
      jsonp(url('/playlist?disstid=' + this.songSheet[0].content_id), {
        name: 'playlistinfoCallback'
      }, (err, data) => {
        if (err) console.log(err)
        else console.log(data)

        this.songlist = data.cdlist[0].songlist
      })
    },
    songinfo () {
      jsonp(url('/songinfo?songmid=' + this.songlist[0].songmid), {
        name: 'getOneSongInfoCallback'
      }, (err, data) => {
        if (err) console.log(err)
        else console.log(data)
      })
    },
    songfile (n) {
      jsonp(url(`/songfile?songmid=${this.songlist[n].songmid}&filename=C400${this.songlist[n].songmid}.m4a&guid=${this.guid}`), {
        name: 'MusicJsonCallback6076066425315285'
      }, (err, data) => {
        if (err) console.log(err)
        else {
          console.log(data)
          this.src = `http://dl.stream.qqmusic.qq.com/${data.data.items[0].filename}?vkey=${data.data.items[0].vkey}&guid=${this.guid}&uin=0&fromtag=66`
        }
      })
    },
    songlyric (n) {
      jsonp(url('/songlyric?songmid=' + this.songlist[n].songmid), {
        name: 'MusicJsonCallback_lrc'
      }, (err, data) => {
        if (err) console.log(err)
        else console.log(data)

        // window.lyric = this.lyric = data.lyric

        function decodeBase64 (str) {
          return decodeURIComponent(atob(str).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
          }).join(''))
        }

        function decodeBase64_2 (str) {
          return decodeURIComponent(escape(atob(str)))
        }

        this.lyric = decodeBase64(data.lyric)
        if (data.trans) {
          this.trans = decodeBase64(data.trans)
        }
      })
    }
  }
}
</script>
