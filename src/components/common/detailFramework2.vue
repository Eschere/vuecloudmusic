<template>
<div
  class="detail-page"
  :style="{paddingBottom: playlist.length ? '50px' : ''}"
>
  <div class="page-bg"
    :style="{backgroundImage: 'url('+cover+')'}"
  >
  </div>

    <head class="detail-head">
      <div class="head-bg"
        :style="{backgroundImage: 'url('+cover+')',opacity: opacity}"
      >
      </div>
      <v-touch
        tag="span"
        class="back"
        @tap="back"
      >
      </v-touch>
      <div class="title-area">
        <p class="title" ref="title" :key="'detailtitle'+dissid" >{{realTitle}}</p>
        <p class="sub-title" v-if="subTitle">{{subTitle}}</p>
      </div>
      <div class="icon-area">
        <span class="search-icon"></span>
      </div>
    </head>

  <div ref="scroll" class="detail-main">
    <div class="main-content">
      <div class="banner" :style="{opacity:hOpacity}">
        <div
          :class="{'banner-cover': coverBg}"
        >
          <div class="banner-image">
            <img :src="cover">
            <span class="listen-badge" v-if="listenNum">{{listenNum >= 100000 ? Math.floor(listenNum/10000)+'万':listenNum}}</span>
          </div>
        </div>
        <div class="banner-text">
          <h4 class="banner-title">{{bannerTitle}}</h4>
          <div class="banner-person">
            <img v-if="headimg" :src="headimg">
            <span>{{person}}</span>
          </div>
          <p class="banner-time">{{bannerTime}}</p>
        </div>
      </div>
      <!-- 操作按钮 -->
      <div class="operation-icon" :style="{opacity:hOpacity}">
        <span class="op-i">
          <i class="iconfont icon-comment"></i>
          <span>{{commentNum}}</span>
        </span>
        <span class="op-i">
          <i class="iconfont icon-share"></i>
          <span>{{shareNum}}</span>
        </span>
        <span class="op-i">
          <i class="iconfont icon-download"></i>
          <span>下载</span>
        </span>
        <span class="op-i">
          <i class="iconfont icon-mutiple-check"></i>
          <span>多选</span>
        </span>
      </div>
      <!-- 歌曲列表 -->
      <div class="song-list" ref="list">
        <div class="list-head">
          <div class="play-all">
            <span class="play-icon iconfont icon-play-fill"></span>
            <span>播放全部<small>(共{{songNum}}首)</small></span>
          </div>
          <div class="favorite">
            <span>+&ensp;收藏({{favNum}})</span>
          </div>
        </div>

        <!-- 歌曲 -->
        <div
          class="song-item"
          v-for="(song,index) in songlist"
          :key="'sssongitem'+song.songmid"
        >
          <v-touch
            class="song-detail"
            @tap="play(index)"
          >
            <span class="song-playing-index iconfont icon-volume" v-if="currentSong.songmid === song.songmid"></span>
            <span class="song-index" v-else>{{index+1}}</span>
            <div class="center">
              <p class="song-name">{{song.songname}}</p>
              <p class="singer-name">{{song.singername}}</p>
            </div>
          </v-touch>
          <v-touch
            class="song-operation iconfont icon-more-item"
            @tap="showDetail(song.songmid)"
          ></v-touch>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>

import {mapState, mapMutations, mapActions} from 'vuex'

