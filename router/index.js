// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();

// add url-route:
router.get('/hello/:name', async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
});

router.get('/', async (ctx, next) => {
    ctx.response.body = '<h1>Index</h1>';
});

router.get('/1', async (ctx, next) => {
    ctx.response.body = '<h1>1111111</h1>';
});

module.exports = router