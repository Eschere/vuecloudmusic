<template>
<div class="main">
  <router-view></router-view>
  <keep-alive>
    <router-view name="content"></router-view>
  </keep-alive>
</div>
</template>

<style scoped>
.main {
  flex: 1;
}
</style>
