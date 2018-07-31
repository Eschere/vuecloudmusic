<template>
<transition name="fade">
<div class="player-page">
  <div
    class="page-bg"
    :style="{backgroundImage: 'url('+pageBg+')'}"
  >

  </div>
  <div class="player-header">
    <v-touch
      @tap="$router.go(-1)"
      class="back"
    ></v-touch>
    <div ref="firstTitle" class="header-title">
      <div class="first-title-box">
        <p class="first-title-content">{{currentSong.songname}}</p>
      </div>
      <div class="sub-title">{{currentSong.singer}}</div>
    </div>
    <span class="share iconfont icon-share">
    </span>
  </div>
  <div class="player-main">
    <transition name='fast-fade'>
      <keep-alive>
        <div
          :is="showing"
          @togglepage="togglePage"
        >
        </div>
      </keep-alive>
    </transition>
  </div>
  <div class="player-footer">
    <!-- 播放进度 -->
    <div class="progress-area">
      <span class="current-time">{{currentTimeStr}}</span>
      <v-touch
        tag="div"
        class="progress-can-touch"
        @tap="changeProgressTap"
        @pan="changeProgressPan"
      >
        <div
          ref="progress"
          class="progress-bar"
        >
          <div :style="{width: loadProgress}" class="load-progress">
          </div>
          <div :style="{width: progressWidth}" class="progress">
            <span class="progress-icon" :class="{loading: dataLoading}"></span>
          </div>
        </div>
      </v-touch>
      <span class="duration">{{durationStr}}</span>
    </div>
    <!-- 控制按钮 -->
    <div class="control-area">
      <v-touch
        class="loop-type iconfont"
        :class="loopTypeClass"
        @tap="toggleLoopType"
        v-touch-light
      ></v-touch>
      <v-touch
        class="prev iconfont icon-prev"
        @tap="changeSong({type:'prev'})"
        v-touch-light
      ></v-touch>
      <v-touch
        class="play iconfont icon-play-fill"
        :class="running ? 'icon-pause' : 'icon-play-fill'"
        @tap="changePlayState('toggle')"
        v-touch-light
      ></v-touch>
      <v-touch
        class="next iconfont icon-next"
        @tap="changeSong({type:'next'})"
        v-touch-light
      ></v-touch>
      <v-touch
        class="show-playlist iconfont icon-list"
        v-touch-light
        @tap="playlistOn"
      ></v-touch>
    </div>
  </div>
  <playlist
    :showPlaylist="showPlaylist"
    @close="showPlaylist=false"
  >
  </playlist>
</div>
</transition>
</template>

<script>
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
import {formatTime} from '@/utils'

