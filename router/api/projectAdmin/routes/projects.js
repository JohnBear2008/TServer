const Router = require('koa-router');
const router = new Router()
const nedb=require('../../../../database/nedb')


//接口测试
router.get('/', async (ctx, next) => {
    next()
    ctx.response.body = {
        data: 'route projectAdmin/projects'
    };
});

//接口测试
router.post('/insert', async (ctx, next) => {
    console.log('insert', ctx.request.body);

    nedb.insertDB({name:'test',data:{a:1}})
    next()
    ctx.response.body = {
        data: 'route projectAdmin/projects'
    };
});


module.exports = router.routes()