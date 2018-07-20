<template>
  <detail-page2
    :title="'歌单'"
    :sub-title="null"
    :cover="currentList.imgurl"
    :cover-bg="false"
    :listen-num="cdinfo.visitnum"
    :banner-title="currentList.dissname"
    :headimg='cdinfo.headurl'
    :person="currentList.creator.name"
    :comment-num="commenttotal"
    share-num="分享"
    banner-time="发行时间：2018.7.13"
    :song-num="cdinfo.songnum"
    :fav-num="favNum"
    :songlist="songlist"
    :dissid="currentList.dissid"
    v-if="currentList"
  />
</template>
<script>
import detailPage2 from '#/common/detailFramework2'
import {mapState} from 'vuex'
import jsonp from 'jsonp'

export default {
  components: {
    detailPage2
  },
  data () {
    return {
      cdinfo: {
        desc: '',
        ifpicurl: '',
        songnum: 0
      },
      commenttotal: '评论',
      favNum: 0,
      songlist: []
    }
  },
  computed: {
    ...mapState('songSheet', ['currentList']),
    ...mapState('config', ['server'])
  },
  methods: {
    initData () {
      // 获取评论数量
      jsonp(`${this.server}/commenttotal?topic=${this.currentList.dissid}`, {
        name: 'jsoncallback9210216379563' + Math.floor((Math.random() * 899) + 100)
      }, (err, data) => {
        if (err) console.log('Get Commenttotal Failed')
        else this.commentNum = data.batch_commenttotal[0].commenttotal
      })

      // 收藏量
      jsonp(`${this.server}/favNum?dissid=${this.currentList.dissid}`, {
        name: 'getFavNum42076' + Math.floor((Math.random() * 89999) + 10000)
      }, (err, data) => {
        if (err) console.log('Get FavNum Failed')
        else this.favNum = data.totalnum
      })
      // cd信息、歌曲列表
      jsonp(`${this.server}/playlist?dissid=${this.currentList.dissid}`, {
        name: 'playlistinfoCallback'
      }, (err, data) => {
        if (err) console.log('Get Playlistinfo Failed')
        else {
          this.cdinfo = data.cdlist[0]

          let songlist = []
          for (let {
            albummid,
            albumname,
            singer: [{mid: singermid, name: singername}],
            songmid,
            songname
          } of data.cdlist[0].songlist) {
            songlist.push({albummid, albumname, singermid, singername, songmid, songname})
          }
          this.songlist = songlist
        }
      })
    }
  },
  created (to, from, next) {
    if (!this.currentList) {
      this.$router.replace('/songSheet')
      return
    }
    this.initData()
  },
  activated () {
    this.initData()
  }
}
</script>
