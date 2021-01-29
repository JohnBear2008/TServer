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
    let MaterialId = "BB-AAA001-B001";
    let MaterialName = "测试物料";
    let MaterialCategoryId = "A1";
    let HasComboProd = "0";
    let UnitId = "TAI";
    let X_Supplier = "003";
    let X_MatVersion = "B";
    let MaterialSpec = "这是一个测试物料规格";

    let rs = await sqlserver.execute({
        sql: sql.addMaterial,
        params: [MaterialId, MaterialName, MaterialCategoryId, HasComboProd, UnitId, X_Supplier, X_MatVersion, MaterialSpec]
    })
    console.log('modify rs', rs.changedRows);
    next()
    if (rs.changedRows > 0) {
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