const Router = require('koa-router');
const {
    resolveContent
} = require('nodemailer/lib/shared');
const router = new Router()
const request = require('request');
const nedb = require('../../../../../database/nedb')

//接口测试
router.post('/get', async (ctx, next) => {
    console.log('get', ctx.request.body);
    let findRS = await nedb.findDB({
        name: 'produceTools_units',
        filter: ctx.request.body.filter
    })

    console.log('findRS', findRS);
    next()
    ctx.response.body = findRS

});

router.post('/link', async (ctx, next) => {
    let server = ctx.request.body.server
    let url = "https://" + server + "/api/produceUnit/settings/config/get"
    console.log('link ', server);

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    let rs = await new Promise((resolve, reject) => {
        request({
            url: url, //请求路径
            method: "POST", //请求方式，默认为get
            headers: { //设置请求头
                "content-type": "application/json",
            },
            body: "" //post参数字符串
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(body)
            }
            if (error) {
                reject(error)
            }
        });
    })
    console.log('get 111', rs);
    ctx.response.body = rs
});

//接口测试
router.post('/add', async (ctx, next) => {
    console.log('insert', ctx.request.body);

    nedb.insertDB({
        name: 'produceTools_units',
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
        name: 'produceTools_units',
        filter: filter
    })

    console.log('isExistRS', isExistRS);
    let rs = {};
    if (isExistRS) {
        let updateRs = await nedb.updateOneDB({
            name: 'produceTools_units',
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
            name: 'produceTools_units',
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
        name: 'produceTools_units',
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