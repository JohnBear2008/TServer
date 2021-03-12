const RP = require('./RP')
const util = require('../../../../funs/util')


const lib = {
    RP: RP
}

const getDict = (to) => {
    // console.log('lib', to, lib);
    for (const p in lib) {
        // console.log('getDict p', p);
        if (Object.hasOwnProperty.call(lib, p)) {
            if (p === to) {
                const element = lib[p];
                // console.log('element', element);
                return element
            }
        }
    }
}

const translater = ({
    data,
    to
}) => {
    //c
    if (!to) {
        console.log('to 参数错误');
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
    let dict = getDict(to)
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