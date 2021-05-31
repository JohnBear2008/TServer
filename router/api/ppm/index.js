/*
 * @Author: your name
 * @Date: 2021-05-11 15:14:07
 * @LastEditTime: 2021-05-31 14:23:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \TServer\router\api\ppm\autoFile.js
 */
// 注意require('koa-router')返回的是函数:
const Router = require('koa-router');

// //引入mysql数据库模块
// const mysql = require('../../../database/mysql')

//引入文件模块
const fs = require('fs');

//共用参数
const ppmUploadedAdr = 'E:/work/TOOLSWEB/toolsWeb/uploaded/' //读取目录
const pathPre = 'E:/test' //归档地址


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


const getFile = async (fileKey) => {
    let file = await new Promise((resolve, reject) => {
        fs.readFile(ppmUploadedAdr + fileKey, function (err, data) {
            if (err) {
                console.log(err);
                reject(err);
            }
            resolve(data)
            console.log('read成功');
        })
    })

    return file
}


// placeOnFile({
//     pathArr: ["1", "2", "3"], //路径数组
//     fileName: '1.txt', //文件名
//     fileData: '1111' //文件数据
// })

//定义api前缀
var router = new Router({
    prefix: '/api/ppm'

})


//接口测试
router.get('/', async (ctx, next) => {
    next()
    ctx.response.body = '<h1>ppm接口测试</h1>';
});

// //接口测试
// router.get('/read', async (ctx, next) => {
//     let dr = await new Promise((resolve, reject) => {
//         // fs.mkdir(i.dirPath + i.dirName, function (error) {
//         fs.readFile('E:/ppmtest/test.txt', function (err, data) {
//             if (err) {
//                 console.log(err);
//                 reject(err);
//             }
//             resolve(data)
//             console.log('read成功');
//         })
//     })
//     next()
//     ctx.response.body = '<h1>ppm读取' + dr + '</h1>';
// });

// //接口测试
// router.get('/write', async (ctx, next) => {
//     let dr = await new Promise((resolve, reject) => {
//         // fs.mkdir(i.dirPath + i.dirName, function (error) {

//         fs.writeFile("E:/ppmtest/output.txt", "Hello World!", function (err) {
//             if (err) {
//                 console.log(err);
//                 reject(err);
//             }
//             resolve(true)
//             console.log('write成功');
//         });
//     })
//     next()
//     ctx.response.body = '<h1>ppm写入' + dr + '</h1>';
// });

//接口测试
router.post('/autoFile', async (ctx, next) => {
    //v
    let rs = '归档成功'

    //d-获取归档序列
    console.log('autoFile', ctx.request.body);
    let tasks = ctx.request.body.tasks;
    let autoFileArr = [];
    for (const n of tasks) {
        let nTaskFiles = JSON.parse(n.taskFiles);
        for (const file of nTaskFiles) {
            autoFileArr.push({
                taskCTRName: n.taskCTRName,
                taskMHEName: n.taskMHEName,
                taskModel: n.taskModel,
                modifyContent: n.modifyContent,
                fileName: file.fileName,
                fileKey: file.fileKey,
            })
        }
    }
    console.log('autoFileArr', autoFileArr);

    //d-归档
    try {
        for (const n of autoFileArr) {
            let pathArr = [n.taskCTRName, n.taskMHEName, n.taskModel];
            let file = await getFile(n.fileKey)
            placeOnFile({
                pathArr: pathArr, //路径数组
                fileName: n.fileName, //文件名
                fileData: file //文件数据
            })

            placeOnFile({
                pathArr: pathArr, //路径数组
                fileName: '修改说明.txt', //文件名
                fileData: n.modifyContent //文件数据
            })
        }
    } catch (error) {
        rs = error
    }

    next()
    ctx.response.body = rs;
});


module.exports = router