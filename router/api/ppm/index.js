/*
 * @Author: your name
 * @Date: 2021-05-11 15:14:07
 * @LastEditTime: 2021-05-12 10:32:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \TServer\router\api\ppm\autoFile.js
 */
// 注意require('koa-router')返回的是函数:
const Router = require('koa-router');

//引入mysql数据库模块
const mysql = require('../../../database/mysql')

//引入文件模块
const fs = require('fs');


const checkFolder = async ({
    folderPath
}) => {
    //c
    if (!folderPath) {
        console.log('path 参数不足!');
        return
    }
    //c
    let rs = await new Promise((resolve, reject) => {
        fs.stat(folderPath, function (err, stats) {
            console.log(err);
            console.log(stats);
            if (err) {
                // reject(false)
                resolve(false)
            } else {
                resolve(true)
            }
        })
    })
    //r
    return rs

}


const createFolder = async ({
    folderPath
}) => {
    //c
    if (!folderPath) {
        console.log('path 参数不足!');
        return
    }
    //c-检查是否已存在
    let r1 = await checkFolder({
        folderPath
    })
    if (r1) {
        console.log('createFolder ' + folderPath + '已存在');
        return true
    }
    //d
    let createResult = await new Promise((resolve, reject) => {
        fs.mkdir(folderPath, 0777, function (err) {
            if (err) {
                console.log('mkdir err', err);
                reject(false)
            } else {
                resolve(true)
            }
        })
    })

    //r
    return createResult
}

// createFolder({
//     folderPath: 'E:/test/2/2/3/4'
// })


const placeOnFile = async ({
    pathArr, //路径数组
    fileName, //文件名
    fileData //文件数据
}) => {
    //v
    let pathPre = 'E:/test'
    //c
    if (!pathArr || !fileName || !fileData) {
        console.log('placeOnFile 参数不足!');
        return
    }
    //d-建立文件夹

    let folderPath = pathPre
    let preFolderReady = true
    for (const path of pathArr) {
        folderPath = folderPath + '/' + path;
        let createFolderResult = await createFolder({
            folderPath: folderPath
        })
        preFolderReady = preFolderReady && createFolderResult
    }

    if (!preFolderReady) {
        console.log('前置文件夹出错');
        return
    }
    //d-写入文件
    let dr = await new Promise((resolve, reject) => {
        fs.writeFile(folderPath + '/' + fileName, fileData, function (err) {
            if (err) {
                console.log(err);
                reject(err);
            }
            resolve(true)
            console.log('write成功');
        });
    })
    //r
    return dr
}

placeOnFile({
    pathArr: ["1", "2", "3"], //路径数组
    fileName: '1.txt', //文件名
    fileData: '1111' //文件数据
})

//定义api前缀
var router = new Router({
    prefix: '/api/ppm'

})


//接口测试
router.get('/', async (ctx, next) => {
    let dr = await new Promise((resolve, reject) => {
        // fs.mkdir(i.dirPath + i.dirName, function (error) {
        fs.mkdir('E:/ppmtest', function (error) {
            if (error) {
                console.log(error);
                reject(false);
            }
            resolve(true)
            console.log('创建目录成功');
        })
    })
    next()
    ctx.response.body = '<h1>ppm接口测试' + dr + '</h1>';
});

//接口测试
router.get('/read', async (ctx, next) => {
    let dr = await new Promise((resolve, reject) => {
        // fs.mkdir(i.dirPath + i.dirName, function (error) {
        fs.readFile('E:/ppmtest/test.txt', function (err, data) {
            if (err) {
                console.log(err);
                reject(err);
            }
            resolve(data)
            console.log('read成功');
        })
    })
    next()
    ctx.response.body = '<h1>ppm读取' + dr + '</h1>';
});

//接口测试
router.get('/write', async (ctx, next) => {
    let dr = await new Promise((resolve, reject) => {
        // fs.mkdir(i.dirPath + i.dirName, function (error) {

        fs.writeFile("E:/ppmtest/output.txt", "Hello World!", function (err) {
            if (err) {
                console.log(err);
                reject(err);
            }
            resolve(true)
            console.log('write成功');
        });
    })
    next()
    ctx.response.body = '<h1>ppm写入' + dr + '</h1>';
});

//接口测试
router.get('/autoFile', async (ctx, next) => {

    let file = await new Promise((resolve, reject) => {
        fs.readFile('E:/work/TOOLSWEB/toolsWeb/uploaded/AyBg9l-dghVfwRoHGc5RfnSC.rar', function (err, data) {
            if (err) {
                console.log(err);
                reject(err);
            }
            resolve(data)
            console.log('read成功');
        })
    })

    console.log('file', file);

    let rs = await new Promise((resolve, reject) => {
        // fs.mkdir(i.dirPath + i.dirName, function (error) {

        fs.writeFile("E:/autoFiles/hd/test.rar", file, function (err) {
            if (err) {
                console.log(err);
                reject(err);
            }
            resolve(true)
            console.log('auto write成功');
        });
    })
    next()
    ctx.response.body = '<h1>auto write成功' + rs + '</h1>';
});


module.exports = router