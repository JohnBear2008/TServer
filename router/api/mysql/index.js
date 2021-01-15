// 注意require('koa-router')返回的是函数:
const Router = require('koa-router');

//引入mysql数据库模块
const mysql = require('../../../database/mysql')

//定义api前缀
var router = new Router({
    prefix: '/api/mysql'
})

//获取表单
router.get('/ajaxGet', async (ctx, next) => {

    // console.log(ctx);

    let sql = ctx.query.sql;
    let params = ctx.query.params;
    console.log(sql, params);

    let billsData = await mysql.execute({
        sql: sql,
        params: params
    })

    console.log('getBills billsData', billsData.length);

    if (billsData.length > 0) {
        ctx.body = {
            code: 200,
            msg: 'success',
            data: billsData
        }
    } else {
        ctx.body = {
            code: 400,
            msg: 'fail',
            data: []
        }
    }
});


//修改密码
router.post('/ajaxPost', async (ctx, next) => {
    console.log('ajaxPost', ctx.request.body);
    let account = ctx.request.body.account;
    let password = ctx.request.body.password;

    let rs = await mysql.execute({
        sql: 'modifyPassword',
        params: [password, account]
    })
    console.log('modify rs', rs.changedRows);

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