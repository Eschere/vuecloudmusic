<template>
  <detailPage
    title="网络"
    :needMiniPlayer=false
  >
    <div class="config-network-content">
      <div class="config-group">
        <span class="group-title">
          网络
        </span>
        <router-link
          to="/config/network"
          class="group-item"
        >
          <div class="group-text">
            服务器地址
          </div>
          <span class="group-value">
            {{currentServer.name}}
          </span>
        </router-link>
      </div>
    </div>


  </detailPage>
</template>

<script>
import detailPage from '#/common/detailFramework'
export default {
  components: {
    detailPage
  }
}
</script>

<style lang="scss" scoped>
.group-title {
  display: inline-block;
  font-size: 12px;
  color: #999;
  margin-bottom: 10px;
}
.group-item {
  display: flex;
  height: 30px;
  align-items: center;
  justify-content: space-between;
  @include thin-line();
  .group-text {
    font-size: 14px;
  }
  .group-value {
    font-size: 12px;
    color: #999;
  }
}
</style>
