// 注意require('koa-router')返回的是函数:
const Router = require('koa-router');
const router = new Router()


router.use('/units', require('./routes/units/'))
router.use('/boms', require('./routes/boms/'))
router.use('/procedures', require('./routes/procedures/'))
router.use('/materials', require('./routes/materials/'))
router.use('/productOrders', require('./routes/productOrders/'))
router.use('/unitOrders', require('./routes/unitOrders/'))
router.use('/orders', require('./routes/orders'))

module.exports = router.routes()