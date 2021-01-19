// 注意require('koa-router')返回的是函数:
const Router = require('koa-router');
const fs = require('fs');
const path = require('path');




var router = new Router({
    prefix: '/api'
})

router.post('/uploadfile', async (ctx, next) => {
    console.log('uploadfile',ctx);
    // 上传单个文件
    const file = ctx.request.files.file; // 获取上传文件
    // 创建可读流
    console.log('file', ctx.request.files);

    const reader = fs.createReadStream(file.path);
    // let filePath = path.join(__dirname, 'upload/') + `/${file.name}`;
    let filePath = 'upload/' + `/${file.name}`;
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    let res = {
        status: 'success',
        filePath: filePath
    }
    return ctx.body = res;
});


router.post('/uploadfiles', async (ctx, next) => {
    // 上传多个文件
    console.log(ctx.request);
    const files = ctx.request.files; // 获取上传文件
    console.log("files", files);

    for (let file of files) {
        // 创建可读流
        const reader = fs.createReadStream(file.path);
        // 获取上传文件扩展名
        let filePath = path.join(__dirname, 'upload/') + `/${file.name}`;
        // 创建可写流
        const upStream = fs.createWriteStream(filePath);
        // 可读流通过管道写入可写流
        reader.pipe(upStream);
    }
    return ctx.body = "上传成功！";
});


//post 发送文件 
router.post('/postData', async (ctx, next) => {

    console.log("postData ctx", ctx.request.body);
    next()

    ctx.response.body = {
        b: 2
    }


});

module.exports = router