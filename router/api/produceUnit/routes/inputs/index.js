// 注意require('koa-router')返回的是函数:
const Router = require('koa-router');
const router = new Router()


router.use('/materials', require('./materials'))
router.use('/orders', require('./orders'))


module.exports = router.routes()