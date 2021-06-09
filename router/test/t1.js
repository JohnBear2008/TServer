/*
 * @Author: your name
 * @Date: 2021-06-09 15:42:39
 * @LastEditTime: 2021-06-09 15:49:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \TServer\router\test\t1.js
 */
const Router = require('koa-router');
//定义api前缀
var router = new Router()

router.use('/11', require('./t1/t11'))
//接口测试
router.get('/', async (ctx, next) => {
    next()
    ctx.response.body = '<h1>test  t1</h1>';
});

module.exports = router.routes()