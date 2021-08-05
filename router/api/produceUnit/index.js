// 注意require('koa-router')返回的是函数:
const Router = require('koa-router');
const router = new Router()


router.use('/inputs', require('./routes/inputs/'))


router.use('/materials', require('./routes/materials/'))


module.exports = router.routes()