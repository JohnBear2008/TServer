const Router = require('koa-router');
const router = new Router()
const nedb = require('../../../database/nedb')


//接口测试
router.get('/get', async (ctx, next) => {
    console.log('users get', ctx.request.query);
    let findRS = await nedb.findDB({
        name: 'tweb_users',
        filter: ctx.request.query.filter
    })

    console.log('findRS', findRS);
    next()
    ctx.response.body = findRS

});

router.post('/checkUserExisted', async (ctx, next) => {
    console.log('checkUserExisted', ctx.request.body);
    let findRS = await nedb.findDB({
        name: 'tweb_users',
        filter: ctx.request.body.filter
    })
    console.log('findRS', findRS);
    next()
    ctx.response.body = findRS.length > 0 ? true : false
});

//接口测试
router.post('/insert', async (ctx, next) => {
    console.log('insert', ctx.request.body);

    nedb.insertDB({
        name: 'tweb_users',
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
        _id: ctx.request.body._id
    }

    let isExistRS = await nedb.isExist({
        name: 'tweb_users',
        filter: filter
    })

    console.log('isExistRS', isExistRS);
    let rs = {};
    if (isExistRS) {
        let updateRs = await nedb.updateOneDB({
            name: 'tweb_users',
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
            name: 'tweb_users',
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


//接口测试
router.post('/delete', async (ctx, next) => {
    console.log('delete', ctx.request.body);
    let idArr = ctx.request.body.idArr
    let filter = {
        _id: {
            $in: idArr
        }
    }
    let rs = {};
    let removeRs = await nedb.deleteDB({
        name: 'tweb_users',
        filter: filter,
        data: ctx.request.body
    })
    rs = removeRs ? {
        result: 'success'
    } : {
        result: 'fail'
    }

    next()
    ctx.response.body = rs
});

module.exports = router.routes()