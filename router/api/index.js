/*
 * @Author: your name
 * @Date: 2021-06-09 15:52:54
 * @LastEditTime: 2021-06-16 11:07:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \TServer\router\api\index.js
 */
const Router = require('koa-router');
//定义api前缀
var router = new Router()
router.use('/t9', require('./t9'))
router.use('/projectAdmin', require('./projectAdmin'))
router.use('/produceUnit', require('./produceUnit'))
router.use('/ppm', require('./ppm'))
router.use('/edgeserver', require('./edgeServer/server'))


//接口测试
router.get('/', async (ctx, next) => {
    console.log('api get', ctx.request.query);
    next()
    ctx.response.body = 'sucess';
});


module.exports = router.routes()