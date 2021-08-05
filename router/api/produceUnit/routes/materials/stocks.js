const Router = require('koa-router');
const router = new Router()
const nedb = require('../../../../../database/nedb')


//接口测试
router.get('/get', async (ctx, next) => {
    console.log('get', ctx.request.body);
    let findRS = await nedb.findDB({
        name: 'produceUnit_materials_stocks',
        filter: ctx.request.body.filter
    })

    console.log('findRS', findRS);
    next()
    ctx.response.body = findRS
});

//增加接口
router.post('/add', async (ctx, next) => {
    console.log('stocks add', ctx.request.body);
    let {
        materialId,
        materialName,
        num,
        orderId,
        from,
        dateTime
    } = ctx.request.body

    let filter = {
        materialId: materialId
    }
    let geExistRS = await nedb.getExist({
        name: 'produceUnit_materials_stocks',
        filter: filter
    })

    console.log('geExistRS', geExistRS);



    let stockRs;
    if (geExistRS) {
        let updateRs = await nedb.updateOneDB({
            name: 'produceUnit_materials_stocks',
            filter: filter,
            data: {
                materialId: materialId,
                materialName: materialName,
                num: parseInt(geExistRS.num) + parseInt(num),
            }
        })
        stockRs = updateRs ? true : false;
    } else {
        let insertRs = await nedb.insertDB({
            name: 'produceUnit_materials_stocks',
            data: {
                materialId: materialId,
                materialName: materialName,
                num: num,
            }
        })
        stockRs = insertRs ? true : false;
    }

    let historyNum = geExistRS.num ? geExistRS.num : 0
    let nowNum = geExistRS.num ? parseInt(geExistRS.num) + parseInt(num) : parseInt(num)

    let historyRs = await nedb.insertDB({
        name: 'produceUnit_materials_historys',
        data: {
            materialId: materialId,
            materialName: materialName,
            historyNum: historyNum,
            changeNum: num,
            nowNum: nowNum,
            orderId: orderId,
            from: from,
            dateTime: dateTime,
            type: '增加'
        }
    })

    let result

    if (stockRs && historyRs) {
        result = {
            result: 'success'
        };
    } else {
        result = {
            result: 'fail'
        };
    }

    ctx.response.body = result
});

//减少接口
router.post('/reduce', async (ctx, next) => {
    console.log('insert', ctx.request.body);

    nedb.insertDB({
        name: 'produceUnit_inputs_materials',
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
        name: 'produceUnit_inputs_materials',
        filter: filter
    })

    console.log('isExistRS', isExistRS);
    let rs = {};
    if (isExistRS) {
        let updateRs = await nedb.updateOneDB({
            name: 'produceUnit_inputs_materials',
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
            name: 'produceUnit_inputs_materials',
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
        name: 'produceUnit_inputs_materials',
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