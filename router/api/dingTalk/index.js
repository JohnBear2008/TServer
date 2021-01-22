// 注意require('koa-router')返回的是函数:
const Router = require('koa-router');
const https = require('https')



//定义api前缀
var router = new Router({
    prefix: '/api/dingTalk'
})


const token = "854558d6b78ffb409b8fa639b5b62949608847051fe302d51dfe5dc465093a5d" //测试群


router.get('/get', async (ctx, next) => {
    next()
    ctx.response.body = '<h1>dingTalk</h1>';
});

//修改密码
router.post('/post', async (ctx, next) => {
    console.log('post', ctx.request.body);
    let msg = ctx.request.body.msg;
    let mobiles = ctx.request.body.mobiles;

    var textMsg = {
        "msgtype": "text",
        "text": {
            "content": "[PPM流程提醒]" + msg + "\n\n",
        },
        "at": {
            "atMobiles": mobiles,
            "isAtAll": false
        }
    }

    const requestData = JSON.stringify(textMsg);


    const url = 'oapi.dingtalk.com';
    const req = https.request({
        hostname: url,
        port: 443,
        path: '/robot/send?access_token=' + token,
        method: "POST",
        json: true,
        headers: {
            'Content-Type': "application/json; charset=utf-8"
        }
    });
    req.write(requestData);

    req.on('error', function (err) {

        ctx.body = {
            code: 400,
            msg: '发送失败',
        }
        console.error(err);
    });
    req.end();

    next()
    ctx.body = {
        code: 200,
        msg: '发送成功',
    }



});

module.exports = router