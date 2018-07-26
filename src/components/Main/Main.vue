<template>
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
</template>
<script>
import {mapGetters, mapState} from 'vuex'

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
  }
}
</script>

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
