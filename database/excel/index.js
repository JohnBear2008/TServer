var xlsx = require('node-xlsx');




const read = async (fileName) => {
    var sheets = await xlsx.parse(fileName); //获取到所有sheets

    sheets.forEach(function (sheet) {
        console.log(sheet['name']);
        for (var rowId in sheet['data']) {
            console.log(rowId);
            var row = sheet['data'][rowId];
            console.log(row);
        }
    });
    return sheets
}


module.exports = {
    read: read
}