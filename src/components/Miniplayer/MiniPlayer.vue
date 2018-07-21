<template>
  <div class="mini-player-box">
    <v-touch
      @tap="toPlayer"
      @pan="panHandler"
      @swipe="swipeHandler"
      :swipe-options="{threshold: 20}"
      class="order-control"
    >
    <div class="order-shadow">

    </div>
      <div ref="order" class="order-box">
        <div
          v-for="(item,index) in pcnlist"
          :key="'pnnl'+playlist[item].songmid+index"
          class="order-item"
        >
          <div
            v-src="'https://y.gtimg.cn/music/photo_new/T002R300x300M000'+playlist[item].albummid+'.jpg?max_age=2592000'"
            class="mini-cover"
          >
          </div>
          <div class="mini-detail">
            <p class="mini-songname">
              {{playlist[item].songname}}
            </p>
            <p class="mini-singer">
              {{playlist[item].singername}}
            </p>
          </div>
        </div>
      </div>
    </v-touch>
    <div class="control-icons">
      <v-touch
        class="play-control"
        @tap="play"
      >
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="svg-bg">
          <path :d="playedSvg" style="stroke:#e82f2f;stroke-width:1;fill:none"/>
          <path :d="leftSvg" :style="{stroke: leftColor}" style="stroke-width:1;fill:none"/>
        </svg>

        <span class="mini-running iconfont icon-pause-nocircle" v-if="running">
        </span>
        <span class="mini-paused iconfont icon-play-nocircle" v-else>
        </span>
      </v-touch>
      <span class="list-toggle iconfont icon-list"></span>
    </div>
  </div>
</template>
<script>
import {Swipe, SwipeItem} from 'mint-ui'

import {mapState, mapMutations, mapGetters, mapActions} from 'vuex'

import {getCoordinateOnCircle} from '@/utils'

