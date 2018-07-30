<template>
  <Shade
    :shade="asideOn"
    @close="toggleAside(false)"
  >
    <div class="aside-content">
      <div class="aside-banner">
        <p class="banner-info">
          仿网易云手机App<br>
          建议使用chrome以获得最佳的浏览体验
          或者下载App预览版
        </p>
        <span class="download-btn">下载App</span>
      </div>
      <div class="aside-main">
        <div class="aside-list">
          <span class="aside-list-icon message-icon"></span>
          <p class="aside-list-title">我的消息</p>
        </div>
      </div>
      <div class="aside-footer">
        <router-link
          to="/config"
          class="config-btn"
        >设置</router-link>
        <a href="javascript:window.opener=null;window.open(location,'_self');window.close()" class="close-btn">退出</a>
      </div>
    </div>
  </Shade>
</template>
<script>
import Shade from '#/common/shade'
import {mapState, mapMutations} from 'vuex'

export default {
  components: {
    Shade
  },
  computed: {
    ...mapState(['asideOn'])
  },
  methods: {
    ...mapMutations(['toggleAside'])
  }
}
</script>

<style lang="scss" scoped>

.aside-content {
  width: 80vw;
  height: 100vh;
  background: white;
  display: flex;
  flex-direction: column;
  .aside-banner {
    background: url('~@/components/overlay/img/aside-banner.png') no-repeat center / 100%;
    width: 80vw;
    height: 260 / 456 * 80 + vw;
    box-sizing: border-box;
    padding: 30px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    .banner-info {
      font-size: 14px;
      color: #aaa;
      text-align: center;
    }
    .download-btn {
      font-size: 14px;
      border-radius: 20px;
      padding: 5px 30px;
      color: #eee;
      height: 20px;
      border: 1px solid #eee;
    }
  }
  .aside-main {
    flex: 1;
    overflow: auto;
    height: 100%;
    .aside-list {
      display: flex;
      align-items: center;
      padding: 0 10px;
      height: 40px;
      .aside-list-icon {
        width: 20px;
        height: 20px;
        margin-right: 10px;
      }
      .aside-list-title {
        font-size: 14px;
        color: #333;
      }
      .message-icon {
        background: url('~@/components/overlay/img/message-icon.png') no-repeat center / 100%;
      }
    }
  }
  .aside-footer {
    height: 40px;
    position: relative;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    &::after {
      content: '';
      position: absolute;
      top: 0;
      width: 100%;
      height: 1px;
      background: #eee;
      transform: scale3d(1,0.5,1);
    }
    .close-btn {
      width: 100px;
      text-indent: 30px;
      background: url('~@/components/overlay/img/close-btn.png') no-repeat left / 20px 20px;
    }
    .config-btn {
      width: 100px;
      text-indent: 30px;
      background: url('~@/components/overlay/img/config-btn.png') no-repeat left / 20px 20px;
    }
  }
}

.shade-enter .aside-content,
.shade-leave-to .aside-content{
  transform: translate3d(-100%,0,0);
}
.shade-enter-active .aside-content,
.shade-leave-active .aside-content {
  transition: all 0.3s;
}
</style>
