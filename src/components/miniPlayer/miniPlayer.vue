<template>
  <div class="mini-player-box">
    <v-touch
      @tap="toPlayer"
      @pan="panHandler"
      @swipe="swipeHandler"
      :swipe-options="{threshold: 20}"
      class="order-control"
    >
    <div ref='order' class="order-shadow">
    </div>
      <transition-group
        :name="changeBymini ? 'mini-order' : 'none'"
        class="order-box"
        tag="div"
        :style="panningStyle"
        key="order-group"
      >
        <div
          v-for="item in pcnlist"
          :key="'pnnl'+item.mark"
          class="order-item"
        >
          <div
            v-src="'https://y.gtimg.cn/music/photo_new/T002R300x300M000'+playlist[item.index].albummid+'.jpg?max_age=2592000'"
            class="mini-cover"
          >
          </div>
          <div class="mini-detail">
            <p class="mini-songname">
              {{playlist[item.index].songname}}
            </p>
            <p class="mini-singer">
              {{playlist[item.index].singername}}
            </p>
          </div>
        </div>
      </transition-group>
    </v-touch>
    <div class="control-icons">
      <v-touch
        class="play-control"
        @tap="play"
      >
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="svg-bg">
          已播放
          <path :d="playedSvg" style="stroke:#e82f2f;stroke-width:1;fill:none"/>
          未播放
          <path :d="leftSvg" :style="{stroke: leftColor, 'stroke-width': 1, fill: 'none'}"/>
          控制按钮
          <path :d="buttonSvg" :style="{stroke: buttonColor, 'stroke-width': 1.5, fill: 'none', 'stroke-linejoin': 'round'}"/>
        </svg>
      </v-touch>
      <v-touch
        class="list-toggle iconfont icon-list"
        @tap="showPlaylist=true"
      ></v-touch>
    </div>
    <playlist
      :showPlaylist=showPlaylist
      @close="showPlaylist = false"
    >
    </playlist>
  </div>
</template>
<script>

import {mapState, mapMutations, mapGetters, mapActions} from 'vuex'

import {getCoordinateOnCircle} from '@/utils'

