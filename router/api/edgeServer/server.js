const Router = require('koa-router');
const router = new Router()
const server_ip = require('./config').server_ip;
const nedb = require('nedb')
const ping = require('ping');


const hosts = ['10.42.0.1'];

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


router.get('/ping', async (ctx, next) => {
    let pingRs = []

    for (let host of hosts) {
        // WARNING: -i 2 argument may not work in other platform like windows
        let res = await ping.promise.probe(host, {
            timeout: 10,
            extra: ['-i', '2'],
        });
        console.log(res);
        pingRs.push({
            host: res.host,
            alive: res.alive
        })
    }
    next()
    ctx.response.body = pingRs;
});






module.exports = router.routes()