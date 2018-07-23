<template>
<transition :name="fadeType">
  <router-view class="song-sheet"></router-view>
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
  methods: {
    ...mapActions('songSheet', ['getSongSheetTags'])
  },
  created () {
    this.getSongSheetTags()
  },
  beforeRouteUpdate (to, from, next) {
    if (to.path.length > from.path.length) {
      this.fadeType = 'fade-deep'
    } else {
      this.fadeType = 'fade-back'
    }
    next()
  },
  beforeRouteLeave (to, from, next) {
    if (to.path === '/player') {
      this.fadeType = 'fade-deep'
    } else {
      this.fadeType = 'fade-back'
    }
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
