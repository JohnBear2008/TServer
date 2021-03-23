// 注意require('koa-router')返回的是函数:
const Router = require('koa-router');

//引入mysql数据库模块
const sqlserver = require('../../../database/sqlserver')

const sqlDict = require('./sqlDict')

//引入字典
const dict = require('./dict')
//引入自定义函数库
const util = require('../../../funs/util')


//定义api前缀
var router = new Router({
    prefix: '/api/T9'
})

//接口测试
router.get('/', async (ctx, next) => {
    next()
    ctx.response.body = '<h1>T9接口测试</h1>';
});

//get 通用接口
router.get('/ajaxGet', async (ctx, next) => {

    let {
        to,
        sql,
        params
    } = ctx.request.query;

    console.log('getBySql22222', to, sql, params);
    //c
    if (!to) {
        ctx.response.body = {
            error: 'to 参数未设定!'
        };
    }

    let sqlParams = params ? params.split(',') : [];

    let rs = await sqlserver.execute({
        sql: sqlDict[sql],
        params: sqlParams
    })

    console.log('getBySql rs', rs.recordset);
    let data = rs.recordset;
    data = dict.translater({
        data,
        to
    })

    console.log('data', data);

    next()
    ctx.response.body = data;
});

//getData 接口
router.get('/getData', async (ctx, next) => {

    let {
        to,
        type,
        UID
    } = ctx.request.query;

    console.log('getData', to, type);
    //c
    if (!to && type) {
        ctx.response.body = {
            error: 'to 参数未设定!'
        };
    }
    let executeSql = ""
    switch (type) {
        case "material":
            executeSql = "select ta.MaterialId,ta.MaterialName,ta.MaterialSpec,ta.CU_OldMaterialId,tb.MaterialCategoryName from comMaterialGroup ta ,comMaterialCategory tb where ta.MaterialCategoryId=tb.MaterialCategoryId"
            break;

        default:
            break;
    }

    console.log('executeSql:', executeSql);

    let rs = await sqlserver.execute({
        sql: executeSql
    })

    console.log('getData rs', rs.recordset);
    let data = rs.recordset;

    if (to && to !== 'T9') {
        data = dict.translater({
            data,
            to
        })
    }


    console.log('data', data);

    next()
    ctx.response.body = data;
});

//getMaterial 接口
router.get('/getMaterial', async (ctx, next) => {

    let {
        to,
        UID
    } = ctx.request.query;

    console.log('getMaterial', to, UID);
    //c
    if (!to) {
        ctx.response.body = {
            error: 'to 参数未设定!'
        };
    }

    let mainSql = sqlDict['getMaterial'];
    let executeSql = mainSql
    if (UID) {
        let UIDType = util.typeObj(UID)
        let filterArr = []
        switch (UIDType) {
            case 'String':
                filterArr = UID.split(',');
                break;

            case 'Array':
                filterArr = UID
                break;
            default:
                console.log('无法识别UIDType');
                break;
        }
        let sqlRange = util.getRangeString(filterArr)
        executeSql = mainSql + " where UID in " + sqlRange;

    }




    console.log('executeSql:', executeSql);

    let rs = await sqlserver.execute({
        sql: executeSql
    })

    // console.log('getMaterial rs', rs.recordset);
    let data = rs.recordset;
    let type = 'material';

    if (to && to !== 'T9') {
        data = dict.translater({
            data,
            to,
            type
        })
    }


    // console.log('data', data);

    next()
    ctx.response.body = data;
});


