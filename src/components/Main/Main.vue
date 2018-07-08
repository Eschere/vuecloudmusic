<template>
<div class="main">
  <router-view></router-view>
  <transition name="slide-left">
  <keep-alive>
    <router-view name="content"></router-view>
  </keep-alive>
  </transition>
</div>
</template>

<style scoped>
.main {
  flex: 1;
  position: relative;
  padding-top: 50px;
  width: 100vw;
}
</style>
