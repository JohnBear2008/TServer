/*
 * @Author: your name
 * @Date: 2021-06-09 16:18:11
 * @LastEditTime: 2021-06-09 16:52:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \TServer\router\api\T9\read\getMaterial.js
 */
/*
 * @Author: your name
 * @Date: 2021-06-09 14:59:17
 * @LastEditTime: 2021-06-09 16:09:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \TServer\router\api\T9\routes\test.js
 */
// 注意require('koa-router')返回的是函数:
const Router = require('koa-router');
const router = new Router()

//引入mysql数据库模块
const sqlserver = require('../../../../database/sqlserver')

router.post('/', async (ctx, next) => {
    console.log('addMaterial', ctx.request.body);


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

module.exports = router.routes()