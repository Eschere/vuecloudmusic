/* 专辑内歌曲列表 */
const Router = require('koa-router')
const url = require('url')
const {requestData} = require('../utils')

const album = new Router()

album.get('/album', async (ctx) => {
  // callback来自客户端
  const query = url.parse(ctx.url, true).query
  const callback = query.callback
  const albummid = query.albummid
  // 设置请求真实服务器的参数
  const options = {
    hostname: 'c.y.qq.com',
    path: `/v8/fcg-bin/fcg_v8_album_info_cp.fcg?albummid=${albummid}&g_tk=5381&jsonpCallback=${callback}&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0`,
    headers: {
      'referer': `https://y.qq.com/n/yqq/album/${albummid}.html`,
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36'
    }
  }
  ctx.body = await requestData(options)
})

module.exports = album
