const Router = require('koa-router')
const playlist = require('./playlist')

const router = new Router()

router.use(playlist.routes(), playlist.allowedMethods())

module.exports = router