export default {
  props: ['title', 'subTitle', 'cover', 'person', 'bannerTitle', 'coverBg', 'headimg', 'bannerTime', 'commentNum', 'shareNum', 'songNum', 'favNum', 'listenNum', 'songlist', 'dissid'],
  data () {
    return {
      opacity: 0,
      hOpacity: 1,
      realTitle: ''
    }
  },
  methods: {
    ...mapMutations('player', ['savePlaylist', 'saveCurrentSongInfo']),
    ...mapActions('player', ['requestSongInfo']),
    back () {
      this.$router.go(-1)
    },
    play (index) {
      if (this.currentSong.songmid === this.songlist[index].songmid) {
        this.$router.push('/player')
        return
      }

      if (!this.playlist.length) {
        this.$router.push('/player')
      }
      // 保存播放列表到本地
      this.savePlaylist(this.songlist)

      // 在列表保存到store后进行请求数据及播放操作
      this.$nextTick(() => {
        this.requestSongInfo({index})
      })
    },
    showDetail () {

    }
  },
  computed: {
    ...mapState('player', ['guid', 'currentSong', 'playlist']),
    ...mapState('config', ['server'])
  },
  mounted () {
    // 滚动相关事件
    this.realTitle = this.title
    this.$refs.scroll.addEventListener('scroll', (e) => {
      let max = this.$refs.list.offsetTop
      let opacity = e.target.scrollTop / max
      if (opacity > 1) {
        opacity = 1
        this.realTitle = this.bannerTitle
      } else {
        this.realTitle = this.title
      }
      let hOpacity = 1 - opacity
      if (hOpacity < 0.5) {
        hOpacity = 0.5
      }
      this.opacity = opacity
      this.hOpacity = hOpacity
    })
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/scss.config.scss";
.detail-page {
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  .page-bg{
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    filter: blur(30px) brightness(90%);
    transform: scale(1.3);
  }
  .banner {
    display: flex;
    justify-content: space-around;
    padding: 5vw;
    .banner-cover {
      width: (229 / 192 * 35) + vw;
      height: 35vw;
      background: url('~@/components/common/img/cd-cover.png') no-repeat;
      background-size: auto 100%;
    }
    .banner-image {
      width: 35vw;
      height: 35vw;
      position: relative;
      .listen-badge {
        background: url('~@/components/common/img/badge-headset.png') no-repeat left/auto 100%;
        font-size: 12px;
        line-height: 12px;
        position: absolute;
        top: 5px;
        right: 5px;
        z-index: 1;
        text-indent: 15px;
        color: white;
      }
      img {
        border-radius: 5px;
        width: 100%;
      }
    }
    .banner-text {
      width: 45vw;
      display: flex;
      justify-content: space-around;
      flex-direction: column;
      .banner-title {
        color: white;
        font-weight: 600;
      }
      .banner-person,
      .banner-time {
        color: #eee;
        font-size: 13px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .banner-person {
        height: 25px;
        display: flex;
        align-items: center;
        img {
          height: 100%;
          border-radius: 50%;
          margin-right: 10px;
        }
      }
    }
  }
  .detail-main {
    position: relative;
    flex: 1;
    height: 100%;
    overflow: auto;
    .main-content {
      margin-top: 50px;
    }
    .operation-icon {
      display: flex;
      margin: 3vw;
      justify-content: space-around;
      .op-i {
        color: white;
        font-size: 12px;
        width: 25px;
        height: 43px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif,'微软雅黑';
        .iconfont {
          font-size: 20px;
        }
      }
    }
  }
  .song-list {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background-color: white;
    overflow: hidden;
    .list-head {
      font-size: 16px;
      height: 45px;
      display: flex;
      align-items: center;
      border-bottom: 0.1px solid #eee;
      .play-all{
        height: 100%;
        flex: 1;
        padding-left: 15px;
        display: flex;
        align-items: center;
        small {
          color: #999;
        }
        .play-icon {
          margin-right: 15px;
          font-size: 23px;
        }
      }
      .favorite {
        color: #eee;
        height: 100%;
        line-height: 45px;
        padding: 0 10px;
        background-color: $theme-color;
      }
    }
    .song-item {
      height: 50px;
      border-bottom: 0.1px solid #eee;
      padding: 0 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .song-detail {
        flex: 1;
        display: flex;
        align-items: center;
        overflow: hidden;
        padding-right: 5px;
      }
      .song-index {
        width: 20px;
        height: 100%;
        line-height: 50px;
        padding-right: 15px;
        text-align: center;
        color: #999;
      }
      .song-playing-index {
        width: 20px;
        padding-right: 15px;
        font-size: 15px;
        text-align: center;
        color: $theme-color;
      }
      .center {
        flex: 1;
        overflow: hidden;
      }
      @mixin song-text {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      .song-name {
        @include song-text();
        font-size: 15px;
        margin-bottom: 5px;
      }
      .singer-name {
        @include song-text();
        font-size: 12px;
        color: #aaa;
      }
      .song-operation {
        font-size: 16px;
        color: #ccc;
      }
    }
  }
}

.detail-head {
    position: fixed;
    top: 0;
    height: 50px;
    width: 100vw;
    display: flex;
    align-items: center;
    display: flex;
    z-index: 10;
    overflow: hidden;
    .head-bg {
      @extend .page-bg;
    }
    .back {
      position: relative;
      width: 25 / $base + rem;
      height: 25 / $base + rem;
      background: url('~@/components/common/img/ow.png') no-repeat center / 100%;
      margin: 0 20px;
    }
    .title-area {
      position: relative;
      flex: 1;
      overflow: hidden;
      .title {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        width: 100%;
        color: white;
        font-weight: 500;
        font-size: 18 / $base + rem;
      }
      .sub-title {
        width: 100%;
        color: #ccc;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        font-size: 12px;
        font-size: 10px;
      }
    }
    .icon-area {
      position: relative;
      .search-icon {
        display: inline-block;
        width: 25 / $base + rem;
        height: 25 / $base + rem;
        background: url('~@/components/common/img/icon-search.png') no-repeat center / 100%;
        margin: 0 20px;
      }
    }
  }
</style>
