<template>
<div
  class="detail-page"
  :style="{paddingBottom: needMiniPlayer ? playlist.length ? '50px' : '' : ''}"
>
  <head class="detail-head">
    <v-touch
      tag="span"
      class="back"
      @tap="back"
    >
    </v-touch>
    <span class="title">
      {{title}}
    </span>
  </head>
  <div class="detail-main">
    <slot></slot>
  </div>
</div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  props: {
    title: String,
    needMiniPlayer: {
      default: true
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  },
  computed: {
    ...mapState('player', ['playlist'])
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/scss.config.scss";
.detail-page {
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  padding-top: 50px;
  background: white;
  .detail-head {
    position: fixed;
    top: 0;
    height: 50px;
    width: 100vw;
    display: flex;
    align-items: center;
    background-color: $theme-color;
    .back {
      width: 25 / $base + rem;
      height: 25 / $base + rem;
      background: url('~@/components/common/img/ow.png') no-repeat center / 100%;
      margin: 0 20px;
    }
    .title {
      color: white;
      font-weight: 500;
      font-size: 18 / $base + rem;
    }
  }
  .detail-main {
    flex: 1;
    height: 100%;
    overflow: auto;
  }
}
</style>
