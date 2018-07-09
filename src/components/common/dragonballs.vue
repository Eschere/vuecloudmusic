<template functional>
  <div class="balls-box">
    <div
      v-for="ball in props.balls"
      :key="ball.link"
    >
      <router-link
        :to="ball.link"
        class="ball-item"
      >
        <div
          class="cover"
          :style="{backgroundImage:'url('+ ball.img +')'}"
        >
          {{ball.innerText}}
        </div>
        <span>{{ball.title}}</span>
      </router-link>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '@/style/scss.config.scss';
.balls-box {
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  border-bottom: 0.5px solid #eee;
  .ball-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    .cover {
      display: inline-block;
      width: (100vw/7);
      height: (100vw/7);
      border-radius: 50%;
      line-height: (100vw/6);
      text-align: center;
      font-size: 12px;
      color: white;
      background: {
        color: $theme-color;
        size: 100% 100%;
      }
    }
    span {
      margin-top: 10px;
      font-size: 12 / $base + rem;
    }
  }
}
</style>
