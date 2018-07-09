<template>
  <!-- 二级导航头部 -->
  <div
    class="head-l2"
    ref="head"
  >
    <div
      class="nav-box"
      ref="navBox"
    >
      <router-link
        :style="{width: pages.length < 4 ? '33.3333vw' : ''}"
        v-for="(page,index) in pages"
        :key="page.link"
        :to="page.link"
        :ref="index === activePageIndex ? 'navItem' : index === pages.length - 1 ? 'last' : null"
      >{{ page.title }}</router-link>
      <span
        class="active-cursor"
        :class="{animating: animate}"
        @animationend="animate = false"
        :style="cursorLocation"
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pages: {
      type: Array,
      required: true
    },
    activePageIndex: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      cursorLocation: {
        transform: 'translateX(0)'
      },
      animate: false
    }
  },
  mounted () {
    let offset = this.$refs.navItem[0].$el.offsetLeft
    let width = this.$refs.navItem[0].$el.clientWidth
    this.cursorLocation = {
      transform: 'translateX(' + (offset + width / 2) + 'px) translateX(-50%)'
    }

    // 使用第三方库管理滚动条
    if (this.pages.length > 4) {
      this.scroll = new window.IScroll(this.$refs.head, {
        scrollX: true,
        scrollY: false,
        preventDefault: false
      })
    }
  },
  watch: {
    activePageIndex (val, oldVal) {
      // 开启游标动画效果
      this.animate = true

      // 设置变化参数
      this.$nextTick(() => {
        // 获取当前活动链接按钮的数据
        let offset = this.$refs.navItem[0].$el.offsetLeft
        let width = this.$refs.navItem[0].$el.clientWidth
        // 设置标识游标的位置
        this.cursorLocation = {
          transform: 'translateX(' + (offset + width / 2) + 'px) translateX(-50%)'
        }

        // 没有滚动条不做处理
        if (this.pages.length < 4) return

        let distance = (offset + width / 2) - (this.$refs.head.clientWidth / 2)
        if (distance <= 0) {
          distance = 0
        } else if (distance > this.$refs.navBox.clientWidth - this.$refs.head.clientWidth) {
          distance = this.$refs.navBox.clientWidth - this.$refs.head.clientWidth
        }
        this.scroll.scrollTo(-distance, 0, 300, window.IScroll.utils.ease.quadratic)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$base:100;
.head-l2 {
  height: 40px;
  width: 100%;
  overflow: hidden;
  background: #e20000;
  position: absolute;
  top: 0;
  line-height: 40px;
  .nav-box {
    white-space: nowrap;
    display: inline-block;
    a {
      display: inline-block;
      color:rgb(240, 240, 240);
      min-width: 1.12/5*100vw;
      text-align: center;
      font-size: 15 / $base + rem;
    }
    a.router-link-active {
      color:white;
      font-weight: bold;
    }
    .active-cursor {
      width: 30 / $base + rem;
      height: 2px;
      background-color: white;
      border-radius: 2px;
      position: absolute;
      bottom: 5px;
      left: 0;
    }
    .active-cursor.animating {
      animation: cursor 0.4s;
      transition: all 0.4s;
    }
  }
}
@keyframes cursor {
  0% {
    width: 30 / $base + rem;
  }
  50% {
    width: 55 / $base + rem;
  }
  100% {
    width: 30 / $base + rem;
  }
}
</style>
