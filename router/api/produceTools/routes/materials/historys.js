const Router = require('koa-router');
const router = new Router()
const nedb = require('../../../../../database/nedb')


//接口测试
router.post('/', async (ctx, next) => {
    console.log('history get', ctx.request.body);
    let findRS = await nedb.findDB({
        name: 'produceTools_materials_historys',
        filter: ctx.request.body.filter,
        sort: {
            dateTime: -1
        }
    })

    console.log('findRS', findRS);
    next()
    ctx.response.body = findRS

});



module.exports = router.routes()