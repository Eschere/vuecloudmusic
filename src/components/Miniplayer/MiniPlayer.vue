<template>
  <div class="mini-player-box">
    <v-touch
      @tap="play"
      @pan="panHandler"
      @swipe="swipeHandler"
      :swipe-options="{threshold: 20}"
      class="order-control"
    >
      <!-- <Swipe
        :auto="0"
        :show-indicators="false"
        :defaultIndex="1"
        :continuous="false"
        @change="change"
        class="order-box"
      > -->
      <div ref="order" class="order-box">
        <div
          v-for="(item,index) in pcnlist"
          :key="'minipnnmid'+playlist[item].songmid"
          class="order-item"
        >
          <!-- <div> -->
            <div
              v-src="'https://y.gtimg.cn/music/photo_new/T002R300x300M000'+playlist[item].albummid+'.jpg?max_age=2592000'"
              class="mini-cover"
            >
            </div>
            <div class="mini-detail">
              {{item}} - {{index}}
            </div>
          <!-- </div> -->
        </div>
      </div>
      <!-- </Swipe> -->
    </v-touch>
    <div class="control-icons">
      <div class="play-control"></div>
      <span class="list-toggle"></span>
    </div>
  </div>
</template>
<script>
import {Swipe, SwipeItem} from 'mint-ui'

import {mapState, mapMutations, mapGetters, mapActions} from 'vuex'
export default {
  name: 'MiniPlayer',
  components: {
    Swipe,
    SwipeItem
  },
  // data () {
  //   return {
  //     pcnlist: []
  //   }
  // },
  computed: {
    ...mapState('player', ['currentSong']),
    ...mapState('player', ['playlist']),
    ...mapGetters('player', ['playOrder']),
    pcnlist () {
      let songIndex = this.currentSong.indexInPlaylist

      let keyIndex = this.playOrder.indexOf(songIndex)
      let prev = keyIndex - 1 < 0 ? this.playOrder.length - 1 : keyIndex - 1
      let next = keyIndex + 1 > this.playOrder.length - 1 ? 0 : keyIndex + 1
      // return [
      //   this.playlist[this.playOrder[prev]],
      //   this.playlist[songIndex],
      //   this.playlist[this.playOrder[next]]
      // ]
      return [this.playOrder[prev], songIndex, this.playOrder[next]]
    }
  },
  methods: {
    ...mapMutations('player', ['changePlayState']),
    ...mapActions('player', ['changeSong']),
    play () {
      console.log('play')
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
              type: 'prev',
              callback: () => {
                this.protecting = false
                this.$refs.order.style.transition = ''
                this.$refs.order.style.transform = ''
              }
            })
          }, duration)
        } else if (e.deltaX / totalWidth < -0.5) {
          // 下一首
          this.$refs.order.style.transform = 'translate3d(-100%,0,0)'
          setTimeout(() => {
            this.changeSong({
              type: 'next',
              callback: () => {
                this.protecting = false
                this.$refs.order.style.transition = ''
                this.$refs.order.style.transform = ''
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
            type: 'prev',
            callback: () => {
              this.protecting = false
              this.$refs.order.style.transition = ''
              this.$refs.order.style.transform = ''
            }
          })
        }, duration)
      } else {
        this.$refs.order.style.transform = 'translate3d(-100%,0,0)'
        setTimeout(() => {
          this.changeSong({
            type: 'next',
            callback: () => {
              this.protecting = false
              this.$refs.order.style.transition = ''
              this.$refs.order.style.transform = ''
            }
          })
        }, duration)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.mini-player-box {
  box-sizing: border-box;
  height: 50px;
  width: 100%;
  border-top: 0.1px solid #ccc;
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
    .order-box {
      width: 100%;
      display: flex;
      margin-left: -100%;
      // .mint-swipe-items-wrap {
      //   width: 100%;
      // }
      .order-item {
        box-sizing: border-box;
        flex-shrink: 0;
        width: 100%;
        display: flex;
        padding: 0 5px;
      }
      // .order-item > div{
      //   width: 100%;
      //   display: flex;
      // }
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
    }
  }
  .control-icons {
    display: flex;
    align-items: center;
    padding: 0 10px;
  }
  .play-control {
    width: 30px;
    height: 30px;
    margin-right: 20px;
  }
  .list-toggle {
    width: 20px;
    height: 20px;
  }
}
</style>
