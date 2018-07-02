<template>
  <div id="app">
    <AudioPlayer></AudioPlayer>
    <router-view></router-view>
    <router-view name="mini-player"></router-view>
    <audio controls :src="src">
      <source :src="src">
    </audio>
  </div>
</template>

<script>
/* eslint-disable */
import AudioPlayer from '#/AudioPlayer/AudioPlayer'

import {mapState, mapMutations} from 'vuex'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    AudioPlayer
  },
  data () {
    return {
      src:''
    }
  },
  mounted () {
    this.src="http://dl.stream.qqmusic.qq.com/C400000Mxw3T3gA9rn.m4a?vkey=AFB76F94964CF558F4E3C7C21F517BAD563A910D6976FA3FA022E54FFD2906BE7C14D66B94E62BDFF6CB887B16B9E87CE40409F68BC3DDBF&guid=8470277379&uin=0&fromtag=66"

    // 'http://dl.stream.qqmusic.qq.com/C400000Mxw3T3gA9rn.m4a?vkey=78CC62F8E280C804A092C26EC9A6D179C905786DE5CEE0408303DB6CA46221FA82E1CFEF385F14121391BF1D30866FDE20DDA4DC90C21AF7&guid=8470277375&uin=0&fromtag=66'
    /*
    // axios({
    //   method:'get',
    //   url: 'https://api.hibai.cn/api/index/index',
    //   data: {
    //     "TransCode": "020112",
    //     "OpenId": "123456789",
    //     "Body": {
    //         "SongListId": "984506585"
    //     }
    //   },
    //   responseType: 'json'
    // })

    // let instance = axios.create({
    //   headers: {'referer':'https://y.qq.com/n/yqq/playlist/4183597652.html'}
    // })
    // instance.get('https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg?type=1&json=1&utf8=1&onlysong=0&disstid=4183597652&format=jsonp&g_tk=5381&jsonpCallback=playlistinfoCallback&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0')
    // .then((res) => {
    //   console.log(res)
    // })
    // this.playlistPush('0001')
let t = (new Date).getUTCMilliseconds()
    let guid = Math.round(2147483647 * Math.random()) * t % 1e10
    document.cookie = "pgv_pvid=" + guid + "; Expires=Sun, 18 Jan 2038 00:00:00 GMT; PATH=/; DOMAIN=qq.com;"

let instance = axios.create({
  headers:{
    cookie:document.cookie
  }
})
console.log(document.cookie)

    instance.get('https://utherapi.browser.qq.com/qbweb/report?_ApplicationId=qbweb&stComm={%22sGuid%22:%22a999efb9e03e4284ba123ece73b5e1b2%22}&vProtocols_Function=[{%22iProtocol%22:8888,%22iKey%22:522,%22iValueI%22:1,%22iValueII%22:1,%22iValueIII%22:1,%22sValueI%22:%22onload%22,%22sValueII%22:%22%7B%5C%22ua%5C%22%3A%5C%22mozilla%2F5.0%20(windows%20nt%2010.0%3B%20wow64)%20applewebkit%2F537.36%20(khtml%2C%20like%20gecko)%20chrome%2F67.0.3396.99%20safari%2F537.36%5C%22%2C%5C%22locationHref%5C%22%3A%5C%22https%3A%2F%2Fy.qq.com%2Fportal%2Fplayer.html%5C%22%7D%22,%22sValueIII%22:%22%22}]&r=0.22346810367207537')

    
    // axios.get(`http://dl.stream.qqmusic.qq.com/C400000Mxw3T3gA9rn.m4a?vkey=0AC3B69393F818B381562F1B33656C0234FBA8A812490699C207CBC8670F1FE321231A059932B10BA99664F868CBBDB7C5FE1F768EC5631F&guid=${guid}&uin=0&fromtag=66`)
    this.src = `http://dl.stream.qqmusic.qq.com/C400000Mxw3T3gA9rn.m4a?vkey=0AC3B69393F818B381562F1B33656C0234FBA8A812490699C207CBC8670F1FE321231A059932B10BA99664F868CBBDB7C5FE1F768EC5631F&guid=${guid}&uin=0&fromtag=66`
    */

   axios.get('https://u.y.qq.com/cgi-bin/musicu.fcg?callback=recom1639464332002405&g_tk=5381&jsonpCallback=recom1639464332002405&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%7D%2C%22recomPlaylist%22%3A%7B%22method%22%3A%22get_hot_recommend%22%2C%22param%22%3A%7B%22async%22%3A1%2C%22cmd%22%3A2%7D%2C%22module%22%3A%22playlist.HotRecommendServer%22%7D%7D')
  .then(res=>{
    console.log(res)
  })
  },
  methods: {
    ...mapMutations(['playlistPush'])
  }
}
</script>

<style>

</style>
