<template>
  <div src-data="currentSong.src">
    <Shade
      :shade="alertBox"
      :colseOnclickModal="false"
    >
      <div class="modal">
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
    </Shade>
  </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
import Shade from '#/Shade/Shade'

export default {
  components: {
    Shade
  },
  data () {
    return {
      audio: null,
      alertBox: false
    }
  },
  computed: {
    ...mapState('player', ['running', 'currentSong'])
  },
  methods: {
    ...mapMutations('player', ['changePlayState']),
    cancel (cb) {
      this.changePlayState(false)
      this.alertBox = false
    },
    enter () {
      this.audio.play()
      this.alertBox = false
    }
  },
  created () {
    this.audio = new Audio()
  },
  watch: {
    'currentSong.src' (val) {
      this.audio.src = val
      this.audio.play().catch(() => {
        this.alertBox = true
      })
    },
    'running' (val) {
      if (val) {
        this.audio.play().catch(() => {
          this.alertBox = true
        })
      } else {
        this.audio.pause()
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
