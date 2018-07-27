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
    <Maside></Maside>
  </div>
</transition>
</template>
<script>
import {mapGetters, mapState, mapMutations} from 'vuex'

import Maside from '#/overlay/aside'

export default {
  components: {
    Maside
  },
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
  },
  beforeRouteLeave (to, from, next) {
    mapMutations(['toggleAside']).toggleAside.call(this, false)
    next()
  }
}
</script>
<style>

.main-enter-active,
.main-leave-active {
  position: absolute!important;
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
