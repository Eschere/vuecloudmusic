<template>
  <div class="lyric-page">
    <div class="volume-area">
      <span class="iconfont icon-volume"></span>

      <v-touch
        class="volume-box"
        @tap="changeVolumeHandler"
        @pan="changeVolumeHandler"
      >
        <div ref="volume" class="volume-bar">
          <div class="volume" :style="{width: volume * 100 + '%'}">
            <div class="volume-button"></div>
          </div>
        </div>
      </v-touch>
    </div>

    <div
      class="lyric-area"
    >
      <v-touch
        class="lyric-cursor"
        v-show="readyForChange"
        @tap="lyricChanger"

      >
        <span class="cursor-icon"></span>
        <hr class="cursor-line"/>
        <span class="cursor-time">{{willActiveTime}}</span>
      </v-touch>

      <v-touch
        class="lyric-touch"
        @tap="togglePage"
        @pan="panHandler"
        ref="lyricArea"
      >
        <div
          class="lyric-box" v-show="!lyricLoading"
        >
          <div
            class="lyric-content"
            :style="{padding: boxHeight / 2 + 'px 0'}"
          >
            <div
              class="lyric-line"
              v-for="(item,index) in lyricArray"
              :key="'lyricI'+index"
              :style="{color: activeIndex === index ? '#fff' : willActiveIndex === index ? '#eee':''}"
              ref="line"
            >
              <p
                class="lyric-origin"
                v-html="item.text"
              ></p>
              <p
                class="lyric-trans"
                v-if="item.trans"
                v-html="item.trans"
              ></p>
            </div>
          </div>
        </div>
        <div class="lyric-loading" v-show="lyricLoading">
          <span>歌词加载中...</span>
        </div>
      </v-touch>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters, mapMutations} from 'vuex'

