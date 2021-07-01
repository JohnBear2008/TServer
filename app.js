const Koa = require('koa');
const app = new Koa();

const http = require('http');
const https = require('https');
const fs = require('fs');

// //ip组件测试
// const ip=require('./funs/ip')
// console.log('内网ip：'+ip.getLocalIP());
// console.log('外网ip：'+ip.getPublicIP());

//引入自定义跨域组件,一定要用在最前面
const divCors = require('./funs/cors')
app.use(divCors);


//文件上传组件
const koaBody = require('koa-body'); //此组件同koa-bodyparser 冲突 不能同时启用,启用此组件,可替换koa-bodyparser
app.use(koaBody({
    multipart: true
}));

const Router = require('koa-router');
const router = new Router();

// 意思是：如果你访问的是根(localhost:3000/test/t1)，要怎么处理，你去找 './router/test/t1'
router.use('/test/t1', require('./router/test/t1'));
router.use('/api', require('./router/api'));
router.use('/tweb', require('./router/tweb'));


app.use(router.routes())

// const bodyParser = require('koa-bodyparser'); //用来解析request中的body，针对post请求
// app.use(bodyParser())


// //jwt 组件
// const koajwt = require('koa-jwt');

// // 中间件对token进行验证
// app.use(async (ctx, next) => {
//     return next().catch((err) => {
//         if (err.status === 401) {
//             ctx.status = 401;
//             ctx.body = {
//                 code: 401,
//                 msg: err.message
//             }
//         } else {
//             throw err;
//         }
//     })
// });

// //排除不验证的请求
// const SECRET = 'foil'; // demo，可更换
// app.use(koajwt({
//     secret: SECRET,
//     passthrough: true
// }).unless({
//     // 登录，注册接口不需要验证
//     path: [/^\/api\/login/]
// }));

// const cors = require('koa2-cors')
// app.use(cors())

// 注意require('koa-router')返回的是函数:
const routerDiv = require('./router')
const userRouter = require('./router/user')
const apiFileRouter = require('./router/api/file')
const apiConfigRouter = require('./router/api/configs')
const apiFoilRouter = require('./router/api/foil')


// add router middleware:
app.use(routerDiv.routes());
app.use(userRouter.routes());
app.use(apiFileRouter.routes());
app.use(apiConfigRouter.routes());
app.use(apiFoilRouter.routes());




const apiMysql = require('./router/api/mysql')
app.use(apiMysql.routes());

const apiSqlserver = require('./router/api/sqlserver')
app.use(apiSqlserver.routes());

const apiExcel = require('./router/api/excel')
app.use(apiExcel.routes());

const apiDingTalk = require('./router/api/dingTalk')
app.use(apiDingTalk.routes());

const apiSMS = require('./router/api/sms')
app.use(apiSMS.routes());

const apiMail = require('./router/api/mail')
app.use(apiMail.routes());



const apiHoliday = require('./router/api/holiday')
app.use(apiHoliday.routes());

const apiUpdate = require('./router/api/update')
app.use(apiUpdate.routes());




// app.listen(3000);

//start the server
http.createServer(app.callback()).listen(3000);
console.log('http server is running at 3000');


// SSL options

//Force HTTPS on all page  启用https 前端blob报405错误
const enforceHttps = require('koa-sslify').default; //必须添加default参数,避免非函数报错
app.use(enforceHttps());
const options = {
    key: fs.readFileSync('./cert/server_no_passwd.key'), //ssl文件路径
    cert: fs.readFileSync('./cert/server.crt') //ssl文件路径
};
// https.createServer(options, app.callback()).listen(443);
https.createServer(options, app.callback()).listen(8000);
console.log('https server is running at 8000');