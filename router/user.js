// 注意require('koa-router')返回的是函数:
const Router = require('koa-router');

var router = new Router({
    prefix: '/users'
})

router.get('/', async (ctx, next) => {
    ctx.response.body = '<h1>users</h1>';
});
router.get('/:id', async (ctx, next) => {
    ctx.response.body = '<h1>users,id</h1>';
}); // responds to "/users/:id"


module.exports = router