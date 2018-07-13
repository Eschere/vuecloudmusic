import Vue from 'vue'
import Router from 'vue-router'
import Main from '#/Main/Main'
import MiniPlayer from '#/MiniPlayer/MiniPlayer'
import MainHeader from '#/MainHeader/MainHeader'
import Discover from '#/Discover'
import DiscoverRecom from '#/Discover/Recommend/Recommend'

import Music from '#/Music/Music'

import Video from '#/Video/Video'

// 详情类
const songSheet = () => import('#/songSheet/songSheet')
const songSheetHomePage = () => import('#/songSheet/homePage')
const songList = () => import('#/songSheet/songList')
const songSheetCategory = () => import('#/songSheet/category')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/discover'
    },
    {
      path: '/',
      components: {
        default: Main,
        'mini-player': MiniPlayer
      },
      children: [
        {
          path: 'discover',
          redirect: '/discover/recommend',
          props: {
            default: route => {
              return {path: route.path}
            }
          },
          components: {
            default: MainHeader,
            content: Discover
          },
          children: [
            {
              path: 'recommend',
              name: 'Recommend',
              component: DiscoverRecom
            },
            {
              path: 'friends',
              name: 'Friends',
              component: {
                render: h => h('div', 'friends')
              }
            },
            {
              path: 'fm',
              name: 'fm',
              component: {
                render: h => h('div', 'fm')
              }
            }
          ]
        },
        {
          path: 'music',
          name: 'Misic',
          props: {
            default: route => {
              return {path: route.path}
            }
          },
          components: {
            default: MainHeader,
            content: Music
          }
        },
        {
          path: 'video',
          redirect: 'video/recommend',
          name: 'Video',
          props: {
            default: route => {
              return {path: route.path}
            }
          },
          components: {
            default: MainHeader,
            content: Video
          },
          children: [
            {
              path: '*',
              component: {
                render: h => h('div', {
                  attrs: {
                    style: `
                      width: 100vw;
                      height: 100%;
                      overflow: auto`
                  }
                }, '暂时未开放')
              }
            }
          ]
        }
      ]
    },
    {
      path: '/songSheet',
      components: {
        default: songSheet,
        'mini-player': MiniPlayer
      },
      children: [
        {
          path: '',
          name: 'songSheet',
          component: songSheetHomePage
        },
        {
          path: 'category',
          name: 'songSheetCategory',
          component: songSheetCategory
        },
        {
          path: ':id',
          component: songList
        }
      ]
    },
    {
      path: '*',
      component: {
        render: h => h('div', 'not found')
      }
    }
  ]
})
