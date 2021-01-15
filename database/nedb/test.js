// 加载模块
const nedb = require('nedb');

console.log('nedb');

// 实例化连接对象（不带参数默认为内存数据库）
const db = new nedb({
    filename: 'data/save.db',
    autoload: true
}, (err, ret) => {
    console.log('实例化连接对象', err, ret);

});

// 插入单项
db.insert({
    name: 'john'
}, (err, ret) => {
    console.log("插入单项 insert", err, ret);

});

// 插入多项
db.insert(
    [{
            name: 'tom'
        },
        {
            name: 'jerry'
        }
    ], (err, ret) => {
        console.log("插入多项insert", err, ret);
    });

// 查询单项
db.findOne({
    name: 'tom'
}, (err, ret) => {
    console.log("查询单项 find", err, ret);
});

// 查询多项
db.find({
        name: {
            $in: ['tom', 'jerry']
        }
    })
    .sort({
        _id: -1
    })
    .exec((err, ret) => {
        console.log("查询多项 find", err, ret);
    });

// 更新单项
db.update({
    _id: '1'
}, {
    $set: {
        name: 'kitty'
    }
}, (err, ret) => {
    console.log("更新单项 update",err, ret);
});

// 更新多项
db.update({}, {
    $set: {
        name: 'kitty'
    }
}, {
    multi: true
}, (err, ret) => {
    console.log("更新多项 update",err, ret);
});

// 删除单项
db.remove({
    _id: '1'
}, (err, ret) => {
    console.log("删除单项 remove",err, ret);
})

// 删除多项
db.remove({
    // name: 'kitty'
}, {
    multi: true
}, (err, ret) => {
    console.log("删除多项 remove",err, ret);
});

//统计
db.count({
    name: 'tom'
}, function (err, ret) {
    console.log("统计 count", err, ret);
});