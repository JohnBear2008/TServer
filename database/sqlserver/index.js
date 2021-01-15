const mssql = require('mssql')
const config = require('./config')

// (async function () {
//     try {
//         let pool = await sql.connect(config)
//         let result1 = await pool.request()
//             .input('input_parameter', sql.Int, value)
//             .query('select * from mytable where id = @input_parameter')

//         console.dir(result1)

//         // Stored procedure

//         let result2 = await pool.request()
//             .input('input_parameter', sql.Int, value)
//             .output('output_parameter', sql.VarChar(50))
//             .execute('procedure_name')

//         console.dir(result2)
//     } catch (err) {
//         // ... error checks
//     }
// })()

// sql.on('error', err => {
//     // ... error handler
// })


//执行代码
const execute = async ({
    sql,
    params
}) => {
    try {
        await mssql.connect(config)
        let rs = await mssql.query(sql, params)
        // console.dir(rs)
        return rs
    } catch (err) {
        console.log('err', err);
        // ... error checks
    }
}
//模块导出

module.exports = {
    execute: execute
}