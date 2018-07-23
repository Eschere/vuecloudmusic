export let lazyLoad = {}

/**
 * v-src 图片异步加载
 * 用法
 * <img v-src:before-load = "src">
 * before-load 图片加载完成前的类名
 * src 图片地址
 */
lazyLoad.install = function (Vue) {
  Vue.directive('src', {
    bind (el, binding) {
      let beforeLoadClass = binding.arg
      el.classList.add(beforeLoadClass)

      let img = new Image()
      img.src = binding.value
      img.onload = () => {
        el.classList.remove(beforeLoadClass)
        el['data-src'] = binding.value
        el.style.backgroundImage = 'url(' + binding.value + ')'
      }
    },
    inserted (el, binding) {
      if (el['data-src'] === binding.value) return
      // console.log(update)
      let beforeLoadClass = binding.arg
      el.classList.add(beforeLoadClass)

      let img = new Image()
      img.src = binding.value
      img.onload = () => {
        el.classList.remove(beforeLoadClass)
        el['data-src'] = binding.value
        el.style.backgroundImage = 'url(' + binding.value + ')'
      }
    },
    componentUpdated (el, binding) {
      if (el['data-src'] === binding.value) return
      // console.log('update')
      let beforeLoadClass = binding.arg
      el.classList.add(beforeLoadClass)

      let img = new Image()
      img.src = binding.value
      img.onload = () => {
        el.classList.remove(beforeLoadClass)
        el['data-src'] = binding.value
        el.style.backgroundImage = 'url(' + binding.value + ')'
      }
    }
  })
}

export let touchLight = {}
/**
 * 元素touch发光
 * options.name 自定义指令名
 * v-touchLight="color" color为发光颜色
 */
touchLight.install = function (Vue, {name = 'touch-light'} = {}) {
  Vue.directive(name, {
    bind (el, binding) {
      let color = binding.value || 'white'
      el.addEventListener('touchstart', () => {
        el.style.textShadow = '0 0 15px ' + color
      })
      el.addEventListener('touchend', () => {
        el.style.textShadow = ''
      })
    }
  })
}
