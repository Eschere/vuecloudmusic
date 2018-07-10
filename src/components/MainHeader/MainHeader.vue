<template>
  <div class="main-header">
    <v-touch
      class="config-btn"
      @tap="toggleAside(true)"
    >
    </v-touch>
    <div class="main-toggle">
      <router-link
        class="icon-music"
        :to="music.path"
      ></router-link>

      <router-link
          class="icon-discover"
          :to="discover.path"
        ></router-link>

      <router-link
          class="icon-video"
          :to="video.path"
        ></router-link>
    </div>
    <router-link
      class="search-btn"
      to="/search"
    ></router-link>
  </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
export default {
  props: {
    path: String
  },
  computed: {
    ...mapState('router', ['discover', 'video', 'music'])
  },
  methods: {
    ...mapMutations(['toggleAside'])
  }
}
</script>

<style lang="scss" scoped>
.main-header{
  box-sizing: border-box;
  position: fixed;
  left: 0;
  top:0;
  height: 50px;
  width: 100vw;
  padding:0 10px;
  background: #e20000;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @mixin icon-base{
    width: 40px;
    height: 40px;
    margin: 0 5px;
    background: {
      repeat: no-repeat;
      position: center;
    }
  }
  .config-btn {
    @include icon-base;
    background-image: url('./img/icon-aside.png');
    background-size: 60%;
  }
  .main-toggle {
    height: 40px;
    display: flex;
    justify-content: space-around;
    .icon-music {
      @include icon-base();
      background-image: url('./img/music_normal.png');
      background-size: 150%;
    }
    .icon-music.router-link-active {
      background-image: url('./img/music_selected.png');
    }

    .icon-discover {
      @include icon-base();
      background-image: url('./img/discover_normal.png');
      background-size: 150%;
    }
    .icon-discover.router-link-active {
      background-image: url('./img/discover_selected.png');
    }

    .icon-video {
      @include icon-base();
      background-image: url('./img/video_normal.png');
      background-size: 150%;
    }
    .icon-video.router-link-active {
      background-image: url('./img/video_selected.png');
    }
  }
  .search-btn {
    @include icon-base();
    background-image: url('./img/icon-search.png');
    background-size: 60%;
  }

}
</style>
