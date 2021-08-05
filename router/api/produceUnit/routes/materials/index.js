// 注意require('koa-router')返回的是函数:
const Router = require('koa-router');
const router = new Router()


router.use('/stocks', require('./stocks'))
router.use('/historys', require('./historys'))


module.exports = router.routes()