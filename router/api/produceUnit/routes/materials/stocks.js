const Router = require('koa-router');
const router = new Router()
const nedb = require('../../../../../database/nedb')

const addMaterial = async ({
    materialId,
    materialName,
    num,
    orderId,
    from,
    dateTime
}) => {

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

    return stockRs && historyRs ? true : false

}

const reduceMaterial = async ({
    materialId,
    materialName,
    num,
    orderId,
    from,
    dateTime
}) => {

    let filter = {
        materialId: materialId
    }
    let geExistRS = await nedb.getExist({
        name: 'produceUnit_materials_stocks',
        filter: filter
    })

    console.log('geExistRS', geExistRS);

    let stockRs;
    if (!geExistRS) {
        console.log('无库存');
        return false
    }

    if (parseInt(geExistRS.num) < parseInt(num)) {
        console.log(geExistRS.materialId + ',库存不足');
        return
    }

    let updateRs = await nedb.updateOneDB({
        name: 'produceUnit_materials_stocks',
        filter: filter,
        data: {
            materialId: materialId,
            materialName: materialName,
            num: parseInt(geExistRS.num) - parseInt(num),
        }
    })
    stockRs = updateRs ? true : false;
    let nowNum = geExistRS.num ? parseInt(geExistRS.num) - parseInt(num) : parseInt(num)
    let historyRs = await nedb.insertDB({
        name: 'produceUnit_materials_historys',
        data: {
            materialId: materialId,
            materialName: materialName,
            historyNum: geExistRS.num,
            changeNum: num,
            nowNum: nowNum,
            orderId: orderId,
            from: from,
            dateTime: dateTime,
            type: '减少'
        }
    })
    return stockRs && historyRs ? true : false

}


//接口测试
router.post('/get', async (ctx, next) => {
    console.log('get', ctx.request.body);

    let filter = ctx.request.body.filter
    let materilIdArr = ctx.request.body.materilIdArr
    if (materilIdArr) {
        filter = {
            materialId: {
                $in: materilIdArr
            }
        }
    }

    let findRS = await nedb.findDB({
        name: 'produceUnit_materials_stocks',
        filter: filter
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

    let addRs = await addMaterial({
        materialId,
        materialName,
        num,
        orderId,
        from,
        dateTime
    })

    let result = addRs ? {
        result: 'success'
    } : {
        result: 'fail'
    }
    ctx.response.body = result
});

//减少接口
router.post('/reduce', async (ctx, next) => {
    console.log('stocks reduce', ctx.request.body);
    let {
        materialId,
        materialName,
        num,
        orderId,
        from,
        dateTime
    } = ctx.request.body

    let reduceRs = await reduceMaterial({
        materialId,
        materialName,
        num,
        orderId,
        from,
        dateTime
    })

    let result = reduceRs ? {
        result: 'success'
    } : {
        result: 'fail'
    }
    ctx.response.body = result
});

//批量增加接口
router.post('/adds', async (ctx, next) => {
    console.log('stocks adds', ctx.request.body);
    let materialArr = ctx.request.body
    let addRs = true
    for (const n of materialArr) {
        let rsN = await addMaterial(n)
        addRs = addRs && rsN
    }

    let result = addRs ? {
        result: 'success'
    } : {
        result: 'fail'
    }
    ctx.response.body = result
});


//批量减少接口
router.post('/reduces', async (ctx, next) => {
    console.log('stocks reduces', ctx.request.body);
    let materialArr = ctx.request.body
    let reduceRs = true
    for (const n of materialArr) {
        let rsN = await reduceMaterial(n)
        reduceRs = reduceRs && rsN
    }

    let result = reduceRs ? {
        result: 'success'
    } : {
        result: 'fail'
    }
    ctx.response.body = result
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