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
const server_ip = require('./config').server_ip;

const nedb = require('nedb')

const initServer = async (server_ip) => {
    const db = new nedb({
        filename: 'data/edgeServer.db',
        autoload: true
    }, (err, ret) => {
        console.log('实例化连接对象', err, ret);
    });

    let regServerIp = await new Promise(function (resolve, reject) {
        db.findOne({
            server_ip: server_ip
        }, (err, ret) => {
            // console.log("查询单项 find", err, ret);
            if (err) {
                reject(err)
            }
            resolve(ret)
        })
    })

    console.log("regServerIp", regServerIp);

    if (regServerIp) {
        return
    }
    // 插入单项
    db.insert({
        server_ip: server_ip
    }, (err, ret) => {
        console.log("插入单项 insert", err, ret);
    });

}
initServer(server_ip)


//接口测试
router.get('/', async (ctx, next) => {
    next()
    ctx.response.body = '<h1>edgeServer连接测试,' + server_ip + '</h1>';
});

module.exports = router.routes()