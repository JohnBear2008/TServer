const Router = require('koa-router');
//定义api前缀
var router = new Router()
router.use('/users', require('./routes/users'))


module.exports = router.routes()