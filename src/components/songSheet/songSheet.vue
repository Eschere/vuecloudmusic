<template>
<transition :name="fadeType">
  <keep-alive>
    <router-view class="song-sheet"></router-view>
  </keep-alive>
</transition>
</template>
<script>
import detailPage from '#/common/detailFramework'
import {mapActions} from 'vuex'

export default {
  components: {
    detailPage
  },
  data () {
    return {
      fadeType: 'fade-deep'
    }
  },
  computed: {
    // ...mapState('songSheet', ['tags'])
  },
  methods: {
    ...mapActions('songSheet', ['getSongSheetTags'])
  },
  created () {
    this.getSongSheetTags()
  },
  // beforeRouteEnter (to, from, next) {
  //   next()
  // },
  beforeRouteUpdate (to, from, next) {
    if (to.path.length > from.path.length) {
      this.fadeType = 'fade-deep'
    } else {
      this.fadeType = 'fade-back'
    }
    next()
  },
  beforeRouteLeave (to, from, next) {
    this.fadeType = 'fade-back'
    this.$nextTick(() => {
      next()
    })
  }
}
</script>

<style lang="scss">
.song-sheet {
  background: white;
}
</style>