//getCustomer 接口
router.get('/getCustomer', async (ctx, next) => {

    let {
        to,
        UID
    } = ctx.request.query;

    console.log('getCustomer', to, UID);
    //c
    if (!to) {
        ctx.response.body = {
            error: 'to 参数未设定!'
        };
    }

    let mainSql = sqlDict['getCustomer'];
    let executeSql = mainSql
    if (UID) {
        let UIDType = util.typeObj(UID)
        let filterArr = []
        switch (UIDType) {
            case 'String':
                filterArr = UID.split(',');
                break;

            case 'Array':
                filterArr = UID
                break;
            default:
                console.log('无法识别UIDType');
                break;
        }
        let sqlRange = util.getRangeString(filterArr)
        executeSql = mainSql + " where UID in " + sqlRange;

    }




    console.log('executeSql:', executeSql);

    let rs = await sqlserver.execute({
        sql: executeSql
    })

    // console.log('getCustomer rs', rs.recordset);
    let data = rs.recordset;
    let type = 'customer';

    if (to && to !== 'T9') {
        data = dict.translater({
            data,
            to,
            type
        })
    }


    // console.log('data', data);

    next()
    ctx.response.body = data;
});


//getPerson 接口
router.get('/getPerson', async (ctx, next) => {

    let {
        to,
        UID
    } = ctx.request.query;

    console.log('getPerson', to, UID);
    //c
    if (!to) {
        ctx.response.body = {
            error: 'to 参数未设定!'
        };
    }

    let mainSql = sqlDict['getPerson'];
    let executeSql = mainSql
    if (UID) {
        let UIDType = util.typeObj(UID)
        let filterArr = []
        switch (UIDType) {
            case 'String':
                filterArr = UID.split(',');
                break;

            case 'Array':
                filterArr = UID
                break;
            default:
                console.log('无法识别UIDType');
                break;
        }
        let sqlRange = util.getRangeString(filterArr)
        executeSql = mainSql + " where UID in " + sqlRange;

    }




    console.log('executeSql:', executeSql);

    let rs = await sqlserver.execute({
        sql: executeSql
    })

    // console.log('getPerson rs', rs.recordset);
    let data = rs.recordset;
    let type = 'person';

    if (to && to !== 'T9') {
        data = dict.translater({
            data,
            to,
            type
        })
    }


    // console.log('data', data);

    next()
    ctx.response.body = data;
});


