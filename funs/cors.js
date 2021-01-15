//用于处理跨域问题

const cors = require('koa2-cors')

const divCors = cors({
    origin: function (ctx) { //设置允许来自指定域名请求
        // const whiteList = ['http://localhost:3000', 'http://localhost:8080', 'http://192.168.253.2:8080']; //可跨域白名单
        // let url = ctx.header.referer.substr(0, ctx.header.referer.length - 1);
        // if (whiteList.includes(url)) {
        //     return url //注意，这里域名末尾不能带/，否则不成功，所以在之前我把/通过substr干掉了
        // }
        // if (ctx.url === '/test') {
        //     return "*"; // 允许来自所有域名请求
        // }
        return '*' //允许所有
        // return 'http://localhost:3000'//允许本地请求3000,
    },
    maxAge: 5, //指定本次预检请求的有效期，单位为秒。
    credentials: true, //是否允许发送Cookie
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
})

module.exports = divCors