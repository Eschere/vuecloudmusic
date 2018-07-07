<template>
  <!-- 二级导航头部 -->
  <div
    class="head-l2"
  >
    <div
      class="nav-box"
      ref="navBox"
    >
      <router-link
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
  },
  beforeDestroy () {
    clearInterval(this.timer)
    this.timer = null
  },
  deactivated () {
    clearInterval(this.timer)
    this.timer = null
  },
  watch: {
    activePageIndex (val, oldVal) {
      // 开启动画效果
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
        let headW = this.$refs.navBox.clientWidth

        if (this.timer) {
          clearInterval(this.timer)
          this.timer = null
        }

        // 设置滚动过渡
        let distance = Math.abs((offset + width / 2) - (headW / 2) - this.$refs.navBox.scrollLeft)
        // 间隔时间
        let interval = 400 / (distance / 2)

        // 计算可滚动总长度
        let lastItem = this.$refs.last[0] ? this.$refs.last[0].$el : this.$refs.navItem[0].$el
        let totalWidth = lastItem.clientWidth + lastItem.offsetLeft

        if (val > oldVal) {
          if ((offset + width / 2) > (headW / 2) && (offset + width / 2) - (headW / 2) > this.$refs.navBox.scrollLeft) {
            this.timer = setInterval(() => {
              this.$refs.navBox.scrollLeft += 2

              if (this.$refs.navBox.scrollLeft >= totalWidth - headW ||
                this.$refs.navBox.scrollLeft >= (offset + width / 2) - (headW / 2) ||
                this.$refs.navBox.scrollLeft === 0) {
                clearInterval(this.timer)
                this.timer = null
              }
            }, interval)
          }
        } else {
          if ((offset + width / 2) - (headW / 2) < this.$refs.navBox.scrollLeft) {
            this.timer = setInterval(() => {
              this.$refs.navBox.scrollLeft -= 2
              if (this.$refs.navBox.scrollLeft <= 0 || this.$refs.navBox.scrollLeft <= (offset + width / 2) - (headW / 2)) {
                clearInterval(this.timer)
                this.timer = null
              }
            }, interval)
          }
        }
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
  .nav-box {
    height: 100%;
    display: flex;
    justify-content: space-between;
    overflow: auto;
    align-items: center;
    position: relative;
    a {
      color:rgb(240, 240, 240);
      min-width: 1.4/5*100vw;
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
