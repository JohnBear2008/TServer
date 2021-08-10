const Router = require('koa-router');
const router = new Router()
const nedb = require('../../../../../database/nedb')


//接口测试
router.post('/get', async (ctx, next) => {
    console.log('get', ctx.request.body);
    let findRS = await nedb.findDB({
        name: 'produceTools_boms',
        filter: ctx.request.body.filter
    })

    console.log('findRS', findRS);
    next()
    ctx.response.body = findRS

});



//接口测试
router.post('/add', async (ctx, next) => {
    console.log('insert', ctx.request.body);
    let data = ctx.request.body

    let rs = await nedb.insertDB({
        name: 'produceTools_boms',
        data: data
    })

    let isExistRS = await nedb.isExist({
        name: 'produceTools_boms',
        filter: {
            subMaterialId: data[0].materialId
        },
    })

    if (isExistRS) {
        let rsUpdate = await nedb.updateOneDB({
            name: 'produceTools_boms',
            filter: {
                subMaterialId: data[0].materialId
            },
            data: {
                hasChildren: 1
            }
        })
        rs = rs && rsUpdate
    }

    let result = rs ? 'success' : 'fail'

    next()
    ctx.response.body = {
        result: result
    };
});


//接口测试
router.post('/save', async (ctx, next) => {
    console.log('save', ctx.request.body);
    let filter = {
        _id: ctx.request.body._id
    }

    let isExistRS = await nedb.isExist({
        name: 'produceTools_boms',
        filter: filter
    })

    console.log('isExistRS', isExistRS);
    let rs = {};
    if (isExistRS) {
        let updateRs = await nedb.updateOneDB({
            name: 'produceTools_boms',
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
            name: 'produceTools_boms',
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
        name: 'produceTools_boms',
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