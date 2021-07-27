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
        UID,
        filter
    } = ctx.request.query;


    let type = 'storeOut';

    console.log('getStoreOut', to, UID, filter);

    if (UID && filter) {
        ctx.response.body = 'UID,filter 不可共用'
        return
    }


    let mainSql = sqlDict['getStoreOut'];
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
        executeSql = mainSql + " where BillNo in " + sqlRange;

    }


    if (filter) {
        filter = dict.filterTranslater({
            filter,
            to,
            type
        })
        executeSql = mainSql + " where " + filter;
    }


    console.log('executeSql:', executeSql);

    let rs = await sqlserver.execute({
        sql: executeSql
    })

    let data = rs.recordset;


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