<template>
<div class="main">
  <router-view></router-view>
  <router-view name="content"></router-view>
</div>
</template>

<style scoped>
.main {
  flex: 1;
}
</style>
