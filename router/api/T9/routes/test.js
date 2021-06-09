/*
 * @Author: your name
 * @Date: 2021-06-09 14:59:17
 * @LastEditTime: 2021-06-09 15:58:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \TServer\router\api\T9\routes\test.js
 */
// 注意require('koa-router')返回的是函数:
const Router = require('koa-router');
//定义api前缀
var router = new Router()
//接口测试
router.get('/', async (ctx, next) => {
    next()
    ctx.response.body = '<h1>T9接口测试111111</h1>';
});

module.exports = router.routes()