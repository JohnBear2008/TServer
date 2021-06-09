/*
 * @Author: your name
 * @Date: 2021-06-09 15:52:54
 * @LastEditTime: 2021-06-09 15:56:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \TServer\router\api\index.js
 */
const Router = require('koa-router');
//定义api前缀
var router = new Router()
router.use('/t9', require('./t9'))


module.exports = router.routes()