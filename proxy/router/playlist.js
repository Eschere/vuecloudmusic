const Router = require('koa-router')
const url = require('url')
const {requestData} = require('../utils')

const playlist = new Router()

playlist.get('/playlist', async (ctx) => {
  // callback来自客户端
  const query = url.parse(ctx.url, true).query
  const callback = query.callback
  const disstid = query.disstid
  // 设置请求真实服务器的参数
  const options = {
    hostname: 'c.y.qq.com',
    path: `/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg?type=1&json=1&utf8=1&onlysong=0&disstid=${disstid}&format=jsonp&g_tk=5381&jsonpCallback=${callback}&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0`,
    headers: {
      'referer': `https://y.qq.com/n/yqq/playlist/${disstid}.html`,
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36'
    }
  }

  ctx.body = await requestData(options)
})

module.exports = playlist
