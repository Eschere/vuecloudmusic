import Vue from 'vue'
import Router from 'vue-router'
import Main from '#/main/main'
import MiniPlayer from '#/miniPlayer/miniPlayer'
import MainHeader from '#/mainHeader/mainHeader'
import Discover from '#/discover'
import DiscoverRecom from '#/discover/recommend/recommend'

import Music from '#/music/music'

import Video from '#/video/video'

import Config from '#/config'

import Search from '#/search'

import notFound from '#/common/notFound'
// 详情类
const songSheet = () => import('#/songSheet/songSheet')
const songSheetHomePage = () => import('#/songSheet/homePage')
const songSheetSongList = () => import('#/songSheet/songList')
const songSheetCategory = () => import('#/songSheet/category')

// 主播放器界面
const Player = () => import('#/player/player')

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
              props: {
                info: '朋友暂时未开放...',
                pagekey: 'friends'
              },
              component: notFound
            },
            {
              path: 'fm',
              name: 'fm',
              props: {
                info: '电台功能未开放...',
                pagekey: 'fm'
              },
              component: notFound
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
              props: {
                info: '该功能暂时未开放...'
              },
              component: notFound
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
          component: songSheetSongList
        }
      ]
    },
    {
      path: '/player',
      component: Player
    },
    {
      path: '/config',
      component: Config
    },
    {
      path: '/search',
      components: {
        default: Search,
        'mini-player': MiniPlayer
      }
    },
    {
      path: '*',
      props: {
        transition: 'fade',
        backbtn: true
      },
      component: notFound
    }
  ]
})
