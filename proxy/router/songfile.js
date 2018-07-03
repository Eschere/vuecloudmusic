const Router = require('koa-router')
const url = require('url')
const {requestData} = require('../utils')

const songfile = new Router()

songfile.get('/songfile', async (ctx) => {
  // callback来自客户端
  const query = url.parse(ctx.url, true).query
  const callback = query.callback
  const songmid = query.songmid
  const filename = query.filename
  const guid = query.guid
  // 设置请求真实服务器的参数
  const options = {
    hostname: 'c.y.qq.com',
    path: `/base/fcgi-bin/fcg_music_express_mobile3.fcg?g_tk=5381&jsonpCallback=${callback}&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&cid=205361747&callback=${callback}&uin=0&songmid=${songmid}&filename=${filename}&guid=${guid}`,
    headers: {
      'referer': 'https://y.qq.com/portal/player.html',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36'
    }
  }

  ctx.body = await requestData(options)
})

module.exports = songfile
