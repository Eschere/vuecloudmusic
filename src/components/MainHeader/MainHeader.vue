<template>
  <div class="main-header">
    <div
      class="config-btn"
      @click="toggleAside(true)"
    >

    </div>
    <div class="main-toggle">
      <span class="icon-music"></span>
      <span class="icon-discover"></span>
      <span class="icon-video"></span>
    </div>
    <div class="search-btn">

    </div>
  </div>
</template>
<script>
import {mapMutations} from 'vuex'
export default {
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
  width: 100%;
  padding:0 10px;
  background: #e20000;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @mixin icon-base{
    width: 40px;
    height: 40px;
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
    flex-grow: 0.3;
    justify-content: space-around;
    .icon-music {
      @include icon-base();
      background-image: url('./img/music_normal.png');
      background-size: 150%;
    }
    .icon-music.selected {
      background-image: url('./img/music_selected.png');
    }

    .icon-discover {
      @include icon-base();
      background-image: url('./img/discover_normal.png');
      background-size: 150%;
    }
    .icon-discover.selected {
      background-image: url('./img/discover_selected.png');
    }

    .icon-video {
      @include icon-base();
      background-image: url('./img/video_normal.png');
      background-size: 150%;
    }
    .icon-video.selected {
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
