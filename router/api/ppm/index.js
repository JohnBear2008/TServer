/*
 * @Author: your name
 * @Date: 2021-06-16 11:05:06
 * @LastEditTime: 2021-06-16 13:04:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \TServer\router\api\ppm\index.js
 */
/*
 * @Author: your name
 * @Date: 2021-01-29 10:07:12
 * @LastEditTime: 2021-06-09 16:54:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \TServer\router\api\T9\index.js
 */
// 注意require('koa-router')返回的是函数:
const Router = require('koa-router');
const router = new Router()
router.use('/win', require('./win'))
router.use('/lin', require('./lin'))

//接口测试
router.get('/', async (ctx, next) => {
    console.log('ppm get', ctx.request.query);
    next()
    ctx.response.body = '<h1>ppm接口测试</h1>';
});

module.exports = router.routes()