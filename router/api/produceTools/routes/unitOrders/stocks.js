const Router = require('koa-router');
const router = new Router()
const request = require('request');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const nedb = require('../../../../../database/nedb')
const util = require('../../../../../funs/util')


//接口测试
router.post('/get', async (ctx, next) => {
    console.log('get', ctx.request.body);
    let findRS = await nedb.findDB({
        name: 'produceTools_unitOrders_stocks',
        filter: ctx.request.body.filter
    })

    console.log('findRS', findRS);
    next()
    ctx.response.body = findRS

});


//接口测试

const getBomArr = async (bomId) => {
    let bomArr = []

    let rs1 = await nedb.findDB({
        name: 'produceTools_boms',
        filter: {
            bomId: bomId
        }
    })
    console.log('rs1', rs1);

    let rs2 = await nedb.findDB({
        name: 'produceTools_procedures',
        filter: {
            bomId: bomId
        }
    })
    console.log('rs2', rs2);
    let materials = [];
    for (const n of rs1) {
        materials.push({
            materialId: n.subMaterialId,
            materialName: n.subMaterialName,
            unitNum: n.unitNum
        })
        if (n.hasChildren === 1) {
            let subBomArr = await getBomArr(n.subMaterialId)
            bomArr = bomArr.concat(subBomArr)
        }
    }
    let bom = {
        bomId: bomId,
        materialId: rs1[0].materialId,
        materialName: rs1[0].materialName,
        unitNum: rs1[0].unitNum,
        procedureId: rs2[0].procedureId,
        materials: materials
    }
    bomArr.push(bom)
    return bomArr
}


router.post('/getOrders', async (ctx, next) => {
    console.log('getOrders', ctx.request.body);
    let bomId = ctx.request.body.bomId
    let findRS = await getBomArr(bomId)
    console.log('findRS', findRS);
    next()
    ctx.response.body = findRS

});



router.post('/sendOrder', async (ctx, next) => {
    console.log('sendOrder', ctx.request.body);
    let order = ctx.request.body;
    let unit = order.unit
    let orderUrl = "https://" + unit + "/api/produceUnit/orders/stocks/insert"
    let materialUrl = "https://" + unit + "/api/produceUnit/materials/stocks/adds"
    console.log('link ', unit);

    let materialsArr = [];
    for (const n of order.materials) {
        materialsArr.push({
            materialId: n.materialId,
            materialName: n.materialName,
            num: n.num,
            orderId: order.orderId,
            from: "工单投放",
            dateTime: util.dateFormat(new Date(), "yyyy-MM-dd HH:mm:ss"),
        });
    }



    let materialsRs = await new Promise((resolve, reject) => {
        request({
            url: materialUrl, //请求路径
            method: "POST", //请求方式，默认为get
            headers: { //设置请求头
                "content-type": "application/json",
            },
            body: JSON.stringify(materialsArr) //post参数字符串
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(body)
            }
            if (error) {
                reject(error)
            }
        });
    })
    console.log('materialsRs', materialsRs);


    let orderRs = await new Promise((resolve, reject) => {
        request({
            url: orderUrl, //请求路径
            method: "POST", //请求方式，默认为get
            headers: { //设置请求头
                "content-type": "application/json",
            },
            body: JSON.stringify(order) //post参数字符串
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(body)
            }
            if (error) {
                reject(error)
            }
        });
    })

    console.log('orderRs', orderRs);

    let result = materialsRs && orderRs ? {
        result: 'success'
    } : {
        result: 'fail'
    }

    next()
    ctx.response.body = result

});

//接口测试
router.post('/insert', async (ctx, next) => {
    console.log('insert', ctx.request.body);

    nedb.insertDB({
        name: 'produceTools_unitOrders_stocks',
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
        name: 'produceTools_unitOrders_stocks',
        filter: filter
    })

    console.log('isExistRS', isExistRS);
    let rs = {};
    if (isExistRS) {
        let updateRs = await nedb.updateOneDB({
            name: 'produceTools_unitOrders_stocks',
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
            name: 'produceTools_unitOrders_stocks',
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
        name: 'produceTools_unitOrders_stocks',
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