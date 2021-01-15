// 注意require('koa-router')返回的是函数:
const Router = require('koa-router');

//引入jwt token模块
const jwt = require('jsonwebtoken');
const SECRET = 'foil';

//引入mysql数据库模块
const mysql = require('../../database/mysql')

//定义api前缀
var router = new Router({
    prefix: '/api/foil'
})

// var userToken={
//     name:'aa',
//     id:'1'
// }

const refreshToken = ({
    payload,
    expiresIn
}) => {
    // console.log(payload, expiresIn);

    let token = jwt.sign(
        payload, // 加密userToken, 等同于上面解密的userToken
        SECRET, {
            expiresIn: expiresIn,
            // expiresIn: '1h'
            // expiresIn: '1m' //一分钟过期
        } // 有效时长1小时
    )
    return token
}


//获取表单
router.get('/getBills', async (ctx, next) => {

    let sql = ctx.query.sql;
    let params = ctx.query.params;
    console.log(sql,params);
    


    let billsData = await mysql.execute({
        sql: sql,
        params: JSON.parse(params)
    })

    console.log('getBills billsData', billsData.length);

    if (billsData.length > 0) {
        ctx.body = {
            code: 200,
            msg: 'success',
            data: billsData
        }
    } else {
        ctx.body = {
            code: 400,
            msg: 'fail',
            data: []
        }
    }


});



//post 发送文件 
router.post('/checkLogin', async (ctx, next) => {

    // console.log("postData ctx", ctx.request.body);
    let account = ctx.request.body.account;
    let password = ctx.request.body.password

    let userInfo = await mysql.execute({
        sql: 'getMatchUserInfo',
        params: [account, password]
    })
    // console.log('userInfo', userInfo);

    if (userInfo.length > 0) {
        let userToken = {
            name: userInfo[0].Name,
            account: userInfo[0].UserAID
        };

        let token = refreshToken({
            payload: userToken,
            expiresIn: '1h'
        })

        ctx.body = {
            code: 200,
            msg: 'success',
            token: token
        }
    } else {
        // 登录失败, 用户名密码不正确
        ctx.body = {
            code: 400,
            msg: '用户名密码不匹配'
        }
    }

});


//post 发送文件 
router.post('/checkToken', async (ctx, next) => {
    console.log('checkToken', ctx.request.body);

    let token = ctx.request.body.token

    jwt.verify(token, SECRET, (error, decoded) => {
        if (error) {
            console.log('jwt error', error.message);
            ctx.body = {
                code: 400,
                msg: 'fail'
            }
        } else {
            // console.log('decoded', decoded);
            ctx.body = {
                code: 200,
                msg: 'success',
                data: {
                    name: decoded.name,
                    account: decoded.account
                }
            }

        }
    })


    // try {
    //     let rt = jwt.verify(token, SECRET, (decoded) => {
    //         console.log('decoded', decoded);
    //         return decoded

    //     }) //校验token
    //     console.log('rt', rt);


    //     if (rt.id) {
    //         let newToken = refreshToken({
    //             tokenInfo: {
    //                 name: userInfo.Name,
    //                 id: userInfo.UserAID
    //             },
    //             expiresIn: '1h'
    //         })
    //         ctx.body = {
    //             code: 200,
    //             msg: 'success',
    //             token: newToken,
    //         }
    //     }

    // } catch (error) {
    //     console.log('checkToken error', error);
    //     ctx.body = {
    //         code: 400,
    //         msg: '校验失败'
    //     }


    // }



});


//修改密码
router.post('/modifyPassword', async (ctx, next) => {
    console.log('modifyPassword', ctx.request.body);
    let account = ctx.request.body.account;
    let password = ctx.request.body.password;

    let rs = await mysql.execute({
        sql: 'modifyPassword',
        params: [password, account]
    })
    console.log('modify rs', rs.changedRows);

    if (rs.changedRows > 0) {
        ctx.body = {
            code: 200,
            msg: 'success',
        }
    } else {
        ctx.body = {
            code: 400,
            msg: 'fail',
        }

    }


});

module.exports = router