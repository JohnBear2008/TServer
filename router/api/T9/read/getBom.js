/*
 * @Author: your name
 * @Date: 2021-06-09 16:18:11
 * @LastEditTime: 2021-06-09 16:28:40
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
const sqlDict = require('../sqlDict')
const dict = require('../dict')
const util = require('../../../../funs/util')

//接口测试
router.get('/', async (ctx, next) => {
    let {
        to,
        UID
    } = ctx.request.query;

    console.log('getBom', to, UID);
    //c
    if (!to) {
        ctx.response.body = {
            error: 'to 参数未设定!'
        };
    }

    let mainSql = sqlDict['getBom'];
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
    let type = 'bom';

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


module.exports = router.routes()