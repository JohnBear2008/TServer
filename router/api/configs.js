// 注意require('koa-router')返回的是函数:
const Router = require('koa-router');
let nedb = require('../../database/nedb/index')

var router = new Router({
    prefix: '/api'
})

router.get('/getPageModelIds', async (ctx) => {
    let r = await nedb.findDB({
        name: 'modelsConfig',
        data: {}
    })
    let modelIds = [];
    if (r.length > 0) {
        for (const n of r) {
            modelIds.push(n.modelId)
        }
    }
    console.log('getPageModelIds', modelIds);
    return ctx.body = modelIds;
});

router.get('/getStateConfig', async (ctx) => {
    let state;
    let r = await nedb.findOneDB({
        name: 'stateConfig',
        data: {
            state: state
        }
    })
    console.log('getStateConfig', r);
    return ctx.body = r;
});

router.get('/getPageModel', async (ctx) => {
    let filter = ctx.request.query.filter;
    filter = JSON.parse(filter)
    console.log("filter", filter);
    console.log("getPageModel", ctx.request.query);

    let r = await nedb.findOneDB({
        name: 'modelsConfig',
        filter: filter
    })
    let page = r.model;
    console.log('modelsConfig', r);
    return ctx.body = {
        page: page
    };
});



router.post('/saveStateConfig', async (ctx) => {
    let state = ctx.request.body
    let r = await nedb.insertDB({
        name: 'stateConfig',
        data: {
            state: state
        }
    })
    let res;
    if (r) {
        res = 'success'
    } else {
        res = 'fail'
    }
    return ctx.body = res;
});

router.post('/savePageModel', async (ctx) => {
    let model = ctx.request.body
    console.log('savePageModel', model);

    let r = await nedb.insertDB({
        name: 'modelsConfig',
        data: model
    })
    let res;
    if (r) {
        res = 'success'
    } else {
        res = 'fail'
    }
    return ctx.body = res;
});



router.post('/updatePageModel', async (ctx) => {
    let filter = ctx.request.body.filter
    let model = ctx.request.body.model
    console.log('updatePageModel', ctx.request.body);
    console.log('filter', filter);
    console.log('model', model);

    let r = await nedb.updateOneDB({
        name: 'modelsConfig',
        filter: filter,
        data: {
            model: model
        }
    })
    let res;
    if (r) {
        res = 'success'
    } else {
        res = 'fail'
    }
    return ctx.body = res;
});


router.post('/deletePageModel', async (ctx) => {
    let filter = ctx.request.body.filter

    console.log('filter', filter);

    let r = await nedb.deleteDB({
        name: 'modelsConfig',
        filter: filter,
    })
    let res;
    if (r) {
        res = 'success'
    } else {
        res = 'fail'
    }
    return ctx.body = res;
});


module.exports = router