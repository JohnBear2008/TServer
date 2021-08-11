// 注意require('koa-router')返回的是函数:
const Router = require('koa-router');
const router = new Router()

router.use('/settings', require('./routes/settings/'))
router.use('/inputs', require('./routes/inputs/'))


router.use('/materials', require('./routes/materials/'))
router.use('/orders', require('./routes/orders/'))

module.exports = router.routes()