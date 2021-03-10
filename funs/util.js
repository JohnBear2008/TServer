/**
 *将数组转换为(a,b,c)字符串,用于sql语句范围
 *
 * @param {*} arr
 */
const getRangeString = (arr) => {
    let range = ""
    for (const n of arr) {
        range = range + "'" + n + "',"
    }
    range = range.substring(0, range.length - 1);
    range = "(" + range + ")";
    return range;

}

/**
 *判断对象数据类型,是对象或数组
 *
 * @param {*} obj
 * @returns
 */
 const typeObj = (obj) => {
    let type = Object.prototype.toString.call(obj);
    let typeResult = '';
    switch (type) {
        case '[object Array]':
            typeResult = 'Array'
            break;
        case '[object Object]':
            typeResult = 'Object'
            break;
        case '[object String]':
            typeResult = 'String'
            break;
        default:
            typeResult = false
            break;

    }
    return typeResult

}

module.exports = {
    getRangeString: getRangeString,
    typeObj:typeObj
}