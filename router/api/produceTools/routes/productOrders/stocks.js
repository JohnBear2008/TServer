const Router = require('koa-router');
const router = new Router()
const nedb = require('../../../../../database/nedb')


//接口测试
router.post('/get', async (ctx, next) => {
    console.log('get', ctx.request.body);
    let findRS = await nedb.findDB({
        name: 'produceTools_productOrders_stocks',
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
            unitNum: n.unitNum,
            stepId: rs2[0].stepId,
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

//接口测试
router.post('/insert', async (ctx, next) => {
    console.log('insert', ctx.request.body);

    nedb.insertDB({
        name: 'produceTools_productOrders_stocks',
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
        name: 'produceTools_productOrders_stocks',
        filter: filter
    })

    console.log('isExistRS', isExistRS);
    let rs = {};
    if (isExistRS) {
        let updateRs = await nedb.updateOneDB({
            name: 'produceTools_productOrders_stocks',
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
            name: 'produceTools_productOrders_stocks',
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
        name: 'produceTools_productOrders_stocks',
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