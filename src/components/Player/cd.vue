<template>
<div class="cd-page">
  <v-touch
    class="cd-main"
    @tap="togglePage"
    @pan="panHandler"
    @swipe="swipeHandler"
  >
    <!-- 磁头 -->
    <div class="cd-head">
      <div class="cd-heads" :class="(running && !doingChangeSong) ? '': 'pause'">
      </div>
    </div>
    <!-- cd封面 -->
    <div class="cd-cover-box"></div>
      <transition-group
        tag="div"
        name="mini-order"
        class="cd-cover-list"
        :style="panningStyle"
        @enter="enter"
        @leave="leave"
      >
        <div
          v-for="(item,index) in pnncd"
          :key="item.mark"
          class="cd-cover-item"
        >
          <div
            class="cd-cover-bg"
            :class="(running && !doingChangeSong && index === 1) ? 'running' : ''"
            :style="{animation: stopAnimation}"
          >
            <div
              class="cd-cover"
              v-src:before-cover="'https://y.gtimg.cn/music/photo_new/T002R300x300M000'+playlist[item.index].albummid+'.jpg?max_age=2592000'"
            >
            </div>
          </div>
        </div>
      </transition-group>
  </v-touch>
  <div class="operation-group">
    <span class="iconfont icon-heart" v-touch-light></span>
    <span class="iconfont icon-download" v-touch-light></span>
    <span class="comment"  v-touch-light>
      <span class="iconfont icon-comment" :class="{shownum: commentnum}"></span>
      <span class="comment-num">{{commentnum}}</span>
    </span>
    <span class="iconfont icon-more-item" v-touch-light></span>
  </div>
</div>
</template>
<script>
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
import jsonp from 'jsonp'

