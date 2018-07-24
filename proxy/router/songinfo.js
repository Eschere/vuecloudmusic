const Router = require('koa-router')
const url = require('url')
const {requestData} = require('../utils')

const songinfo = new Router()

// 获取歌曲相关信息
songinfo.get('/songinfo', async (ctx) => {
  // callback来自客户端
  const query = url.parse(ctx.url, true).query
  const callback = query.callback
  const songmid = query.songmid
  // 设置请求真实服务器的参数
  const options = {
    hostname: 'c.y.qq.com',
    path: `/v8/fcg-bin/fcg_play_single_song.fcg?songmid=${songmid}&tpl=yqq_song_detail&format=jsonp&callback=${callback}&g_tk=5381&jsonpCallback=${callback}&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0`,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36'
    }
  }

  ctx.body = await requestData(options)
})

// 获取单曲评论数量
songinfo.get('/songcommentnum', async (ctx) => {
  // callback来自客户端
  const query = url.parse(ctx.url, true).query
  const callback = query.callback
  const topic = query.topic
  // 设置请求真实服务器的参数
  const options = {
    hostname: 'c.y.qq.com',
    path: `/base/fcgi-bin/fcg_global_comment_h5.fcg?g_tk=5381&jsonpCallback=${callback}&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=GB2312&notice=0&platform=yqq&needNewCode=0&cid=205360772&reqtype=1&biztype=1&topid=${topic}&cmd=4&needmusiccrit=0&pagenum=0&pagesize=0&lasthotcommentid=&callback=${callback}&domain=qq.com`,
    headers: {
      'referer': 'https://y.qq.com/portal/player.html',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36'
    }
  }

  ctx.body = await requestData(options)
})

// 获取单曲评论
songinfo.get('/songcomment', async (ctx) => {
  // callback来自客户端
  const query = url.parse(ctx.url, true).query
  const callback = query.callback
  const songmid = query.songmid
  const pagenum = query.pagenum
  const topic = query.topic
  // 设置请求真实服务器的参数
  const options = {
    hostname: 'c.y.qq.com',
    path: `/base/fcgi-bin/fcg_global_comment_h5.fcg?g_tk=5381&jsonpCallback=jsoncallback8511673969322158&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=GB2312&notice=0&platform=yqq&needNewCode=0&cid=205360772&reqtype=2&biztype=1&topid=${topic}&cmd=8&needmusiccrit=0&pagenum=${pagenum}&pagesize=25&lasthotcommentid=&callback=jsoncallback8511673969322158&domain=qq.com&ct=24&cv=101010`,
    headers: {
      'referer': `https://y.qq.com/n/yqq/song/${songmid}.html`,
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36'
    }
  }

  ctx.body = await requestData(options)
})
module.exports = songinfo
