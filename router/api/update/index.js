// 注意require('koa-router')返回的是函数:
const Router = require('koa-router');
const path = require('path');
const fs = require('fs');
const mime = require('mime-types'); //需npm安装

//定义api前缀
const router = new Router({
    prefix: '/api/update'
})



router.get('/', async (ctx, next) => {
    next()
    ctx.response.body = '<h1>update</h1>';
});


router.post('/', async (ctx, next) => {
    console.log(ctx);


    let file = null;
    try {
        file = fs.readFileSync(filePath); //读取文件
    } catch (error) {
        //如果服务器不存在请求的图片，返回默认图片
        filePath = path.join(__dirname, '/test.vue'); //
        file = fs.readFileSync(filePath); //读取文件       
    }

    let mimeType = mime.lookup(filePath); //读取图片文件类型
    ctx.set('content-type', mimeType); //设置返回类型
    ctx.body = file; //返回图片
    next()

});

module.exports = router