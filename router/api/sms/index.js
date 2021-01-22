// 注意require('koa-router')返回的是函数:
const Router = require('koa-router');

//定义api前缀
const router = new Router({
    prefix: '/api/sms'
})

const yjSMS_baidu = require('./yjSMS.baidu')

router.get('/', async (ctx, next) => {
    next()
    ctx.response.body = '<h1>sms</h1>';
});

//修改密码
router.post('/', async (ctx, next) => {
    let phone = ctx.request.body.phone;
    let msg = ctx.request.body.msg;
    console.log('smsPost', phone, msg);
    var option = {
        phone: phone,
        templateCode: "sms-tmpl-Gxyyaf75958",
        contentVar: {
            "count": "3",
            "cost": "3000"
        },
        success: function (data) {
            console.log(data);

        },
        error: function (err) {
            console.log(err);
            ctx.body = {
                code: 400,
                msg: 'fail',
            }
        }
    }

    yjSMS_baidu.send(option);
    next()
    ctx.body = {
        code: 200,
        msg: 'success',
    }


});

module.exports = router