import playlist from '#/overlay/playlist'
const svgR = 15
export default {
  name: 'MiniPlayer',
  components: {
    playlist
  },
  data () {
    return {
      showPlaylist: false,
      pcnlist: '',
      panningStyle: '',
      changeBymini: false,
      protecting: false,
      direction: 'right'
    }
  },
  computed: {
    ...mapState('player', ['currentSong', 'playlist', 'running', 'dataLoading']),
    ...mapGetters('player', ['playOrder', 'progress']),
    joinPoint () {
      let angle = 2 * Math.PI * this.progress
      return getCoordinateOnCircle(svgR, svgR, svgR - 1, angle)
    },
    playedSvg () {
      if (this.dataLoading || this.protecting) {
        return ''
      }
      if (this.progress === 0) {
        return ''
      } else if (this.progress < 1) {
        return `M${svgR},1 A${svgR - 1},${svgR - 1} 0 ${this.progress > 0.5 ? 1 : 0},1 ${this.joinPoint.x},${this.joinPoint.y}`
      } else {
        return `M${svgR},1 A${svgR - 1},${svgR - 1} 0 0,1 ${svgR},${svgR * 2 - 1} A${svgR - 1},${svgR - 1} 0 0,1 ${svgR},1`
      }
    },
    leftSvg () {
      if (this.dataLoading || this.protecting) {
        return `M${svgR},1 A${svgR - 1},${svgR - 1} 0 0,1 ${svgR},${svgR * 2 - 1} A${svgR - 1},${svgR - 1} 0 0,1 ${svgR},1`
      }
      if (this.progress === 0) {
        return `M${svgR},1 A${svgR - 1},${svgR - 1} 0 0,1 ${svgR},${svgR * 2 - 1} A${svgR - 1},${svgR - 1} 0 0,1 ${svgR},1`
      } else if (this.progress === 1) {
        return ''
      } else {
        return `M${this.joinPoint.x},${this.joinPoint.y} A${svgR - 1},${svgR - 1} 0 ${this.progress > 0.5 ? 0 : 1},1 ${svgR},1`
      }
    },
    buttonSvg () {
      if (this.running) {
        return `M${svgR - 3},10 l0,10 Z M${svgR + 3},10 l0,10 Z`
      } else {
        return `M${svgR - 2.5},10 l0,10 l8,-5 Z`
      }
    },
    leftColor () {
      return this.running ? '#ccc' : '#333'
    },
    buttonColor () {
      return this.running ? '#e82f2f' : '#333'
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
      // 保护中的动画无法操作
      if (this.protecting) {
        return false
      }
      // mini-play控制的切歌将执行动画
      this.changeBymini = true
      this.panningStyle = {transform: 'translate3d(' + e.deltaX + 'px,0,0)'}

      if (e.isFinal) {
        // 动画间隔
        let duration = 200

        let totalWidth = this.$refs.order.getBoundingClientRect().width
        if (e.deltaX / totalWidth > 0.45) {
          this.protecting = true
          // 上一首
          this.direction = 'right'
          // 表示切换方向
          this.changeSong({
            type: 'prev',
            beforeChange: () => {
              // 动画完成后取消保护，恢复动画设置
              setTimeout(() => {
                this.protecting = false
                this.changeBymini = false
              }, duration)
              this.panningStyle = {transition: 'all .2s'}
            }
          })
        } else if (e.deltaX / totalWidth < -0.45) {
          this.protecting = true
          // 下一首
          this.direction = 'left'
          this.changeSong({
            type: 'next',
            beforeChange: () => {
              setTimeout(() => {
                this.protecting = false
                this.changeBymini = false
              }, duration)
              this.panningStyle = {transition: 'all .2s'}
            }
          })
        } else {
          // 未触发切歌
          this.panningStyle = {transition: 'all .2s'}
          setTimeout(() => {
            this.protecting = false
            this.changeBymini = false
          }, duration)
        }
      }
    },
    swipeHandler (e) {
      if (this.protecting) {
        return false
      }
      let duration = 200
      this.protecting = true
      this.changeBymini = true
      if (e.deltaX > 0) {
        this.direction = 'right'
        this.changeSong({
          type: 'prev',
          beforeChange: () => {
            setTimeout(() => {
              this.protecting = false
              this.changeBymini = false
            }, duration)
          }
        })
      } else {
        this.direction = 'left'
        this.changeSong({
          type: 'next',
          beforeChange: () => {
            setTimeout(() => {
              this.protecting = false
              this.changeBymini = false
            }, duration)
          }
        })
      }
    }
  },
  created () {
    let songIndex = this.currentSong.indexInPlaylist
    let keyIndex = this.playOrder.indexOf(songIndex)
    let prev = keyIndex - 1 < 0 ? this.playOrder.length - 1 : keyIndex - 1
    let next = keyIndex + 1 > this.playOrder.length - 1 ? 0 : keyIndex + 1
    // 初始显示列表
    this.pcnlist = [
      {
        mark: Date.now() * Math.random(),
        index: this.playOrder[prev]
      },
      {
        mark: Date.now() * Math.random(),
        index: songIndex
      },
      {
        mark: Date.now() * Math.random(),
        index: this.playOrder[next]
      }
    ]
  },
  watch: {
    'currentSong.indexInPlaylist' (val) {
      // 当歌曲变化时，mini-player 列表发生相应变化
      let songIndex = val
      let keyIndex = this.playOrder.indexOf(songIndex)
      let prev = keyIndex - 1 < 0 ? this.playOrder.length - 1 : keyIndex - 1
      let next = keyIndex + 1 > this.playOrder.length - 1 ? 0 : keyIndex + 1

      if (this.changeBymini) {
        if (this.direction === 'right') {
          this.pcnlist.pop()
          this.pcnlist.unshift({
            mark: Date.now() * Math.random(),
            index: this.playOrder[prev]
          })
        } else if (this.direction === 'left') {
          this.pcnlist.shift()
          this.pcnlist.push({
            mark: Date.now() * Math.random(),
            index: this.playOrder[next]
          })
        }
      } else {
        this.pcnlist = [
          {
            mark: Date.now() * Math.random(),
            index: this.playOrder[prev]
          },
          {
            mark: Date.now() * Math.random(),
            index: songIndex
          },
          {
            mark: Date.now() * Math.random(),
            index: this.playOrder[next]
          }
        ]
      }
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
  position: absolute;
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
      margin-left: -100%;
      white-space: nowrap;
      .order-item {
        display: inline-flex;
        box-sizing: border-box;
        width: 100%;
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
    margin-right: 20px;
    height: 30px;
    .svg-bg {
      width: 30px;
      height: 30px;
    }
  }
  .list-toggle {
   font-size: 20px;
   color: #555;
  }
}
</style>
