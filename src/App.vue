<template>
  <div
    id="app"
  >
    <AudioPlayer></AudioPlayer>
    <router-view></router-view>
    <router-view
      name="mini-player"
      v-if="myPlaylist.length"
    ></router-view>
    <Maside></Maside>
  </div>
</template>

<script>
import AudioPlayer from '#/AudioPlayer/AudioPlayer'
import Maside from '#/aside/aside'
import {mapGetters, mapMutations, mapActions} from 'vuex'
// import axios from 'axios'

export default {
  name: 'App',
  components: {
    AudioPlayer,
    Maside
  },
  computed: {
    // ...mapState(['asideOn']),
    ...mapGetters(['recomPlaylist', 'myPlaylist'])
  },
  created () {
    this.getSongSheets('recom8942979767128301')
  },
  methods: {
    ...mapMutations('config/', ['setServer']),
    ...mapActions(['getSongSheets'])
  }
}
</script>

<style lang="scss">
@import '~@/style/scss.config.scss';
::-webkit-scrollbar {
  display: none;
}
::-webkit-scrollbar-button {
  display: none;
}
* {
  margin: 0;
  padding: 0;
}
html {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
body{
  @extend html;
  font-size: 16px;
  background: white;
}
a {
  text-decoration: none;
}
#app {
  box-sizing: border-box;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
@include build-transition('slide')

</style>
