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

//接口测试
router.get('/get', async (ctx, next) => {
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


module.exports = router.routes()