const rp = require('./rp')
const lib = {
    rp: rp
}

const getDict = (to) => {
    for (const p in lib) {
        if (Object.hasOwnProperty.call(lib, to)) {
            const element = lib[p];
            console.log('element', element);
            return element
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
    //d
    let dict = getDict(to)

    for (let n of data) {
        for (const p in dict) {
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