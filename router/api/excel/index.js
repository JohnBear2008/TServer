// 注意require('koa-router')返回的是函数:
const Router = require('koa-router');

//引入excel数据库模块
const excel = require('../../../database/excel')

//定义api前缀
var router = new Router({
    prefix: '/api/excel'
})

//获取表单
router.get('/ajaxGet', async (ctx, next) => {

    // console.log(ctx);

    let fileName = ctx.query.fileName;

    console.log(fileName);
    fileName = 'data/' + fileName

    let returnData = await excel.read(fileName)

    console.log('returnData', returnData);

    if (returnData) {
        ctx.body = {
            code: 200,
            msg: 'success',
            data: returnData
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