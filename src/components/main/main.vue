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

function goHome () {
  navigator.Backbutton.goHome()
}

export default {
  components: {
    Maside
  },
  data () {
    return {
      toggleType: 'slide-left',
      componentActived: true // 组件激活状态
    }
  },
  computed: {
    ...mapState(['overlayOn']),
    ...mapState('player', ['playlist']),
    ...mapGetters('router', ['getPathIndex'])
  },
  beforeRouteEnter (to, from, next) {
    next(() => {
      document.addEventListener('backbutton', goHome, false)
    })
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
    document.removeEventListener('backbutton', goHome, false)
    next()
  },
  activated () {
    this.componentActived = true
  },
  deactivated () {
    this.componentActived = false
  },
  watch: {
    overlayOn (val) {
      if (this.componentActived) {
        if (val) {
          document.removeEventListener('backbutton', goHome, false)
        } else {
          document.addEventListener('backbutton', goHome, false)
        }
      }
    }
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
