/*
 * @Author: your name
 * @Date: 2021-01-18 13:02:32
 * @LastEditTime: 2021-04-27 17:54:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \TServer\database\sqlserver\config.js
 */
////T9 测试服
// module.exports = {
//     user: 'sa',
//     password: '338168',
//     server: '192.168.0.26',
//     database: 'T9CS',
//     port: 1433,
//     pool: {
//         min: 0,
//         max: 100,
//         idleTimeoutMillis: 3000
//     }
// }
//T9 正式服
module.exports = {
    user: 'sa',
    password: 'tech338168',
    server: '192.168.0.22',
    database: 'T9Techmation',
    port: 1433,
    pool: {
        min: 0,
        max: 100,
        idleTimeoutMillis: 3000
    }
}