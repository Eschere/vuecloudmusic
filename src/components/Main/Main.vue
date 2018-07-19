<template>
<transition name="main">
  <div class="main"
    :style="{paddingBottom: playlist.length ? '50px' : ''}">
    <router-view></router-view>
    <transition :name="toggleType">
    <keep-alive>
      <router-view name="content"></router-view>
    </keep-alive>
    </transition>
  </div>
</transition>
</template>
<script>
import {mapGetters, mapState} from 'vuex'
export default {
  data () {
    return {
      toggleType: 'slide-left'
    }
  },
  computed: {
    ...mapState('player', ['playlist']),
    ...mapGetters('router', ['getPathIndex'])
  },
  beforeRouteUpdate (to, from, next) {
    let toIndex = this.getPathIndex(to.path)
    let fromIndex = this.getPathIndex(from.path)
    if (toIndex > fromIndex) {
      this.toggleType = 'slide-left'
    } else if (toIndex < fromIndex) {
      this.toggleType = 'slide-right'
    }
    next()
  }
}
</script>
<style>
.main-enter-active,
.main-leave-active {
  z-index: 100;
  transition: all 0.2s;
}
</style>

<style scoped>
.main {
  flex: 1;
  position: relative;
  padding-top: 50px;
  width: 100vw;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
}
</style>
