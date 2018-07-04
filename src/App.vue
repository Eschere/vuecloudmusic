<template>
  <div
    id="app"
    style="{paddingBottom: myPlaylist.length ? '50px' : 0}"
  >
    <AudioPlayer></AudioPlayer>
    <router-view></router-view>
    <router-view
      name="mini-player"
      v-if="myPlaylist.length"
    ></router-view>
    <Maside v-if="asideOn"></Maside>
  </div>
</template>

<script>
import AudioPlayer from '#/AudioPlayer/AudioPlayer'
import Maside from '#/aside/aside'
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
// import axios from 'axios'

export default {
  name: 'App',
  components: {
    AudioPlayer,
    Maside
  },
  computed: {
    ...mapState(['asideOn']),
    ...mapGetters(['recomPlaylist', 'myPlaylist'])
  },
  created () {
    this.setServer()
    this.getSongSheets('recom8942979767128301')
  },
  methods: {
    ...mapMutations('config/', ['setServer']),
    ...mapActions(['getSongSheets'])
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
body, html {
  width: 100vw;
  height: 100vh;
}
a {
  text-decoration: none;
}
#app {
  padding-top: 50px;
  box-sizing: border-box;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