//修改密码
router.post('/addMaterial', async (ctx, next) => {
    console.log('addMaterial', ctx.request.body);
    // let MaterialTypeId = 'T0001';
    // let MaterialId = "BB-AAA001-B001";
    // let MaterialName = "测试物料";
    // let MaterialCategoryId = "A1";
    // let HasComboProd = "0";
    // let UnitId = "TAI";
    // let X_Supplier = "003";
    // let X_MatVersion = "B";
    // let MaterialSpec = "这是一个测试物料规格";

    let MaterialTypeId = ctx.request.body.MaterialTypeId
    let MaterialId = ctx.request.body.MaterialId
    let MaterialName = ctx.request.body.MaterialName
    let MaterialCategoryId = ctx.request.body.MaterialCategoryId
    let HasComboProd = ctx.request.body.HasComboProd
    let UnitId = ctx.request.body.UnitId
    let X_Supplier = ctx.request.body.X_Supplier
    let X_MatVersion = ctx.request.body.X_MatVersion
    let MaterialSpec = ctx.request.body.MaterialSpec



    let sqlSelect =
        "select count(1) as num from comMaterialGroup where MaterialId='" + MaterialId + "' union " +
        "select count(1) as num from comMaterial where MaterialId='" + MaterialId + "' union " +
        "select count(1) as num from comMaterialSales where MaterialId='" + MaterialId + "' union " +
        "select count(1) as num from comMaterialInventory where MaterialId='" + MaterialId + "' union " +
        "select count(1) as num from plsMaterialPlanData where MaterialId='" + MaterialId + "' union " +
        "select count(1) as num from comMaterialManufacture where MaterialId='" + MaterialId + "' union " +
        "select count(1) as num from coMaterialCost where MaterialId='" + MaterialId + "' union " +
        "select count(1) as num from comMaterialQuality where MaterialId='" + MaterialId + "'";

    let rs1 = await sqlserver.execute({
        sql: sqlSelect,
        params: []
    })

    console.log('select rs', rs1);

    let num = 0;
    let recordset = rs1.recordset;
    console.log('recordset', recordset);
    for (const n of recordset) {
        num = num + n.num;
    }
    console.log('num', num);

    if (num > 0) {
        ctx.body = {
            code: 400,
            msg: '已存在此物料,请检查',
        }
        return
    }



    let values = "'" + MaterialTypeId + "'," + "'" + MaterialId + "'," + "'" + MaterialName + "'," + "'" + MaterialCategoryId + "'," + "'" + HasComboProd + "'," + "'" + UnitId + "'," + "'" + X_Supplier + "'," + "'" + X_MatVersion + "'," + "'" + MaterialSpec + "','ACTIVE'";
    let sqlInsert = "";
    //物料基础数据
    let comMaterialGroup = "insert into comMaterialGroup (MaterialTypeId,MaterialId,MaterialName,MaterialCategoryId,HasComboProd,UnitId,X_Supplier,X_MatVersion,MaterialSpec,MaterialUsedStateId) values  (" + values + ");"
    //物料公司数据
    let comMaterial = "insert into comMaterial (FOrgId,MaterialTypeId,MaterialId,MaterialCategoryId) values  ('TM01','" + MaterialTypeId + "'," + "'" + MaterialId + "'," + "'" + MaterialCategoryId + "');"
    //物料生产数据
    let comMaterialManufacture = "insert into comMaterialManufacture (FactoryId,FOrgId,MaterialTypeId,MaterialId) values  ('TM01', 'TM01','" + MaterialTypeId + "'," + "'" + MaterialId + "');"
    //物料销售数据
    let comMaterialSales = "insert into comMaterialSales (OrgId,MaterialTypeId,MaterialId,CurrId,TaxId) values  ( 'TM01','" + MaterialTypeId + "'," + "'" + MaterialId + "','CNY','VT013');"
    //物料采购数据
    let comMaterialPurchases = "insert into comMaterialPurchases (OrgId,MaterialTypeId,MaterialId,CurrId,TaxId) values  ( 'TM01','" + MaterialTypeId + "'," + "'" + MaterialId + "','CNY','VT013');"
    //物料库存数据
    let comMaterialInventory = "insert into comMaterialInventory (FOrgId,MaterialTypeId,MaterialId) values  ('TM01','" + MaterialTypeId + "'," + "'" + MaterialId + "');"
    //物料质量数据
    let comMaterialQuality = "insert into comMaterialQuality (OrgId,MaterialTypeId,MaterialId,ValueSourceType,checkType,CheckProjectId) values  ('TM01','" + MaterialTypeId + "'," + "'" + MaterialId + "',1,1,'FA01');"
    //物料计划数据
    let plsMaterialPlanData = "insert into plsMaterialPlanData (PlanRangeId,FOrgId,MaterialTypeId,MaterialId) values  ('1000','TM01','" + MaterialTypeId + "'," + "'" + MaterialId + "');"
    //物料成本数据
    let coMaterialCost = "insert into coMaterialCost (FOrgId,MaterialTypeId,MaterialId) values  ('TM01','" + MaterialTypeId + "'," + "'" + MaterialId + "');"

    sqlInsert = comMaterialGroup + comMaterial + comMaterialManufacture + comMaterialSales + comMaterialPurchases + comMaterialInventory + comMaterialQuality + plsMaterialPlanData + coMaterialCost;


    let rs = await sqlserver.execute({
        sql: sqlInsert,
        params: []
    })
    console.log('insert rs', rs);
    next()
    if (rs.rowsAffected[0] > 0) {
        ctx.body = {
            code: 200,
            msg: 'success',
        }
    } else {
        ctx.body = {
            code: 400,
            msg: 'fail',
        }

    }


});

module.exports = router