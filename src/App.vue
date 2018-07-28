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
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <router-view
      name="mini-player"
      v-if="playlist.length"
    ></router-view>
  </div>
</transition>
</template>

<script>
import AudioPlayer from '#/AudioPlayer/AudioPlayer'
import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  name: 'App',
  components: {
    AudioPlayer
  },
  computed: {
    ...mapState('player', ['playlist']),
    ...mapGetters(['recomPlaylist']),
    ...mapGetters('config', ['currentServer'])
  },
  created () {
    this.getHomeData('recom01105027837228' + Math.floor((Math.random() * 8999) + 1000))
  },
  methods: {
    ...mapActions(['getHomeData'])
  },
  watch: {
    'currentServer.url' () {
      this.getHomeData('recom01105027837228' + Math.floor((Math.random() * 8999) + 1000))
    }
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
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}
@include build-transition('slide');

.app-appear {
  transform: scale3d(1.5, 1.5, 1);
  opacity: 0.5;
}
.app-active {
  transition: all 0.3s;
}
.fade-enter-active,
.fade-leave-active {
  z-index: 200;
  position: absolute!important;
  transition: all 0.25s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translate3d(0 , 10%, 0);
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
  position: absolute!important;
  transition: all 0.25s;
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
  position: absolute!important;
  transition: all .2s;
}
.fade-deep-enter-active {
  z-index: 200;
  position: absolute!important;
  transition: all 0.25s
}

.fast-fade-enter,
.fast-fade-leave-to {
  opacity: 0;
}
.fast-fade-enter-active,
.fast-fade-leave-active {
  position: absolute!important;
  transition: opacity 0.15s;
}
/* 列表过渡 */
.mini-order-move {
  transition: transform .2s linear;
}
.mini-order-leave-active {
  display: none!important;
  transition: all .2s linear;
}

.mini-order-enter-active {
  visibility: hidden;
  transition: opacity .2s linear;
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
