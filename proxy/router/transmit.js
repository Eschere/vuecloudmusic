const Router = require('koa-router')
const url = require('url')
const http = require('http')
// const {requestData} = require('../utils')

const transmit = new Router()

transmit.get('/transmit', async (ctx) => {
  // callback来自客户端
  const realPath = url.parse(ctx.url, true).hash
  function request () {
    return new Promise((resolve) => {
      http.request(realPath, res => {
        resolve(res)
      })
    })
  }
  ctx.body = await request()
})

module.exports = transmit
