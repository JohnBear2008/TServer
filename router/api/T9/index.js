// 注意require('koa-router')返回的是函数:
const Router = require('koa-router');

//引入mysql数据库模块
const sqlserver = require('../../../database/sqlserver')

const sql = require('./sql')


//定义api前缀
var router = new Router({
    prefix: '/api/T9'
})

//接口测试
router.get('/', async (ctx, next) => {
    next()
    ctx.response.body = '<h1>T9接口测试</h1>';
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



    let sqlSelect = "select * from comMaterialGroup where MaterialId='" + MaterialId + "'";

    let rs1 = await sqlserver.execute({
        sql: sqlSelect,
        params: []
    })

    console.log('select rs', rs1);

    if (rs1.recordset.length > 0) {
        ctx.body = {
            code: 400,
            msg: '已存在此物料,请检查',
        }
        return
    }


    let values = "'" + MaterialTypeId + "'," + "'" + MaterialId + "'," + "'" + MaterialName + "'," + "'" + MaterialCategoryId + "'," + "'" + HasComboProd + "'," + "'" + UnitId + "'," + "'" + X_Supplier + "'," + "'" + X_MatVersion + "'," + "'" + MaterialSpec + "'";
    let sqlInsert = "insert into comMaterialGroup (MaterialTypeId,MaterialId,MaterialName,MaterialCategoryId,HasComboProd,UnitId,X_Supplier,X_MatVersion,MaterialSpec) values  (" + values + ")"

    let rs = await sqlserver.execute({
        sql: sqlInsert,
        params: []
    })
    console.log('insert rs', rs);
    next()
    if (rs.rowsAffected > 0) {
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