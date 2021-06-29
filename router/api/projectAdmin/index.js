// 注意require('koa-router')返回的是函数:
const Router = require('koa-router');
const router = new Router()


router.use('/projects', require('./routes/projects'))
router.use('/schedules', require('./routes/schedules'))


module.exports = router.routes()