import cd from './cd'
import lyric from './lyric'
import playlist from '#/overlay/playlist'
export default {
  components: {
    cd,
    lyric,
    playlist
  },
  data () {
    return {
      showPlaylist: false,
      pageBg: '',
      showing: 'cd',
      title: '',
      timeSetting: null,
      progressBarWidth: '',
      progressBarOffset: ''
    }
  },
  computed: {
    ...mapState('player', ['running', 'playlist', 'currentSong', 'duration', 'currentTime', 'loadedTime', 'loopType', 'dataLoading']),
    ...mapGetters('player', ['progress']),
    durationStr () {
      return formatTime(this.duration)
    },
    currentTimeStr () {
      if (this.timeSetting !== null) {
        return formatTime(this.timeSetting)
      } else {
        return formatTime(this.currentTime)
      }
    },
    progressWidth () {
      if (this.timeSetting !== null) {
        return this.timeSetting / this.duration * 100 + '%'
      } else {
        return this.progress * 100 + '%'
      }
    },
    loadProgress () {
      if (this.duration === 0) {
        return 0
      }
      return this.loadedTime / this.duration * 100 + '%'
    },
    loopTypeClass () {
      switch (this.loopType) {
        case 'proper':
          return 'icon-circle'
        case 'single':
          return 'icon-single'
        case 'random':
          return 'icon-random'
      }
    }
  },
  methods: {
    ...mapMutations('player', ['setCurrentTime', 'toggleLoopType', 'changePlayState']),
    ...mapActions('player', ['changeSong']),
    // 滚动条来回滚动
    scrollRound (scroll, end) {
      if (scroll.maxScrollX < -30) {
        setTimeout(() => {
          scroll.scrollTo(end, 0, scroll.maxScrollX / -30 * 1000, {style: 'cubic-bezier(0, 0, 1, 1)'})
        }, 2000)
      }
    },
    togglePage () {
      if (this.showing === 'cd') {
        this.showing = 'lyric'
      } else if (this.showing === 'lyric') {
        this.showing = 'cd'
      }
    },
    playlistOn () {
      this.showPlaylist = true
    },
    changeProgressPan (e) {
      let time = (e.center.x - this.progressBarOffset) / this.progressBarWidth * this.duration
      this.timeSetting = time < 0 ? 0 : time > this.duration ? this.duration : time
      if (e.isFinal) {
        this.setCurrentTime(this.timeSetting)
        setTimeout(() => {
          this.timeSetting = null
        }, 100)
      }
    },
    changeProgressTap (e) {
      let time = (e.center.x - this.progressBarOffset) / this.progressBarWidth * this.duration
      this.setCurrentTime(time)
    }
  },
  mounted () {
    setTimeout(() => {
      let img = new Image()
      img.src = this.currentSong.albumcover
      img.onload = () => {
        this.pageBg = img.src
        img = null
      }
    }, 1000)

    let scroll = this.title = new window.IScroll(this.$refs.firstTitle, {
      scrollX: true,
      scrollY: false,
      bounce: false,
      click: false,
      disableMouse: true,
      disablePointer: true,
      disableTouch: true,
      bounceEasing: {
        style: 'cubic-bezier(0,0,1,1)'
      }
    })

    scroll.on('scrollEnd', () => {
      if (scroll.maxScrollX === scroll.x) {
        this.scrollRound(scroll, 0)
      } else if (scroll.x === 0) {
        this.scrollRound(scroll, scroll.maxScrollX)
      }
    })

    this.scrollRound(scroll, scroll.maxScrollX)

    let progressRect = this.$refs.progress.getBoundingClientRect()
    this.progressBarOffset = progressRect.x || progressRect.left
    this.progressBarWidth = progressRect.width
  },
  deactivated () {
    this.showing = 'cd'
  },
  watch: {
    'playlist.length' (val) {
      if (val === 0 && this.$route.path === '/player') {
        this.$router.replace('/')
      }
    },
    'currentSong.src' () {
      this.title.scrollTo(0, 0, 0)
      this.$nextTick(() => {
        setTimeout(() => {
          this.title.refresh()
          this.scrollRound(this.title, this.title.maxScrollX)
        }, 1000)
      })

      setTimeout(() => {
        let img = new Image()
        img.src = this.currentSong.albumcover
        img.onload = () => {
          this.pageBg = img.src
          img = null
        }
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/scss.config.scss';
.player-page {
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding-top: 50px;
  flex: 1;

  .page-bg {
    background-color: #545454;
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    filter: blur(30px) brightness(50%);
    transform: scale3d(1.5, 1.5, 1);
    transition: background 2s;
  }
  .player-header {
    position: absolute;
    top: 0;
    left: 0;
    height: 50px;
    width: 100vw;
    display: flex;
    align-items: center;
    color: white;
    .back {
      width: 25 / $base + rem;
      height: 25 / $base + rem;
      background: url('~@/components/common/img/ow.png') no-repeat center / 100%;
      margin: 0 20px;
    }
    .header-title {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      overflow: hidden;
      .first-title-box {
        align-self: flex-start;
        .first-title-content {
          font-size: 16px;
          font-weight: 600;
          white-space: nowrap;
        }
      }
      .sub-title {
        font-size: 12px;
        color: #aaa;
      }
    }
    .share {
      font-size: 25px;
      margin: 0 20px;
    }
  }
  .player-main {
    overflow: hidden;
    position: relative;
    flex: 1;
  }
  .player-footer {
    position: relative;
    .progress-area {
      display: flex;
      margin: 15px;
      justify-content: space-around;
      align-items: center;
      .current-time,
      .duration {
        font-size: 12px;
        font-size: 10px;
        color: #eee;
      }
      .progress-can-touch {
        margin: 0 15px;
        flex: 1;
        height: 14px;
        display: flex;
        align-items: center;
      }
      .progress-bar {
        width: 100%;
        height: 3px;
        background-color: rgba($color: white, $alpha: 0.1);
        position: relative;
        border-radius: 3px;
      }
      .load-progress {
        border-radius: 3px;
        height: 100%;
        background-color: rgba(white, 0.3);
        position: absolute;
      }
      .progress {
        border-radius: 3px;
        height: 100%;
        background-color: $theme-color;
        position: absolute;
        .progress-icon {
          position: absolute;
          display: inline-block;
          width: 3px;
          height: 3px;
          border: 5px solid white;
          border-radius: 50%;
          background: $theme-color;
          right: -6.5px;
          top: -6.5 + 1.5px;
        }
        .progress-icon.loading::after {
          content: '';
          position: absolute;
          top: -5px;
          left: -5px;
          width: 13px;
          height: 13px;
          background: url('~@/components/common/img/loading.png') center / 100%;
          animation: loading 2s linear infinite;
        }
      }
    }
    .control-area {
      margin: 20px 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .loop-type,
      .show-playlist {
        font-size: 22px;
        color: rgba(white, 0.6);
      }
      .prev,
      .next {
        color: rgba($color: #eee, $alpha: 0.8);
        font-size: 28px;
      }
      .play {
        color: rgba(#eee, 0.9);
        font-size: 50px;
        margin: 0 -15px;
        font-weight: 100;
      }
    }
  }
}
</style>
