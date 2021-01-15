const Koa = require('koa');
const app = new Koa();

//文件上传组件
const koaBody = require('koa-body'); //此组件同koa-bodyparser 冲突 不能同时启用,启用此组件,可替换koa-bodyparser
app.use(koaBody({
    multipart: true
}));

// const bodyParser = require('koa-bodyparser'); //用来解析request中的body，针对post请求
// app.use(bodyParser())

//引入自定义跨域组件
const divCors = require('./funs/cors')
app.use(divCors);

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



app.listen(3000);
console.log('app started at port 3000...');