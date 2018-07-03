const Router = require('koa-router')
const url = require('url')
const {requestData} = require('../utils')

const songinfo = new Router()

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

module.exports = songinfo
