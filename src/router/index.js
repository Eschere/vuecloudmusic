import Vue from 'vue'
import Router from 'vue-router'
import Main from '#/Main/Main'
import MiniPlayer from '#/MiniPlayer/MiniPlayer'
import MainHeader from '#/MainHeader/MainHeader'
import Home from '#/Home/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      components: {
        default: Main,
        'mini-player': MiniPlayer
      },
      children: [
        {
          path: '',
          name: 'Home',
          components: {
            default: MainHeader,
            content: Home
          }
        }
      ]
    }
  ]
})
