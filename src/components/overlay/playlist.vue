<template>
  <shade
    :shade="showPlaylist"
    @close="$emit('close')"
  >
    <div
      class="playlist-modal"
      @touchstart.self="$emit('close')"
    >
      <div class="playlist-box">
        <div class="playlist-head">
          <v-touch
            class="looptype"
            @tap="toggleLoopType"
          >
            <span
              class="iconfont"
              :class="loop.class"
            ></span>
            <span class="">{{loop.str}}({{playlist.length}})</span>
          </v-touch>
          <div style="flex:1">

          </div>
          <v-touch
            class="clear-list iconfont icon-dustbin"
            @tap="clearPlaylistHandler"
          >
          </v-touch>
        </div>
        <div class="playlist-list">
          <div
            class="playlist-item"
            v-for="(item,index) in playlist"
            :class="{active: currentSong.indexInPlaylist  === index}"
            :key="'olpl'+ item.songmid"
          >
            <span class="iconfont icon-volume playing" v-if="currentSong.indexInPlaylist  === index"></span>
            <v-touch
              class="item-text"
              @tap="changeSong(index)"
              :enabled="!item.disable"
              :class="{disabled: item.disable}"
            >
              <span class="song-name">{{item.songname}}</span>
              <span class="singer-name"> - {{item.singername}}</span>
            </v-touch>
            <div
              @click="removeItem(index)"
              class="iconfont icon-close"
            >
            </div>
          </div>
        </div>
      </div>
    </div>
  </shade>
</template>

<script>
import shade from '#/Shade/Shade'

import {mapState, mapMutations, mapActions} from 'vuex'
export default {
  components: {
    shade
  },
  props: ['showPlaylist'],
  computed: {
    ...mapState('player', ['playlist', 'currentSong', 'loopType']),
    loop () {
      switch (this.loopType) {
        case 'proper':
          return {
            class: 'icon-circle',
            str: '列表循环'
          }
        case 'single':
          return {
            class: 'icon-single',
            str: '单曲循环'
          }
        case 'random':
          return {
            class: 'icon-random',
            str: '随机播放'
          }
      }
    }
  },
  methods: {
    ...mapMutations('player', ['clearPlaylist', 'toggleLoopType']),
    ...mapActions('player', ['requestSongInfo', 'removePlaylistItem']),
    clearPlaylistHandler () {
      this.$emit('close')
      this.clearPlaylist()
    },
    removeItem (index) {
      this.removePlaylistItem(index)
    },
    changeSong (index) {
      if (this.currentSong.indexInPlaylist !== index) {
        this.requestSongInfo({index})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/style/scss.config.scss';
.playlist-modal {
  width: 100vw;
  height: 100vh;
}
.playlist-box {
  width: 100vw;
  height: 60vh;
  background: white;
  position: fixed;
  top: 40vh;
  overflow: hidden;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  overflow: hidden;
  .playlist-head {
    position: relative;
    height: 50px;
    padding: 0 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 1px;
      border: none;
      bottom: 0;
      background-color: rgba($color: #ccc, $alpha: 0.5);
      transform: scaleY(0.5);
    }
  }
  .playlist-list {
    overflow: auto;
    height: 100%;
  }
  .playlist-item {
    display: flex;
    height: 45px;
    padding: 0 10px;
    justify-content: space-between;
    align-items: center;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      width: 100vw;
      height: 1px;
      border: none;
      bottom: 0;
      left: 0;
      background-color: rgba($color: #ccc, $alpha: 0.5);
      transform: scaleY(0.5);
    }
    .icon-volume {
      margin-right: 10px;
    }
    .item-text {
      flex: 1;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      .singer-name {
        font-size: 12px;
        color: #999;
      }
    }
    .item-text.disabled {
      color: #ccc;
    }
    .icon-close {
      color: #999;
      font-size: 14px;
    }
  }
  .playlist-item.active .icon-volume,
  .playlist-item.active .singer-name,
  .playlist-item.active .song-name {
    color: $theme-color;
  }
}

.shade-enter .playlist-modal,
.shade-leave-to .playlist-modal {
  transform: translate3d(0, 100%, 0);
}
.shade-enter-active .playlist-modal,
.shade-leave-active .playlist-modal {
  transition: transform 0.3s;
}

</style>
