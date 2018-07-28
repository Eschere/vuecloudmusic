/* 歌单内歌曲列表 */
const Router = require('koa-router')
const url = require('url')
const {requestData} = require('../utils')

const playlist = new Router()

playlist.get('/playlist', async (ctx) => {
  // callback来自客户端
  const query = url.parse(ctx.url, true).query
  const callback = query.callback
  const dissid = query.dissid
  // 设置请求真实服务器的参数
  const options = {
    hostname: 'c.y.qq.com',
    path: `/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg?type=1&json=1&utf8=1&onlysong=0&disstid=${dissid}&format=jsonp&g_tk=5381&jsonpCallback=${callback}&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0`,
    headers: {
      'referer': `https://y.qq.com/n/yqq/playlist/${dissid}.html`,
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36'
    }
  }

  ctx.body = await requestData(options)
})

playlist.get('/playlistcommentnum', async (ctx) => {
  // callback来自客户端
  const query = url.parse(ctx.url, true).query
  const callback = query.callback
  const topic = query.topic
  // 设置请求真实服务器的参数
  const options = {
    hostname: 'c.y.qq.com',
    path: `/base/fcgi-bin/fcg_global_comment_h5.fcg?g_tk=5381&jsonpCallback=${callback}&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=GB2312&notice=0&platform=yqq&needNewCode=0&cid=205360772&reqtype=1&biztype=3&topid=${topic}&cmd=4&needmusiccrit=0&pagenum=0&pagesize=0&lasthotcommentid=&callback=${callback}&domain=qq.com`,
    headers: {
      'referer': `https://y.qq.com/n/yqq/playlist/${topic}.html`,
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36'
    }
  }
  ctx.body = await requestData(options)
})

playlist.get('/favNum', async (ctx) => {
  // callback来自客户端
  const query = url.parse(ctx.url, true).query
  const callback = query.callback
  const dissid = query.dissid
  // 设置请求真实服务器的参数
  const options = {
    hostname: 'c.y.qq.com',
    path: `/3gmusic/fcgi-bin/3g_dir_order_uinlist?g_tk=5381&jsonpCallback=getFavNum4207612873&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&cid=322&nocompress=1&disstid=${dissid}&callback=${callback}`,
    headers: {
      'referer': `https://y.qq.com/n/yqq/playlist/${dissid}.html`,
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36'
    }
  }
  ctx.body = await requestData(options)
})
module.exports = playlist