const scgR = 15
export default {
  name: 'MiniPlayer',
  components: {
    Swipe,
    SwipeItem
  },
  computed: {
    ...mapState('player', ['currentSong', 'playlist', 'running']),
    ...mapGetters('player', ['playOrder', 'progress']),
    pcnlist () {
      let songIndex = this.currentSong.indexInPlaylist

      let keyIndex = this.playOrder.indexOf(songIndex)
      let prev = keyIndex - 1 < 0 ? this.playOrder.length - 1 : keyIndex - 1
      let next = keyIndex + 1 > this.playOrder.length - 1 ? 0 : keyIndex + 1
      if (this.$refs.order) {
        this.$nextTick(() => {
          // eslint-disable-next-line
          this.protecting = false
          // eslint-disable-next-line
          this.$refs.order.style.transition = ''
          // eslint-disable-next-line
          this.$refs.order.style.transform = ''
        })
      }
      return [this.playOrder[prev], songIndex, this.playOrder[next]]
    },
    joinPoint () {
      let angle = 2 * Math.PI * this.progress
      return getCoordinateOnCircle(scgR, scgR, scgR - 1, angle)
    },
    playedSvg () {
      if (this.progress === 0) {
        return ''
      } else if (this.progress < 1) {
        return `M${scgR},1 A${scgR - 1},${scgR - 1} 0 ${this.progress > 0.5 ? 1 : 0},1 ${this.joinPoint.x},${this.joinPoint.y}`
      } else {
        return `M${scgR},1 A${scgR - 1},${scgR - 1} 0 0,1 ${scgR},${scgR * 2 - 1} A${scgR - 1},${scgR - 1} 0 0,1 ${scgR},1`
      }
    },
    leftSvg () {
      if (this.progress === 0) {
        return `M${scgR},1 A${scgR - 1},${scgR - 1} 0 0,1 ${scgR},${scgR * 2 - 1} A${scgR - 1},${scgR - 1} 0 0,1 ${scgR},1`
      } else if (this.progress === 1) {
        return ''
      } else {
        return `M${this.joinPoint.x},${this.joinPoint.y} A${scgR - 1},${scgR - 1} 0 ${this.progress > 0.5 ? 0 : 1},1 ${scgR},1`
      }
    },
    leftColor () {
      return this.running ? '#ccc' : '#333'
    }
  },
  methods: {
    ...mapMutations('player', ['changePlayState']),
    ...mapActions('player', ['changeSong']),
    toPlayer () {
      this.$router.push('/player')
    },
    play () {
      this.changePlayState('toggle')
    },
    panHandler (e) {
      if (this.protecting) {
        return false
      }
      this.$refs.order.style.transform = 'translate3d(' + e.deltaX + 'px,0,0)'

      if (e.isFinal) {
        // 动画间隔
        let duration = 200
        this.protecting = true
        this.$refs.order.style.transition = 'all ' + duration + 'ms'
        let totalWidth = this.$refs.order.getBoundingClientRect().width
        if (e.deltaX / totalWidth > 0.5) {
          // 上一首
          this.$refs.order.style.transform = 'translate3d(100%,0,0)'
          setTimeout(() => {
            this.changeSong({
              type: 'prev'
            })
          }, duration)
        } else if (e.deltaX / totalWidth < -0.5) {
          // 下一首
          this.$refs.order.style.transform = 'translate3d(-100%,0,0)'
          setTimeout(() => {
            this.changeSong({
              type: 'next',
              callback: () => {

              }
            })
          }, duration)
        } else {
          // 未触发切歌
          this.$refs.order.style.transform = ''
          setTimeout(() => {
            this.$refs.order.style.transition = ''
            this.protecting = false
          }, duration)
        }
      }
    },
    swipeHandler (e) {
      let duration = 200
      this.protecting = true
      this.$refs.order.style.transition = 'all ' + duration + 'ms'
      if (e.deltaX > 0) {
        this.$refs.order.style.transform = 'translate3d(100%,0,0)'
        setTimeout(() => {
          this.changeSong({
            type: 'prev'
          })
        }, duration)
      } else {
        this.$refs.order.style.transform = 'translate3d(-100%,0,0)'
        setTimeout(() => {
          this.changeSong({
            type: 'next'
          })
        }, duration)
      }
    }
  },
  watch: {
    'currentSong.src' () {
      // this.protecting = false
      //           this.$refs.order.style.transition = ''
      //           this.$refs.order.style.transform = ''
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/style/scss.config.scss';
.mini-player-box {
  box-sizing: border-box;
  height: 50px;
  width: 100%;
  border-top: 0.1px solid #eee;
  position: fixed;
  left: 0;
  bottom: 0;
  background: white;
  z-index: 300;
  display: flex;
  padding: 5px 0;
  .order-control {
    flex: 1;
    height: 100%;
    overflow: hidden;
    position: relative;
    .order-shadow {
      position: absolute;
      z-index: 2;
      width: 100%;
      height: 100%;
      background-image: repeating-linear-gradient(to right,white, transparent 10px, transparent 93%, white 100%);
    }
    .order-box {
      width: 100%;
      display: flex;
      margin-left: -100%;
      .order-item {
        box-sizing: border-box;
        flex-shrink: 0;
        width: 100%;
        display: flex;
        padding: 0 7px;
      }
    }
    .mini-cover {
      height: 39px;
      width: 39px;
      background: {
        size: 100%;
        position: center;
        repeat: no-repeat;
      }
    }
    .mini-detail {
      flex: 1;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding-left: 7px;
      .mini-songname {
        white-space: nowrap;
        overflow: hidden;
        font-size: 14px;
      }
      .mini-singer {
        color: #aaa;
        font-size: 12px;
      }
    }
  }
  .control-icons {
    display: flex;
    align-items: center;
    padding: 0 10px;
  }
  .play-control {
    position: relative;
    margin-right: 20px;
    height: 30px;
    width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    .iconfont {
      position: relative;
      font-size: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 600;
      z-index: 2;
    }
    .mini-paused {
      color: #333;
    }
    .mini-running {
      color: $theme-color;
    }
    .svg-bg {
      width: 30px;
      height: 30px;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  .list-toggle {
   font-size: 20px;
   color: #555;
  }
}
</style>
