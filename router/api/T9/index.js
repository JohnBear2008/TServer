// 注意require('koa-router')返回的是函数:
const Router = require('koa-router');
const router = new Router()

//读取接口
router.use('/test', require('./routes/test'))
router.use('/getMaterial', require('./read/getMaterial'))
router.use('/getCustomer', require('./read/getCustomer'))
router.use('/getPerson', require('./read/getPerson'))
router.use('/getBom', require('./read/getBom'))
router.use('/getInstallInfo', require('./read/getInstallInfo'))
router.use('/getStoreIn', require('./read/getStoreIn'))
router.use('/getStoreOut', require('./read/getStoreOut'))


//写入接口
router.use('/addMaterial', require('./write/addMaterial'))


//接口测试
router.get('/', async (ctx, next) => {
    console.log('t9 get', ctx.request.query);
    next()
    ctx.response.body = '<h1>T9接口测试</h1>';
});



// //getData 接口
// router.get('/getData', async (ctx, next) => {

//     let {
//         to,
//         type,
//         UID
//     } = ctx.request.query;

//     console.log('getData', to, type);
//     //c
//     if (!to && type) {
//         ctx.response.body = {
//             error: 'to 参数未设定!'
//         };
//     }
//     let executeSql = ""
//     switch (type) {
//         case "material":
//             executeSql = "select ta.MaterialId,ta.MaterialName,ta.MaterialSpec,ta.CU_OldMaterialId,tb.MaterialCategoryName from comMaterialGroup ta ,comMaterialCategory tb where ta.MaterialCategoryId=tb.MaterialCategoryId"
//             break;

//         default:
//             break;
//     }

//     console.log('executeSql:', executeSql);

//     let rs = await sqlserver.execute({
//         sql: executeSql
//     })

//     console.log('getData rs', rs.recordset);
//     let data = rs.recordset;

//     if (to && to !== 'T9') {
//         data = dict.translater({
//             data,
//             to
//         })
//     }


//     console.log('data', data);

//     next()
//     ctx.response.body = data;
// });


module.exports = router.routes()