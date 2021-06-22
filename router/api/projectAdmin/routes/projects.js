const Router = require('koa-router');
const router = new Router()


//接口测试
router.get('/', async (ctx, next) => {
    next()
    ctx.response.body = {
        data: 'route projectAdmin/projects'
    };
});


module.exports = router.routes()