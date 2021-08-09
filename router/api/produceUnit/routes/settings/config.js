const Router = require('koa-router');
const router = new Router()
const nedb = require('../../../../../database/nedb')
const ping = require('ping');

//接口测试
router.post('/get', async (ctx, next) => {
    console.log('get', ctx.request.body);
    let findRS = await nedb.findDB({
        name: 'produceUnit_settings',
        filter: ctx.request.body.filter
    })

    console.log('findRS', findRS);
    next()
    ctx.response.body = findRS

});

router.post('/ping', async (ctx, next) => {
    let hosts = ctx.request.body.hosts
    let pingRs = []

    for (let host of hosts) {
        // WARNING: -i 2 argument may not work in other platform like windows
        let res = await ping.promise.probe(host, {
            timeout: 10,
            extra: ['-i', '2'],
        });
        console.log(res);
        
        pingRs.push({
            host: res.host,
            alive: res.alive
        })
    }
    next()
    ctx.response.body = pingRs;
});

//接口测试
router.post('/add', async (ctx, next) => {
    console.log('insert', ctx.request.body);

    nedb.insertDB({
        name: 'produceUnit_settings',
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
        name: 'produceUnit_settings',
        filter: filter
    })

    console.log('isExistRS', isExistRS);
    let rs = {};
    if (isExistRS) {
        let updateRs = await nedb.updateOneDB({
            name: 'produceUnit_settings',
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
            name: 'produceUnit_settings',
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
        name: 'produceUnit_settings',
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