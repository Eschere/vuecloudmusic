<template>
<transition
  appear
  appear-class="app-appear"
  appear-active-class="app-active"
>
  <div
    id="app"
  >
    <AudioPlayer></AudioPlayer>
    <router-view></router-view>
    <router-view
      name="mini-player"
      v-if="myPlaylist.length"
    ></router-view>
    <Maside></Maside>
  </div>
</transition>
</template>

<script>
import AudioPlayer from '#/AudioPlayer/AudioPlayer'
import Maside from '#/aside/aside'
import {mapGetters, mapMutations, mapActions} from 'vuex'

export default {
  name: 'App',
  components: {
    AudioPlayer,
    Maside
  },
  computed: {
    // ...mapState(['asideOn']),
    ...mapGetters(['recomPlaylist', 'myPlaylist'])
  },
  created () {
    this.getHomeData('recom011050278372287448')
  },
  methods: {
    ...mapMutations('config/', ['setServer']),
    ...mapActions(['getHomeData'])
  }
}
</script>

<style lang="scss">
@import '~@/style/scss.config.scss';
::-webkit-scrollbar {
  display: none;
}
::-webkit-scrollbar-button {
  display: none;
}
* {
  margin: 0;
  padding: 0;
}
html {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
body{
  @extend html;
  font-size: 16px;
  background: white;
  font-family: Arial, Helvetica, sans-serif;
}
a {
  text-decoration: none;
  color: black;
}
ul {
  list-style: none;
}
#app {
  box-sizing: border-box;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
@include build-transition('slide');

.app-appear {
  transform: scale(1.5);
  opacity: 0.5;
}
.app-active {
  transition: all 0.3s;
}

.fade-back-leave-to {
  opacity: 0;
  transform: translate3d(0 , 10%, 0);
}

.fade-back-enter-active {
  z-index: 150;
  position: absolute;
  transition: all 0s;
}
.fade-back-leave-active {
  z-index: 200;
  position: absolute;
  transition: all .25s;
}

.fade-deep-enter {
  opacity: 0;
  transform: translate3d(0 , 10%, 0);
}
.fade-deep-leave-to {
  opacity: 1;
}
.fade-deep-leave-active {
  z-index: 150;
  position: absolute;
  transition: all 0.2s;
}
.fade-deep-enter-active {
  z-index: 200;
  position: absolute;
  transition: all 0.25s
}

/* loading样式 */
.loading-placeholder {
  width: 100vw;
  height: 10vw;
  text-align: center;
  .icon {
    display: inline-block;
    width: 10vw;
    height: 10vw;
    background: url('~@/components/common/img/loading.png') no-repeat center / auto 100%;
    animation: loading 1s infinite linear;
  }
}
@keyframes loading {
  from {
    transform: rotate(0)
  }
  to {
    transform: rotate(360deg)
  }
}
</style>
