var mysql = require('mysql');
const config = require('./config')
// console.log('config',config);
const sqlLib = require('./sqlLib')

const pool = mysql.createPool(config);

//导入日期自动格式化组件
require('../../funs/Date')



// //测试链接
// var connection = mysql.createConnection(config);
// connection.connect();
// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results[0].solution);
// });
// connection.end();

//
//将结果已对象数组返回
const row = ({
    sql,
    params
}) => {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
                return;
            }
            connection.query(sqlLib[sql], params, function (error, res) {
                connection.release();
                if (error) {
                    reject(error);
                    return;
                }
                resolve(res);
            });
        });
    });
};
//返回一个对象
const first = ({
    sql,
    params
}) => {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
                return;
            }
            connection.query(sqlLib[sql], params, function (error, res) {
                connection.release();
                if (error) {
                    reject(error);
                    return;
                }
                resolve(res[0] || null);
            });
        });
    });
};
//返回单个查询结果
const single = ({
    sql,
    params
}) => {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
                return;
            }
            connection.query(sqlLib[sql], params, function (error, res) {
                connection.release();
                if (error) {
                    reject(error);
                    return;
                }
                for (let i in res[0]) {
                    resolve(res[0][i] || null);
                    return;
                }
                resolve(null);
            });
        });
    });
}
//执行代码
const execute = async ({
    sql,
    params
}) => {
    // console.log('execute i:',sql,params);
    // console.log(sqlLib[sql]);


    let o
    o = new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
                return;
            }

            let sqlExecute = sqlLib[sql];

            if (!sqlExecute) {
                sqlExecute = sql
            }
            // if (filter) {
            //     sqlExecute = sqlExecute + ' where ' + filter;
            // }

            console.log('sqlExc', sqlExecute, params);

            connection.query(sqlExecute, params, function (error, res) {
                connection.release();
                if (error) {
                    reject(error);
                    return;
                }
                // console.log("res:" + JSON.stringify(res))
                resolve(res);
            });
        });
    });
    return o
}
//模块导出


module.exports = {
    row: row,
    first: first,
    single: single,
    execute: execute
}