<template>
  <div class="mini-player-box">
    <v-touch
      @tap="play"
    >
      kaishi
    </v-touch>
  </div>
</template>
<script>

import {mapState, mapMutations} from 'vuex'
export default {
  name: 'MiniPlayer',
  computed: {
    ...mapState('player', ['el'])
  },
  methods: {
    ...mapMutations('player', ['changePlayState']),
    play () {
      console.log('play')
      // this.el.play()
      this.changePlayState('toggle')
    }
  }
}
</script>
<style scoped>
.mini-player-box {
  height: 50px;
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  background: #ccc;
  z-index: 300;
}
</style>
