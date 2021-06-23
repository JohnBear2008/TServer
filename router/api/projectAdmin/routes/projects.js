const Router = require('koa-router');
const router = new Router()
const nedb = require('../../../../database/nedb')


//接口测试
router.get('/', async (ctx, next) => {
    next()
    ctx.response.body = {
        data: 'route projectAdmin_projects/projects'
    };
});

//接口测试
router.post('/insert', async (ctx, next) => {
    console.log('insert', ctx.request.body);

    nedb.insertDB({
        name: 'projectAdmin_projects',
        data: ctx.request.body
    })
    next()
    ctx.response.body = {
        result: 'success'
    };
});


//接口测试
router.post('/save', async (ctx, next) => {
    console.log('save', ctx.request.body);
    let filter = {
        id: ctx.request.body.id
    }

    let isExistRS = await nedb.isExist({
        name: 'projectAdmin_projects',
        filter: filter
    })

    console.log('isExistRS', isExistRS);
    let rs = {};
    if (isExistRS) {
        let updateRs = await nedb.updateOneDB({
            name: 'projectAdmin_projects',
            filter: filter,
            data: ctx.request.body
        })
        rs = updateRs ? {
            result: 'success'
        } : {
            result: 'fail'
        }
    } else {
        let insertRs = await nedb.insertDB({
            name: 'projectAdmin_projects',
            data: ctx.request.body
        })
        rs = insertRs ? {
            result: 'success'
        } : {
            result: 'fail'
        }
    }
    next()
    ctx.response.body = rs
});


module.exports = router.routes()