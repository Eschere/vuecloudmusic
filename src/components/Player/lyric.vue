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
            v-for="item in lyricArray"
            :key="'lyricI'+item.index"
            :style="{color: activeIndex === item.index ? '#fff' : willActiveIndex === item.index ? '#eee':''}"
            ref="line"
          >
            <p
              class="lyric-origin"
              v-html="item.text"
            ></p>
            <p
              class="lyric-trans"
              v-if="lyricTransArray.length > 0 && lyricTransArray[item.index].text && lyricTransArray[item.index].text !== '//'"
              v-html="lyricTransArray[item.index].text"
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
import {mapState, mapMutations} from 'vuex'

import jsonp from 'jsonp'
import {decodeBase64, formatTime, lrcParser} from '@/utils'
let scroll
export default {
  data () {
    return {
      lyric: '',
      lyricTrans: '',
      lyricArray: [],
      lyricTransArray: [],
      lyricLoading: true,
      // lyricScrollStyle: null,
      // transitionDuration: 0,
      // transformDistanceOnFirstTouch: 0,
      // transformDistance: 0,
      boxHeight: 0, // 歌词容器高度,
      // scroll: null,
      lineData: [],
      readyForChange: false, // 预切换歌曲播放歌词位置
      scrollByUser: false,
      willActiveIndex: null
    }
  },
  computed: {
    ...mapState('player', ['volume', 'currentSong', 'currentTime']),
    ...mapState('config', ['server']),
    activeIndex () {
      if (this.lyricArray.length > 0) {
        // 最小为0
        if (this.currentTime < this.lyricArray[0].time) {
          return 0
        }

        let active = this.lyricArray.findIndex((item, index, arr) => {
          if (index < arr.length - 1) {
            return this.currentTime > item.time && this.currentTime < arr[index + 1].time
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
    ...mapMutations('player', ['changeVolume','setCurrentTime']),
    togglePage (e) {
      // e.srcEvent.stopPropagation()
      // e.srcEvent.stopImmediatePropagation()
      // e.preventDefault()
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
      // console.log(scroll)
      // console.log(scroll)
      
      // let willCenter = -scroll.y + this.boxHeight
      // console.log(willCenter)
      console.log()
      this.readyForChange = true
      this.scrollByUser = true
    },
    lyricChangerStart (e) {
      // e.preventDefault()
      e.stopPropagation()
      e.target.touchStartFrom = true
      // console.log(e)
      // e.srcEvent.stopImmediatePropagation()
     
    },
    lyricChanger(e) {
      // e.stopPropagation()
      // if (e.target.touchStartFrom) {
        this.setCurrentTime(this.lyricArray[this.willActiveIndex].time)
        // e.target.touchStartFrom = ''
      // }
    }
    // saveFirstTouch (e) {
    //   // console.log('first' + e)
    //   this.transformDistanceOnFirstTouch = this.transformDistance
    // },
    // clearFirstTouch () {

    // },
    // panHandler (e) {
      // if (!this.transformDistanceOnFirstTouch) {
      //   this.transformDistanceOnFirstTouch = this.transformDistance
      // }

      // console.log(e)
     /*  this.transitionDuration = 0
      this.transformDistance = this.transformDistanceOnFirstTouch + e.deltaY
      if (e.velocityY !== 0 ) {
        this.transformDistance = this.transformDistanceOnFirstTouch + e.deltaY + e.velocityY * 100
      }

      if (e.isFinal) {
        this.transitionDuration = 600
        this.transformDistance = e.velocityY * 100 + this.transformDistance
      } */
      
      
    // }
  },
  mounted () {
    jsonp(this.server + '/songlyric?songmid=' + this.currentSong.songmid, {
      name: 'MusicJsonCallback_lrc'
    }, (err, data) => {
      if (err) {
        this.lyricLoading = false
        this.lyric = '无歌词'
      } else {
        this.lyric = decodeBase64(data.lyric)
        // console.log(this.lyric)
        this.lyricTrans = data.trans && decodeBase64(data.trans)
        // console.log(this.lyricTrans)
        this.lyricArray = lrcParser(this.lyric)
        // console.log(this.lyricArray)
        this.lyricTransArray = lrcParser(this.lyricTrans)
        // console.log(this.lyricTransArray)
        this.$nextTick(() => {
          this.lyricLoading = false
          console.log(this.$refs)

          
          setTimeout(() => {
            this.lineData = this.$refs.line.map(item => {
              let rect = item.getBoundingClientRect()
              
              let offset = item.offsetTop //rect.top
              let height = item.clientHeight //rect.height
              return {
                offset,
                height,
                center: offset + height / 2
              }
            })

            scroll = new window.IScroll(this.$refs.lyricArea.$el, {
              // scrollX: true,
              // scrollY: false,
              click: false,
              preventDefault: false
            })
            scroll.on('scrollEnd', () => {
              // console.log('scroll')
              // console.log(scroll)
              if (this.readyForChange && this.scrollByUser) {
                // console.log(scroll.y)
                let willIndex
                // 预滚动到的歌词行中心点
                let willCenter = -scroll.y + this.boxHeight / 2
                // console.log(willCenter)
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
                // 歌词行和预期切换的歌词行
                // console.log(willIndex)
                if (this.scrollByUser)
                scroll.scrollTo(0, -(this.lineData[willIndex].center - this.boxHeight / 2), 1000)
                this.willActiveIndex = willIndex

                // 延迟还原数据
                if (this.timer) {
                  clearTimeout(this.timer)
                  this.timer = null
                }
                this.timer = setTimeout(() => {
                  this.readyForChange = false
                  this.willActiveIndex = null
                }, 5000)
              }
            })

            if (this.readyForChange !== false) {
              scroll.scrollTo(0, -(this.lineData[this.activeIndex].center - this.boxHeight / 2), 1000)
            }
          }, 1000)
        })
      }
    })
    this.boxHeight = this.$refs.lyricArea.$el.getBoundingClientRect().height
  },
  watch: {
    'activeIndex' (val) {
      // let offset = this.lineData[val].offset
      // let height = this.lineData[val].height
      if (this.lineData.length > 0 && this.readyForChange === false) {
        let scrollDistance = this.lineData[val].center - this.boxHeight / 2
        scroll.scrollTo(0, -scrollDistance, 1000)
      }
      
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
