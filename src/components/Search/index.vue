<template>
  <div class="search-page">
    <div class="search-head">
      <v-touch @tap="$router.go(-1)" class="back"></v-touch>
      <input
        type="text"
        class="search-input"
        placeholder="Love9"
      >
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  mounted () {
    // 防止页面被输入法弹起挤压
    document.body.style.width = document.documentElement.style.width = window.innerWidth + 'px'
    document.body.style.height = document.documentElement.style.height = window.innerHeight + 'px'
  },
  activated () {
    document.body.style.width = document.documentElement.style.width = window.innerWidth + 'px'
    document.body.style.height = document.documentElement.style.height = window.innerHeight + 'px'
  },
  deactivated () {
    document.body.style.width = document.documentElement.style.width = ''
    document.body.style.height = document.documentElement.style.height = ''
  },
  destroyed () {
    document.body.style.width = document.documentElement.style.width = ''
    document.body.style.height = document.documentElement.style.height = ''
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/scss.config.scss';
.search-page {
  min-height: 100%;
  min-width: 100%;
  .search-head {
    height: 50px;
    background-color: $theme-color;
    display: flex;
    align-items: center;
    .back {
      width: 25 / $base + rem;
      height: 25 / $base + rem;
      background: url("~@/components/common/img/ow.png") no-repeat center / 100%;
      margin: 0 20px;
    }
    .search-input {
      height: 30px;
      background: none;
      border: none;
      color: rgba($color: white, $alpha: .8);
      border-bottom: 1px solid rgba($color: #eee, $alpha: .6);
      margin-right: 5px;
      flex: 1;
      outline: none;
      font-size: 18px;
      &::placeholder {
        color: rgba($color: #eee, $alpha: .6);
      }
    }
  }
}
</style>
