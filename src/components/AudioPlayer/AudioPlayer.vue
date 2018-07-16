<template>
  <div src-data="currentSong.src" style="display:none"></div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
// try{
//   mapState('player', ['el', 'currentSong'])
// } catch (e) {
//   alert(e)
// }
export default {
  data () {
    return {
      audio: null
    }
  },
  computed: {
    // ...mapState('player', ['el', 'currentSong'])
  },
  methods: {
    ...mapMutations('player', ['saveAudioElement'])
  },
  created () {
    let audio = this.audio = new Audio()
    try {
      this.saveAudioElement(audio)
    } catch (e) {
      console.log(e)
    }
  }
  // watch: {
  //   'currentSong' (val) {
  //     this.audio.src = val.src
  //   }
  // }
}
</script>

