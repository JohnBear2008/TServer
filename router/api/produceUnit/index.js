// 注意require('koa-router')返回的是函数:
const Router = require('koa-router');
const router = new Router()


router.use('/inputs', require('./routes/inputs/'))



module.exports = router.routes()