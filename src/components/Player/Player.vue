<template>
<div class="player-page">
  <div class="player-header">
    <v-touch
      @tap="router.go(-1)"
      class="back"
    ></v-touch>
    <div ref="firstTitle" class="header-title">
      <div  class="first-title-box">
        <p class="first-title-content">{{currentSong.songname}}</p>
      </div>
      <span class="sub-title">{{currentSong.singer}}</span>
    </div>
    <span class="share iconfont icon-share">
    </span>
  </div>
  <div class="player-main">

  </div>
  <div class="player-footer">

  </div>
</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState('player', ['currentSong'])
  },
  mounted () {
    let scroll = new window.IScroll(this.$refs.firstTitle, {
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
      console.log('end')
      if (scroll.maxScrollX === scroll.x) {
        this.scrollRound(scroll, 0)
      } else if (scroll.x === 0) {
        this.scrollRound(scroll, scroll.maxScrollX)
      }
    })

    this.scrollRound(scroll, scroll.maxScrollX)
  },
  methods: {
    // 滚动条来回滚动
    scrollRound (scroll, end) {
      setTimeout(() => {
        scroll.scrollTo(end, 0, 5000, {style: 'cubic-bezier(0, 0, 1, 1)'})
        console.log('scorl')
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/scss.config.scss';
.player-page {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #545454;
  .player-header {
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
}
</style>
