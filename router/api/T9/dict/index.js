const rp = require('./rp')
const mes = require('./mes')
const util = require('../../../../funs/util')


const lib = {
    rp: rp,
    mes: mes
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

const filterTranslater = ({
    filter,
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
    if (util.typeObj(filter) !== 'String') {
        console.log('filter 非字符串 参数错误');
        return
    }
    //c
    if (filter.length === 0) {
        return ""
    }
    //d 特殊字符处理
    filter = filter.replace(/\"/g, "'");

    //d
    let dict = getDict({
        to,
        type
    })
    // console.log('dict', dict);
    for (const p in dict) {
        // console.log(dict[p]);
        if (filter.indexOf(dict[p]) !== -1) {
            console.log('find ', dict[p], p);
            filter = filter.replace(new RegExp(dict[p], 'g'), p)
        }

    }
    console.log(filter);
    //r
    return filter
}

module.exports = {
    translater: translater,
    filterTranslater: filterTranslater
}