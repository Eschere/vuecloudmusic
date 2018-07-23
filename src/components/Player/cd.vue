<template>
<div class="cd-page">
  <div class="cd-main">
    <!-- 磁头 -->
    <div class="cd-head">
      <div class="cd-heads" :class="running ? '': 'pause'">
      </div>
    </div>
    <!-- cd封面 -->
    <div class="cd-cover-box">
      <div
        class="cd-cover-bg"
        :class="running ? 'running' : ''"
        :style="{animation: stopAnimation}"
      >
        <div
          class="cd-cover"
          v-src:before-cover="currentSong.albumcover"
        >
        </div>
      </div>
    </div>
  </div>
  <div class="operation-group">

  </div>
</div>
</template>
<script>
import {mapState} from 'vuex'

export default {
  data () {
    return {
      stopAnimation: ''
    }
  },
  computed: {
    ...mapState('player', ['running', 'currentSong'])
  },
  watch: {
    'currentSong.src' () {
      this.stopAnimation = 'none'
      setTimeout(() => {
        this.stopAnimation = ''
      }, 500)
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
  margin: auto;
  background-color: rgba(#eee, 0.1);
  border-radius: 50%;
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
