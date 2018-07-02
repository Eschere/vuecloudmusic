<template>
  <div class="mini-player-box" v-if="playlist.length">
    miniplayer
  </div>
</template>
<script>
import {mapState} from 'vuex'

export default {
  name: 'MiniPlayer',
  computed: {
    ...mapState([
      'playlist'
    ])
  }
}
</script>
