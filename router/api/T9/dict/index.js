/*
 * @Author: your name
 * @Date: 2021-03-02 10:12:35
 * @LastEditTime: 2021-03-18 12:53:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \TServer\router\api\T9\dict\index.js
 */
const RP = require('./RP')
const util = require('../../../../funs/util')


const lib = {
    RP: RP
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

    for (let n of data) {
        // console.log('n', n);
        for (const p in dict) {
            // console.log('p', p);
            if (Object.hasOwnProperty.call(n, p)) {
                n[dict[p]] = n[p]
                delete n[p]
            }
        }
    }

    //r
    return data
}


module.exports = {
    translater: translater,
}