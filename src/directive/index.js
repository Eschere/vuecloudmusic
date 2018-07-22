let myDirective = {}

/**
 * v-src 图片异步加载
 * 用法
 * <img v-src:before-load = "src">
 * before-load 图片加载完成前的类名
 * src 图片地址
 */
myDirective.install = function (Vue, options) {
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
export default myDirective
