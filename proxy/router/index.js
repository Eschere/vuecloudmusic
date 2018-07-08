const Router = require('koa-router')
const playlist = require('./playlist')
const songSheet = require('./songSheet')
const songinfo = require('./songinfo')
const songfile = require('./songfile')
const songlyric = require('./songlyric')
const album = require('./album')
const router = new Router()

router
  .use(playlist.routes(), playlist.allowedMethods())
  .use(songSheet.routes(), songSheet.allowedMethods())
  .use(songinfo.routes(), songinfo.allowedMethods())
  .use(songfile.routes(), songfile.allowedMethods())
  .use(songlyric.routes(), songlyric.allowedMethods())
  .use(album.routes(), album.allowedMethods())
module.exports = router
