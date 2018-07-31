<template>
<transition
  :name="transition"
>
  <div class="not-found"
    :key="'notfoundpage'+pagekey"
  >
    <div class="not-found-icon iconfont icon-404-not-found">
    </div>
    <span>{{info}}</span>
    <v-touch
      class="not-found-back-btn"
      v-if="backbtn"
      @tap="$router.go(-1)"
    >返回</v-touch>
  </div>
</transition>
</template>
<script>
export default {
  props: ['transition', 'info', 'backbtn', 'pagekey']
}
</script>

<style lang="scss">
.not-found {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  .not-found-icon {
    font-size: 200px;
    animation: colorful 5s infinite alternate linear;
  }
  .not-found-back-btn {
    margin: 5px;
    border-radius: 20px;
    height: 20px;
    line-height: 20px;
    // box-sizing: border-box;
    padding: 5px 30px;
    font-size: 14px;
    border: 1px solid #ccc;
  }
}
@keyframes colorful {
  from {
    color: red;
  }
  to {
    color: green;
  }
}
</style>
