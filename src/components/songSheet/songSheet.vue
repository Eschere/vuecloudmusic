<template>
<transition :name="fadeType">
  <router-view class="song-sheet"></router-view>
</transition>
</template>
<script>
import {mapActions} from 'vuex'

export default {
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
  deactivated () {
    this.$nextTick(() => {
      // 控制过渡动画类型
      if (this.$route.path === '/player') {
        this.fadeType = 'fade-back'
      } else {
        this.fadeType = 'fade-deep'
      }
    })
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