export default {
  props: ['direction'],
  data () {
    return {
      pnncd: [], // 长度为3，表示上一首· 正在播放· 下一首 歌曲的位置
      panningStyle: '', // 拖动距离
      protecting: '', // 切歌操作正在受限制
      doingChangeSong: '', // 正在进行切歌操作
      stopAnimation: '', // 完全停止动画 在切歌后短暂开启
      commentnum: '' // 评论数量
    }
  },
  computed: {
    ...mapState('player', ['running', 'currentSong', 'playlist', 'cdMoveDirection']),
    ...mapGetters('player', ['playOrder']),
    ...mapState('config', ['server'])
  },
  methods: {
    ...mapMutations('player', ['changeCdMoveDirection']),
    ...mapActions('player', ['changeSong']),
    togglePage (e) {
      e.srcEvent.stopPropagation()
      e.srcEvent.stopImmediatePropagation()
      e.preventDefault()
      this.$emit('togglepage')
    },
    panHandler (e) {
      // 保护中的动画无法操作
      if (this.protecting) {
        return false
      }
      this.doingChangeSong = true

      this.panningStyle = {transform: 'translate3d(-100vw, 0, 0) translate3d(' + e.deltaX + 'px,0,0)'}

      if (e.isFinal) {
        // 动画间隔
        let duration = 200

        let totalWidth = document.documentElement.clientWidth
        if (e.deltaX / totalWidth > 0.45) {
          this.protecting = true
          // 上一首
          this.changeSong({
            type: 'prev',
            beforeChange: () => {
              // 动画完成后取消保护，恢复动画设置
              setTimeout(() => {
                this.protecting = false
                this.doingChangeSong = false
              }, duration)
              this.panningStyle = {transition: 'all .2s ease-out'}
            }
          })
        } else if (e.deltaX / totalWidth < -0.45) {
          this.protecting = true
          // 下一首
          this.changeSong({
            type: 'next',
            beforeChange: () => {
              setTimeout(() => {
                this.protecting = false
                this.doingChangeSong = false
              }, duration)
              this.panningStyle = {transition: 'all .2s ease-out'}
            }
          })
        } else {
          // 未触发切歌
          this.panningStyle = {transition: 'all .2s ease-out'}
          setTimeout(() => {
            this.protecting = false
            this.doingChangeSong = false
          }, duration)
        }
      }
    },
    swipeHandler (e) {
      if (this.protecting) {
        return false
      }
      this.doingChangeSong = true
      this.protecting = true
      let duration = 200
      if (e.deltaX > 0) {
        // 上一首
        this.changeSong({
          type: 'prev',
          beforeChange: () => {
            // 动画完成后取消保护，恢复动画设置
            setTimeout(() => {
              this.protecting = false
              this.doingChangeSong = false
            }, duration)
          }
        })
      } else if (e.deltaX < 0) {
        // 表示切换方向
        this.changeSong({
          type: 'next',
          beforeChange: () => {
            // 动画完成后取消保护，恢复动画设置
            setTimeout(() => {
              this.protecting = false
              this.doingChangeSong = false
            }, duration)
          }
        })
      }
    },
    enter (el, done) {
      el.style.visibility = 'hidden'
      setTimeout(() => {
        done()
        el.style.visibility = ''
      }, 200)
    },
    leave (el, done) {
      el.style.display = 'none'
      setTimeout(() => {
        done()
        el.style.display = ''
      }, 200)
    }
  },
  created () {
    let songIndex = this.currentSong.indexInPlaylist
    let keyIndex = this.playOrder.indexOf(songIndex)
    let prev = keyIndex - 1 < 0 ? this.playOrder.length - 1 : keyIndex - 1
    let next = keyIndex + 1 > this.playOrder.length - 1 ? 0 : keyIndex + 1
    // 初始显示列表
    this.pnncd = [
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
  deactivated () {
    this.stopAnimation = 'none'
  },
  activated () {
    this.stopAnimation = ''
  },
  watch: {
    'currentSong.src' () {
      setTimeout(() => {
        this.stopAnimation = 'none'
      }, 200)
      setTimeout(() => {
        this.stopAnimation = ''
      }, 700)
    },
    'currentSong.indexInPlaylist' (val) {
      console.log('cahnge')
      this.commentnum = ''
      // 当歌曲变化时，pnn列表发生相应变化
      let songIndex = val
      let keyIndex = this.playOrder.indexOf(songIndex)
      let prev = keyIndex - 1 < 0 ? this.playOrder.length - 1 : keyIndex - 1
      let next = keyIndex + 1 > this.playOrder.length - 1 ? 0 : keyIndex + 1

      if (this.cdMoveDirection === 'right') {
        this.pnncd.pop()
        this.pnncd.unshift({
          mark: Date.now() * Math.random(),
          index: this.playOrder[prev]
        })
      } else if (this.cdMoveDirection === 'left') {
        this.pnncd.shift()
        this.pnncd.push({
          mark: Date.now() * Math.random(),
          index: this.playOrder[next]
        })
      } else {
        this.pnncd = [
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
      this.changeCdMoveDirection('')
    },
    'currentSong.songid' (val) {
      jsonp(this.server + '/songcommentnum?topic=' + val, {
        name: 'jsoncallback2387000247395' + Math.floor((Math.random() * 8999) + 1000)
      }, (err, data) => {
        if (err) {
          console.log('Get SongCommentNum Failed')
        } else {
          let num = data.batch_commenttotal[0].commenttotal

          if (num <= 999) {
            this.commentnum = num
          } else if (num < 10000) {
            this.commentnum = '999+'
          } else if (num < 100000) {
            this.commentnum = '1w+'
          } else if (num < 1000000) {
            this.commentnum = '10w+'
          } else {
            this.commentnum = '100w+'
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.cd-page {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
}
.cd-main {
  flex: 1;
  position: relative;
  height: 100%;
}
.cd-head {
  width: 100vw;
  height: 0.5px;
  background-image: repeating-linear-gradient(to right,transparent,rgba(200,200,200,0.3) 30%,rgba(200,200,200,.3) 70%, transparent);
  padding-bottom: (100 / 3.75 ) + vw;
  background-clip: content-box;
  overflow: hidden;
  display: flex;
  justify-content: center;
  margin-bottom: -(50 / 3.75 ) + vw;
  .cd-heads {
    margin-top: -49 / 414 * (100 / 3.75) + vw;
    margin-left: (276 - 49) / 276 * (276 / 414 * (100 / 3.75)) + vw;
    height: (100 / 3.75) + vw;
    width: 276 / 414 * (100 / 3.75) + vw;
    background: url('~@/components/common/img/cd-heads.png') no-repeat center / 100%;
    transition: transform 0.4s;
    transform-origin: 49 / 414 * (100 / 3.75) + vw 49 / 414 * (100 / 3.75) + vw;
    position: relative;
    z-index: 1;
  }
  .cd-heads.pause {
    transform: rotate(-20deg);
  }
}
.cd-cover-box {
  width: 80vw;
  height: 80vw;
  margin: 0 10vw;
  background-color: rgba(#eee, 0.1);
  border-radius: 50%;
  position: absolute;
}
.cd-cover-list {
  width: 100vw;
  position: absolute;
  display: flex;
  flex-wrap: nowrap;
  // margin-left: -100vw;
  transform: translate3d(-100vw, 0, 0);
  .cd-cover-item {
    width: 80vw;
    height: 80vw;
    margin: 0 10vw;
    flex-shrink: 0;
  }
  .cd-cover-bg {
    width: 80vw;
    height: 80vw;
    background: url("~@/components/common/img/cover-border.png") no-repeat center / 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: coverrunning 20s linear paused infinite;
    .cd-cover {
      box-sizing: border-box;
      overflow: hidden;
      border-radius: 50%;
      width: (804 - 130 * 2) * 80 / 804 + vw;
      height: (804 - 130 * 2) * 80 / 804 + vw;
      border: 9 * 80 / 804 + vw solid black;
      background: {
        position: center;
        size: 100% 100%;
      }
    }
    .cd-cover.before-cover {
      background: url('~@/components/common/img/cover-noload.png') no-repeat center / 110%;
    }
  }
  .cd-cover-bg.running {
    animation-play-state: running!important;
  }
}
.operation-group {
  width: 100vw;
  position: absolute;
  box-sizing: border-box;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  padding: 15px 40px;
  .iconfont{
    font-size: 23px;
    color: white;
  }
  .comment {
    width: 23px;
    height: 25px;
    position: relative;
    .comment-num {
      color: white;
      left: 65%;
      bottom: 70%;
      position: absolute;
      font-size: 12px;
      font-size: 10px;
      line-height: 12px;
    }
  }
  .icon-comment.shownum {
    position: absolute;
    clip-path: polygon(0 0, 60% 0, 60% 30%,100% 30% ,100% 100%, 0 100%, 0 0);
  }
}
</style>
<style>
@keyframes coverrunning {
  from {
    transform: rotate(0)
  }
  to {
    transform: rotate(360deg)
  }
}
</style>
