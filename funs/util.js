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

const dateFormat = (date, fmt) => {
    //先格式化为日期,缺少此句 get函数无法执行
    date = new Date(date);
    let o = {
        "M+": date.getMonth() + 1, //月份 
        "d+": date.getDate(), //日 
        "H+": date.getHours(), //小时 
        "m+": date.getMinutes(), //分 
        "s+": date.getSeconds(), //秒 
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
        "S": date.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

module.exports = {
    getRangeString: getRangeString,
    typeObj: typeObj,
    dateFormat: dateFormat
}