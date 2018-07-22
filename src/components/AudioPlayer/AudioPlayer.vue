<template>
  <div :src-data="currentSong.src">
    <Shade
      :shade="shadeOn"
      :colseOnclickModal="false"
    >
      <div class="modal" v-if="confirmBox">
        <div class="alert-box">
          <div class="alert-message">
            即将播放音乐？
          </div>
          <div class="alert-foot">
            <v-touch class="alert-cancel" @tap="cancel">
              取消
            </v-touch>
            <v-touch class="alert-enter" @tap="enter">
              播放
            </v-touch>
          </div>
        </div>
      </div>

      <div class="modal" v-if="alertBox">
        <div class="alert-box">
          <div class="alert-message">
            播放失败
          </div>
          <div class="alert-foot">
            <v-touch class="alert-enter" @tap="readed">
              确定
            </v-touch>
          </div>
        </div>
      </div>
    </Shade>
  </div>
</template>
<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import Shade from '#/Shade/Shade'

const audio = new Audio()

export default {
  components: {
    Shade
  },
  data () {
    return {
      // audio: null,
      shadeOn: false,
      confirmBox: false,
      alertBox: false
    }
  },
  computed: {
    ...mapState('player', ['running', 'currentSong', 'loopType'])
  },
  methods: {
    ...mapMutations('player', ['changePlayState', 'saveDuration', 'updateCurrentTime', 'changeDataLoading']),
    ...mapActions('player', ['changeSong']),
    cancel (cb) {
      this.changePlayState(false)
      this.shadeOn = false
      this.confirmBox = false
    },
    enter () {
      audio.play().catch(() => {
        this.shadeOn = true
        this.alertBox = true
      })
      this.shadeOn = false
      this.confirmBox = false
    },
    readed () {
      this.changePlayState(false)
      this.shadeOn = false
      this.alertBox = false
    }
  },
  created () {
    audio.addEventListener('canplay', e => {
      this.changeDataLoading(false)
      this.saveDuration(e.target.duration)
    })
    audio.addEventListener('timeupdate', e => {
      this.updateCurrentTime(e.target.currentTime)
      if (e.target.duration === e.target.currentTime) {
        if (this.loopType !== 'single') {
          this.changeSong({type: 'next'})
        } else {
          audio.play().catch(() => {
            this.shadeOn = true
            this.alertBox = true
          })
        }
      }
    })
    audio.addEventListener('canplay', () => {
      this.changePlayState(true)
      audio.play().catch((e) => {
        console.log('src', e)
        this.shadeOn = true
        this.confirmBox = true
      })
    })
    // 播放错误
    audio.addEventListener('error', () => {
      this.shadeOn = true
      this.alertBox = true
    })
  },
  watch: {
    'currentSong.src' (val) {
      audio.src = val
    },
    'running' (val) {
      if (val) {
        if (audio.paused) {
          audio.play().catch((e) => {
            console.log('running', e)
            this.shadeOn = true
            this.confirmBox = true
          })
        }
      } else {
        if (!audio.paused) {
          audio.pause()
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/scss.config.scss';
.modal {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
}
.alert-box {
  width: 70vw;
  background-color: white;
  border-radius: 5px;
  padding: 20px;
  .alert-message {
    font-weight: 600;
    margin: 20px 0;
    font-size: 18px;
  }
  .alert-foot {
    display: flex;
    justify-content: flex-end;
    color: $theme-color;
    .alert-cancel,
    .alert-enter {
      margin-right: 20px;
    }
  }
}
.shade-enter .modal,
.shade-leave-to .modal {
  transform: scale(0);
}
.shade-enter-active .modal,
.shade-leave-active .modal {
  transition: all 0.3s;
}
</style>
