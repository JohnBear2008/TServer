// 注意require('koa-router')返回的是函数:
const Router = require('koa-router');

//定义api前缀
const router = new Router({
    prefix: '/api/mail'
})

const mailer = require('./mailer')

router.get('/', async (ctx, next) => {
    next()
    ctx.response.body = '<h1>mail</h1>';
});

//修改密码
router.post('/', async (ctx, next) => {
    let to = ctx.request.body.to;
    let cc = ctx.request.body.cc;
    let subject = ctx.request.body.subject;
    let text = ctx.request.body.text;

    let mail = {
        to: to,
        cc: cc,
        subject: subject,
        text: text
    }
    console.log('mail', mail);

    mailer.send(mail);
    next()
    ctx.body = {
        code: 200,
        msg: 'success',
    }


});

module.exports = router