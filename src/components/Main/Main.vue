<template>
<div class="main"
  :style="{paddingBottom: myPlaylist.length ? '50px' : ''}">
  <router-view></router-view>
  <transition name="slide-left">
  <keep-alive>
    <router-view name="content"></router-view>
  </keep-alive>
  </transition>
</div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters(['myPlaylist'])
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
}
</style>