import jsonp from 'jsonp'
import {decodeBase64, formatTime, lrcParser} from '@/utils'
let scroll
export default {
  data () {
    return {
      tiemr: null,
      lyric: '',
      lyricTrans: '',
      lyricArray: [],
      lyricLoading: true,
      boxHeight: 0, // 歌词容器高度,
      lineData: [],
      readyForChange: false, // 预切换歌曲播放歌词位置
      scrollByUser: false,
      willActiveIndex: null,
      lyricChanged: false // 在组件失活期间歌曲改变
    }
  },
  computed: {
    ...mapState('player', ['volume', 'currentSong', 'currentTime']),
    ...mapGetters('config', ['currentServer']),
    activeIndex () {
      if (this.lyricArray.length > 0) {
        // 最小为0
        if (this.currentTime <= this.lyricArray[0].time) {
          return 0
        }

        let active = this.lyricArray.findIndex((item, index, arr) => {
          if (index < arr.length - 1) {
            return this.currentTime >= item.time && this.currentTime < arr[index + 1].time
          } else {
            return index
          }
        })

        // 跳过内容为空的歌词行
        return this.lyricArray[active].text === ''
          ? active - 1 < 0 ? 0 : active - 1
          : active
      } else {
        return 0
      }
    },
    willActiveTime () {
      if (this.lyricArray.length < 1 || this.willActiveIndex === null) {
        return '00:00'
      } else {
        return formatTime(this.lyricArray[this.willActiveIndex].time)
      }
    }
  },
  methods: {
    ...mapMutations('player', ['changeVolume', 'setCurrentTime']),
    togglePage (e) {
      this.$emit('togglepage')
    },
    changeVolumeHandler (e) {
      let volumeRect = this.$refs.volume.getBoundingClientRect()
      let volumeBarWidth = volumeRect.width
      let volumeBarOffset = volumeRect.left || volumeRect.x
      let offset = e.center.x - volumeBarOffset
      let volume = Math.round(offset / volumeBarWidth * 100) / 100
      if (volume < 0.05) {
        volume = 0
      } else if (volume > 0.95) {
        volume = 1
      }
      this.changeVolume(volume)
    },
    panHandler () {
      this.readyForChange = true
      this.scrollByUser = true
    },
    lyricChanger () {
      this.setCurrentTime(this.lyricArray[this.willActiveIndex].time)
    },
    requestLyric (cb) {
      this.lyricLoading = true
      this.scrollByUser = false
      this.readyForChange = false
      // 请求歌词
      jsonp(this.currentServer.url + '/songlyric?songmid=' + this.currentSong.songmid, {
        name: 'MusicJsonCallback_lrc'
      }, (err, data) => {
        if (err) {
          this.lyricLoading = false
          this.lyric = '无歌词'
        } else {
          this.lyric = decodeBase64(data.lyric)

          this.lyricTrans = data.trans && decodeBase64(data.trans)

          this.lyricArray = lrcParser(this.lyric, this.lyricTrans)
          this.$nextTick(cb)
        }
      })
    },
    updateLineData () {
      // 更新每行歌词的位置信息
      this.lineData = this.$refs.line.map(item => {
        let offset = item.offsetTop
        let height = item.clientHeight
        return {
          offset,
          height,
          center: offset + height / 2
        }
      })
    }
  },
  mounted () {
    this.requestLyric(() => {
      this.lyricLoading = false
      setTimeout(() => {
        this.updateLineData()

        // 初始化滚动条
        scroll = new window.IScroll(this.$refs.lyricArea.$el, {
          probeType: 3,
          click: false,
          preventDefault: false
        })

        scroll.on('scroll', () => {
          if (this.readyForChange && this.scrollByUser) {
            let willIndex
            // 预滚动到的歌词行中心点
            let willCenter = -scroll.y + this.boxHeight / 2
            // 根据预期滚动到的歌词行中心 和 全部歌词行中心 计算应该滚动到的位置
            if (willCenter < this.lineData[0].center) {
              willIndex = this.willActiveIndex = 0
            } else if (willCenter > this.lineData[this.lineData.length - 1].center) {
              willIndex = this.willActiveIndex = this.lineData.length - 1
            } else {
              willIndex = this.lineData.findIndex((item, index, arr) => {
                return Math.abs(item.center - willCenter) <= item.height / 2 + 10 && item.height !== 0
              })
            }

            this.willActiveIndex = willIndex

            // 清除还原歌词定时器
            if (this.timer) {
              clearTimeout(this.timer)
              this.timer = null
            }
          }
        })

        scroll.on('scrollEnd', () => {
          if (this.readyForChange && this.scrollByUser) {
            this.scrollByUser = false
            scroll.scrollTo(0, -(this.lineData[this.willActiveIndex].center - this.boxHeight / 2), 1000)

            // 延迟还原数据 和 歌词位置
            this.timer = setTimeout(() => {
              this.readyForChange = false
              this.willActiveIndex = null
              scroll.scrollTo(0, -(this.lineData[this.activeIndex].center - this.boxHeight / 2), 1000)
            }, 5000)
          }
        })

        if (this.readyForChange === false) {
          scroll.scrollTo(0, -(this.lineData[this.activeIndex].center - this.boxHeight / 2), 1000)
        }
      }, 1000)
    })

    // 获取歌词容器高度
    this.boxHeight = this.$refs.lyricArea.$el.getBoundingClientRect().height
    window.onresize = () => {
      this.boxHeight = this.$refs.lyricArea.$el.getBoundingClientRect().height
    }
  },
  activated () {
    if (this.lyricChanged) {
      this.lyricLoading = false
      scroll.scrollTo(0, 0, 0)
      this.$nextTick(() => {
        setTimeout(() => {
          this.updateLineData()

          scroll.refresh()

          if (this.readyForChange === false) {
            scroll.scrollTo(0, -(this.lineData[this.activeIndex].center - this.boxHeight / 2), 1000)
          }
        }, 1000)
      })
      this.lyricChanged = false
    }
  },
  watch: {
    'activeIndex' (val) {
      if (this.lineData.length > 0 && this.readyForChange === false) {
        let scrollDistance = this.lineData[val].center - this.boxHeight / 2
        scroll.scrollTo(0, -scrollDistance, 1000)
      }
    },
    'currentSong.songmid' (val) {
      this.lyricLoading = true
      this.lyricChanged = true
      this.lineData = []
      this.willActiveIndex = null
      this.requestLyric(() => {
        this.lyricLoading = false
        this.$nextTick(() => {
          setTimeout(() => {
            this.updateLineData()

            scroll.refresh()

            if (this.readyForChange === false) {
              scroll.scrollTo(0, -(this.lineData[this.activeIndex].center - this.boxHeight / 2), 1000)
            }
          }, 1000)
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .lyric-page {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    position: relative;
    .volume-area {
      margin: 15px 25px;
      display: flex;
      align-items: center;
      .icon-volume {
        color: rgba(#aaa, 0.8);
      }
      .volume-box {
        flex: 1;
        height: 17px;
        margin: 0 20px;
        display: flex;
        align-items: center;
      }
      .volume-bar {
        width: 100%;
        height: 2px;
        border-radius: 2px;
        background: rgba($color: #eee, $alpha: 0.1);
        position: relative;
        .volume {
          border-radius: 2px;
          height: 2px;
          position: absolute;
          background: rgba(#aaa, 0.8);
          .volume-button {
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #eee;
            position: absolute;
            right: -5px;
            top: -3px;
          }
        }
      }
    }
    .lyric-cursor {
      position: absolute;
      width: 100vw;
      height: 25px;
      display: flex;
      left: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      box-sizing: border-box;
      padding: 0 5px;
      justify-content: space-around;
      align-items: center;
      z-index: 1;
      .cursor-icon {
        border-radius: 3px;
        border-width: 8px 8px 8px 13px;
        border-color: transparent transparent transparent #ccc;
        border-style: solid;
      }
      .cursor-line {
        border: none;
        background-color: rgba(#ccc, 0.8);
        flex: 1;
        height: 1px;
        transform: scaleY(0.5);
        margin: 0 5px;
      }
      .cursor-time {
        font-size: 12px;
        color: #eee;
      }
    }
    .lyric-area {
      flex: 1;
      overflow: hidden;
      color: #aaa;
      text-align: center;
      position: relative;
      .lyric-touch {
        height: 100%;
        overflow: hidden;
        padding: 0 30px;
      }
      .lyric-content {
        overflow: hidden;
        padding: 50% 0;
      }
      .lyric-line {
        margin: 20px 0;
        word-break: break-word;
      }
      .lyric-loading {
        color: #eee;
        display: flex;
        height: 100%;
        align-items: center;
        justify-content: center;
      }
    }
  }
</style>
