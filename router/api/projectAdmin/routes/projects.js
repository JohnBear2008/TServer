const Router = require('koa-router');
const router = new Router()
const nedb = require('../../../../database/nedb')


//接口测试
router.get('/get', async (ctx, next) => {
    console.log('get', ctx.request.body);
    let findRS = await nedb.findDB({
        name: 'projectAdmin_projects',
        filter: ctx.request.body.filter,
        sort: ctx.request.body.sort
    })

    console.log('findRS', findRS);
    next()
    ctx.response.body = findRS

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
    let isExistRS = await nedb.isExist({
        name: 'projectAdmin_projects',
        filter: {
            _id: ctx.request.body._id
        }
    })
    console.log('isExistRS1', isExistRS);

    let rs = {};
    switch (true) {

        case isExistRS:
            let updateRs = await nedb.updateOneDB({
                name: 'projectAdmin_projects',
                filter: {
                    _id: ctx.request.body._id
                },
                data: ctx.request.body
            })
            rs = updateRs ? {
                result: 'success'
            } : {
                result: 'fail'
            }
            break;

        default:
            let isDuplicate = await nedb.isExist({
                name: 'projectAdmin_projects',
                filter: {
                    projectId: ctx.request.body.projectId
                }
            })
            console.log('isDuplicate2', isDuplicate);

            if (isDuplicate) {
                rs = {
                    result: 'duplicate'
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

            break;
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
        name: 'projectAdmin_projects',
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