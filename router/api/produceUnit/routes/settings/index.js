// 注意require('koa-router')返回的是函数:
const Router = require('koa-router');
const router = new Router()


router.use('/config', require('./config'))



module.exports = router.routes()