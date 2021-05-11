/*
 * @Author: your name
 * @Date: 2021-05-11 15:14:07
 * @LastEditTime: 2021-05-11 18:17:34
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
        fs.readFile('E:/work/TOOLSWEB/toolsWeb/uploaded/dnNLPPSamnze4QUbMRUhS9wK.xlsx', function (err, data) {
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

        fs.writeFile("//192.168.0.5/工程资料管理库/13-WS-文书资料——工作报告  年终（中） 报告  会议记录  ISO文件 编码原则 标准 产品履历 发行资料 组织岗位 证书资料 统计资料 人员档案信息/0-工作报告——周月报 出差报告 观展报告 年度总结 测试报告/00-周月报告/output1.xlsx", file, function (err) {
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