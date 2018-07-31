<template>
  <div class="music-page">
    <div class="music-list">
      <div class="music-item">
        <span class="item-icon localmusic"></span>
        <span class="item-text">本地音乐</span>
        <span class="item-num">(0)</span>
      </div>
      <div class="music-item">
        <span class="item-icon recently"></span>
        <span class="item-text">最近播放</span>
        <span class="item-num">(0)</span>
      </div>
      <div class="music-item">
        <span class="item-icon download"></span>
        <span class="item-text">下载管理</span>
        <span class="item-num">(0)</span>
      </div>
      <div class="music-item">
        <span class="item-icon fm"></span>
        <span class="item-text">我的电台</span>
        <span class="item-num">(0)</span>
      </div>
      <div class="music-item">
        <span class="item-icon collection"></span>
        <span class="item-text">我的收藏</span>
        <span class="item-num">(0)</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/style/scss.config.scss';
.music-page {
  width: 100%;
  height: 100%;
  overflow: auto;
  .music-list {
    .music-item {
      display: flex;
      align-items: center;
      height: 50px;
      @include thin-line();
      .item-icon {
        width: 30px;
        height: 30px;
        margin: 10px;
        background: {
          repeat: no-repeat;
          position: center;
          size: 100%;
        }
      }

      @mixin icon($name) {
        .item-icon.#{$name} {
          background-image: url('./img/#{$name}.png')
        }
      }
      @include icon(localmusic);
      @include icon(recently);
      @include icon(fm);
      @include icon(download);
      @include icon(collection);

      .item-text {
        font-size: 15px;
      }
      .item-num {
        font-size: 12px;
        color: #999;
        margin: 5px;
      }
    }
  }
}
</style>
