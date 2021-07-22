
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

    console.log('getCustomer', to, UID);
    //c
    if (!to) {
        to = 'T9'
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


module.exports = router.routes()