// 注意require('koa-router')返回的是函数:
const Router = require('koa-router');

const request = require('request');
const cheerio = require('cheerio')
const fs = require('fs');

//定义api前缀
const router = new Router({
    prefix: '/api/holiday'
})



// 时间过滤方法
Date.prototype.format = function () {
    var s = '';
    var mouth = (this.getMonth() + 1) >= 10 ? (this.getMonth() + 1) : ('0' + (this.getMonth() + 1));
    var day = this.getDate() >= 10 ? this.getDate() : ('0' + this.getDate());
    // s += this.getFullYear() + '-'; // 获取年份。  
    s += mouth + "-"; // 获取月份。  
    s += day; // 获取日。  
    return (s); // 返回日期。  
};
// 获取时间区间
const getAllDate = (begin, end) => {
    var arr = [];
    var ab = begin.split("-");
    var ae = end.split("-");
    var db = new Date();
    db.setUTCFullYear(ab[0], ab[1] - 1, ab[2]);
    var de = new Date();
    de.setUTCFullYear(ae[0], ae[1] - 1, ae[2]);
    var unixDb = db.getTime() - 24 * 60 * 60 * 1000;
    var unixDe = de.getTime() - 24 * 60 * 60 * 1000;
    if (unixDb >= unixDe)
        return [new Date(parseInt(unixDe + 24 * 60 * 60 * 1000)).format()]
    for (var k = unixDb; k <= unixDe;) {
        k = k + 24 * 60 * 60 * 1000;
        arr.push((new Date(parseInt(k))).format());
    }
    return arr;
}


//计算实际日期
const getHolidayDates = ({
    year,
    data
}) => {
    console.log({
        year,
        data
    });
    let holidayDates = []
    let exchangeDates = []
    for (const n in data) {
        for (const k in data[n]) {
            let date = year + '-' + n + '-' + k
            console.log(date);
            if (data[n][k] === 1) {
                holidayDates.push(date)
            }
            if (data[n][k] === 2) {
                exchangeDates.push(date)
            }
        }

    }

    //日期排序
    holidayDates.sort(function (a, b) {
        return b < a ? 1 : -1
    })

    exchangeDates.sort(function (a, b) {
        return b < a ? 1 : -1
    })
    return {
        holidayDates,
        exchangeDates
    }

}

// 处理一下爬取结果
const operation = (body, year) => {
    let $ = cheerio.load(body),
        json = {},
        reg = /['年'|'日'|'一'|'二'|'三'|'四'|'五'|'六'|'星期'|'天'|'（'|'）'|'上班']/g,
        reg2 = /['年'|'月']/g,
        reg3 = /[(\u4e00-\u9fa5) | ')' | '(']/g,
        data = {}

    // console.log('body', body);
    $('#main_content table tr').each((i, tr) => {
        if (i > 0) {
            let tds = $(tr).find('td')
            json[tds.eq(0).text()] = {
                date: tds.eq(1).text().replace(reg, ''),
                trim: tds.eq(2).text().replace(reg, ''),
                long: tds.eq(3).text().replace(reg, '')
            }
        }
    })

    for (key in json) {
        let m = json[key].date.split('~').map(i => year + '-' + i)
        let fmtM = m.map(i => i.replace(reg2, '-').replace(reg3, ''))
        getAllDate(fmtM[0], fmtM[1] || fmtM[0]).forEach(i => {
            data[i.split('-')[0]] ? data[i.split('-')[0]][i.split('-')[1]] = 1 : data[i.split('-')[0]] = {
                [i.split('-')[1]]: 1
            }
        })
        let t = json[key].trim.split('、')
        let fmtT = t.map(i => i.replace(reg2, '-').replace(reg3, ''))
        fmtT.forEach(i => {
            let m0 = i.split('-')[0] < 10 ? '0' + i.split('-')[0] : i.split('-')[0],
                d0 = i.split('-')[1] < 10 ? '0' + i.split('-')[1] : i.split('-')[1];
            if (m0 && d0) {
                data[m0] ? data[m0][d0] = 2 : data[m0] = {
                    [d0]: 2
                }
            }
        })
    }
    let dates = getHolidayDates({
        year: year,
        data: data
    })
    fs.writeFile(`./router/api/holiday/records/${year}.json`, JSON.stringify(dates), err => {
        if (err) return console.log(err)
        console.log(`写入 ${year}.json 成功！`)
    })
    return dates
}

router.get('/', async (ctx, next) => {
    next()
    ctx.response.body = '<h1>holiday假日接口</h1>';
});

//修改密码
router.post('/', async (ctx, next) => {
    let year = ctx.request.body.year;
    console.log('holiday post', ctx.request.body);
    let holidays

    await new Promise((resolve, reject) => {
        request.get(`https://fangjia.51240.com/${year}__fangjia/`, (err, res, body) => {
            if (err) return reject(err);
            holidays = operation(body, year)
            resolve(res);
        })

        // req.on('response', res => {
        //     resolve(res);
        // });

        // req.on('error', err => {
        //     reject(err);
        // });
    });

    console.log('holidays', holidays);
    ctx.body = {
        year,
        holidays
    }
    next()

});

module.exports = router