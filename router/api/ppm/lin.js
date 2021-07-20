/*
 * @Author: your name
 * @Date: 2021-05-11 15:14:07
 * @LastEditTime: 2021-06-18 14:07:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \TServer\router\api\ppm\autoFile.js
 */
// 注意require('koa-router')返回的是函数: 
const Router = require('koa-router');
const router = new Router()

//引入文件模块
const fs = require('fs');

const SMB2 = require("smb2");

const smbConfig = {
    share: '\\\\192.168.0.5\\program',
    domain: 'tmdg',
    username: 'xiongql',
    password: '338168'
}

// const smb2Client = new SMB2(smbConfig);

// smb2Client.writeFile('PPMPROGRAM\\7AK(杭州爱科)\\55\\2021\\DSP\\立式注塑机\\PILOT5580' + '\\' + '1.txt', '333333333', function (err) {
//     if (err) throw err;
//     // resolve(true)
//     console.log('write成功');
// });

// // // smb2Client.readFile('PPMPROGRAM\\b.txt', function (err, data) {
// // //     if (err) throw err;
// // //     console.log(data.toString()); //没有指定编码格式就要用这个
// // // });

// // // smb2Client.mkdir('PPMPROGRAM\\7AK(ak)', function (err, data) {
// // //     if (err) throw err;
// // //     console.log(data.toString()); //没有指定编码格式就要用这个
// // // });

// smb2Client.mkdir('PPMPROGRAM\\7AK(埃克)', function (err) {
//     if (err) console.log(err);
//     if (err) throw err;
//     console.log('Folder created!');
// });



//共用参数
const ppmUploadedAdr = '/home/ppm/APP/TOOLSWEB/toolsWeb/uploaded/' //读取目录
// const pathPre = '//192.168.0.5/program/PPMPROGRAM' //归档地址

const checkFolder = async ({
    folderPath
}) => {
    //c
    if (!folderPath) {
        console.log('path 参数不足!');
        return
    }
    //c

    console.log('checkFolder', folderPath);
    let rs = await new Promise((resolve, reject) => {
        const smb2Client = new SMB2(smbConfig);
        smb2Client.exists(folderPath, function (err, exists) {
            if (err) throw err;
            console.log(exists ? "it's there" : "it's not there!");
            if (exists) {
                resolve(true)
            } else {
                resolve(false)
            }
        });

    })
    //r
    return rs

}


const createFolder = async ({
    folderPath
}) => {
    //c
    console.log('createFolder', folderPath);
    if (!folderPath) {
        console.log('path 参数不足!');
        return
    }
    //c-检查是否已存在
    let r1 = await checkFolder({
        folderPath
    })

    console.log('checkFolder r1', r1);
    if (r1) {
        console.log('createFolder ' + folderPath + '已存在');
        return true
    }
    //d
    let createResult = await new Promise((resolve, reject) => {
        const smb2Client = new SMB2(smbConfig);
        smb2Client.mkdir(folderPath, 0777, function (err) {
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
    console.log("placeOnFile", pathArr, fileName, fileData);
    //c
    if (!pathArr || !fileName || !fileData) {
        console.log('placeOnFile 参数不足!');
        return
    }
    //d-建立文件夹

    let folderPath = "PPMPROGRAM"
    let preFolderReady = true
    for (const path of pathArr) {
        folderPath = folderPath + '\\' + path;
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
        console.log('folderPath', folderPath, fileName, fileData);
        const smb2Client = new SMB2(smbConfig);
        // smb2Client.writeFile(folderPath + '\\' + fileName, fileData, function (err) {
        //     if (err) {
        //         console.log(err);
        //         reject(err);
        //     }
        //     resolve(true)
        //     console.log('write成功');
        // });

        smb2Client.writeFile(folderPath + '\\' + fileName, fileData, function (err) {
            if (err) throw err;
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


//接口测试
router.get('/', async (ctx, next) => {
    next()
    ctx.response.body = '<h1>ppm lin接口测试</h1>';
});



//接口测试
router.post('/autoFile', async (ctx, next) => {
    //v
    let rs = '归档成功'

    //d-获取归档序列
    console.log('autoFile', ctx.request.body);

    let autoFileArr = JSON.parse(ctx.request.body.autoFileArr);


    console.log('autoFileArr', autoFileArr);


    //d-归档
    try {
        for (const n of autoFileArr) {

            let pathArr = n.filePath;
            let file = await getFile(n.fileKey)
            // console.log('n', n);
            await placeOnFile({
                pathArr: pathArr, //路径数组
                fileName: n.fileName, //文件名
                fileData: file //文件数据
            })
            await placeOnFile({
                pathArr: pathArr, //路径数组
                fileName: n.fileName+'修改说明.txt', //文件名
                fileData: n.modifyContent //文件数据
            })
        }
    } catch (error) {
        console.log(error);
        rs = error
    }

    next()
    ctx.response.body = rs;
});


module.exports = router.routes()
