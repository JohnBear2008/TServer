'use strict';

/* 
 1. fs.stat  检测是文件还是目录(目录 文件是否存在) 
 2. fs.mkdir  创建目录 （创建之前先判断是否存在） 
 3. fs.writeFile  写入文件(文件不存在就创建,但不能创建目录) 
 4. fs.appendFile 写入追加文件 
 5.fs.readFile 读取文件 
 6.fs.readdir 读取目录 
 7.fs.rename 重命名 
 8. fs.rmdir  删除目录 
 9. fs.unlink 删除文件 
*/


const fs = require('fs');

const utils = require('../funs/utils')

// console.log('utils:'+JSON.stringify(utils.isJson))

//1. fs.stat  检测是文件还是目录  fs.statSync()同步获取stats对象,通过返回值接收。
//checkPath i {path:'./a/'}
const checkPath = async (i, o) => {

  //check i
  let cr, cr1, cr2

  try {
    cr1 = utils.checkParams({
      json: i,
      params: ['path']
    })

    if(i.path.charAt(i.path.length-1)==='/'){
      cr2=true
    }else{
      cr2=false
    }

    cr=cr1&&cr2

  } catch (e) {
    console.log('checkPath check error:' + e)
    cr=false

  }

  //do
  let dr
  if (cr) {
    try {

      dr = await new Promise((resolve, reject) => {

        fs.stat(i.path, function (error, stats) {
          if (error) {
            console.log('fs.stat:' + error);
            reject(false);
          } else if (stats.isDirectory() === true) {
            resolve(true)
          }
          // console.log('文件：' + stats.isFile());
          // console.log('目录：' + stats.isDirectory());

        })
      })

    } catch (e) {
      console.log('checkPath do error:' + e)
      dr = e;
    }

  }

  //return
  o = dr
  console.log('checkPath return o :' + o)
  return o

}

// let o
// checkPath({path: './css/'}, o)

// mkdir i {dirName:'1',dirPath:'./css/'}
const mkdir = async (i, o) => {

  //check i
  let cr, cr1, cr2

  try {
    cr1 = utils.checkParams({
      json: i,
      params: ['dirName', 'dirPath']
    })
    cr2 = checkPath({
      path: i.dirPath
    }, o)
    if (!cr1) {
      console.log('mkdir check fail: checkParams 错误!')
    } else if (!cr2) {
      console.log('mkdir check fail: checkPath 错误!')
    }
    cr = cr1 && cr2
  } catch (e) {
    console.log('mkdir check error: ' + e)
    cr = false
  }

  //do

  let dr
  if (cr) {
    try {

      dr = await new Promise((resolve, reject) => {

        fs.mkdir(i.dirPath + i.dirName, function (error) {
          if (error) {
            console.log(error);
            reject(false);
          }

          resolve(true)
          console.log('创建目录成功');
        })

      })

    } catch (e) {
      console.log('mkdir do error: ' + e)
    }
  }

  //return 

  o=dr

  console.log('mkdir return o :' + o)
  return o

}

// let o;
// mkdir({
//   dirName: '2',
//   dirPath: './css/'
// }, o)



//模块导出
module.exports = {
  checkPath: checkPath,
  mkdir: mkdir,
}