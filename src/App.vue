<template>
  <div id="app">
    <AudioPlayer></AudioPlayer>
    <router-view></router-view>
    <router-view name="mini-player"></router-view>
  </div>
</template>

<script>
/* eslint-disable */
import AudioPlayer from '#/AudioPlayer/AudioPlayer'

import {mapState, mapMutations} from 'vuex'

export default {
  name: 'App',
  components: {
    AudioPlayer
  }
}
</script>

<style>

</style>
