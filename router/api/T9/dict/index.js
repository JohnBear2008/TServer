/*
 * @Author: your name
 * @Date: 2021-03-02 10:12:35
 * @LastEditTime: 2021-04-19 08:15:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \TServer\router\api\T9\dict\index.js
 */
const rp = require('./rp')
const util = require('../../../../funs/util')


const lib = {
    rp: rp
}

const getDict = ({
    to,
    type
}) => {
    // console.log('lib', to, lib);
    for (const p in lib) {
        // console.log('getDict p', p);
        if (Object.hasOwnProperty.call(lib, p)) {
            if (p === to) {
                let dict = lib[p];
                if (type && Object.hasOwnProperty.call(lib[p], type)) {
                    dict = lib[p][type];
                }
                return dict
            }
        }
    }
}

const translater = ({
    data,
    to,
    type
}) => {
    //c
    if (!to) {
        console.log('to 参数错误');
        return
    }

    if (!type) {
        console.log('type 参数错误');
        return
    }
    //c
    if (util.typeObj(data) !== 'Array') {
        console.log('data 非数组 参数错误');
        return
    }
    //c
    if (data.length === 0) {
        return []
    }

    //d
    let dict = getDict({
        to,
        type
    })
    console.log('dict', dict);


    let returnData = [];

    for (let n of data) {
        // console.log('n', n);
        let newN = {}
        for (const p in dict) {
            // console.log('p', p);
            if (Object.hasOwnProperty.call(n, p)) {
                // n[dict[p]] = n[p]
                // delete n[p]
                newN[dict[p]] = n[p]
            }
        }
        returnData.push(newN)
    }

    //r
    return returnData
}


module.exports = {
    translater: translater,
}