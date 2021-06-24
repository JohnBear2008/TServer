// 加载模块
const nedb = require('nedb');


const createDB = (
    name
) => {
    new nedb({
        filename: 'data/' + name + '.db',
        autoload: true
    }, (err, ret) => {
        console.log('实例化连接对象mobConfig', err, ret);
    });
}

const getDB = async (
    name
) => {
    let db = await new nedb({
        filename: 'data/' + name + '.db',
        autoload: true
    }, (err, ret) => {
        console.log('实例化连接对象mobConfig', err, ret);
    });
    return db;
}

const insertDB = async ({
    name,
    data
}) => {
    console.log('insertDB', name);
    let db = await getDB(name);
    // console.log('db', db);
    // 插入单项
    let res = await new Promise((resolve, reject) => {
        db.insert(data, (err, ret) => {
            if (err) {
                reject(err)
            }
            if (ret) {
                console.log('insertDB ret', ret);
                resolve(true)
            } else {
                resolve(false)
            }
        });
    })

    console.log('insertDB res', res);

    return res;
}


const isExist = async ({
    name,
    filter
}) => {
    console.log('findOneDB filter', filter);
    let db = await getDB(name);
    // console.log('db', db);
    // 插入单项
    let res = await new Promise((resolve, reject) => {
        db.findOne(filter, (err, ret) => {
            if (err) {
                console.log('isExist err', err);
                reject(err)
            }
            if (ret) {
                console.log('isExist ret', ret);
                resolve(true)
            } else {
                resolve(false)
            }
        });
    })
    return res;
}


const findOneDB = async ({
    name,
    filter
}) => {
    console.log('findOneDB filter', filter);
    let db = await getDB(name);
    // console.log('db', db);
    // 插入单项
    let res = await new Promise((resolve, reject) => {
        db.findOne(filter, (err, ret) => {
            if (err) {
                console.log('findOneDB err', err);
                reject(err)
            }
            if (ret) {
                console.log('findOneDB ret', ret);
                resolve(ret)
            } else {
                console.log('findOneDB null')
                resolve(null)
            }
        });
    })
    return res;
}


const findDB = async ({
    name,
    filter
}) => {
    console.log('findDB', name);
    let db = await getDB(name);
    // console.log('db', db);
    // 插入单项
    let res = await new Promise((resolve, reject) => {
        db.find(filter, (err, ret) => {
            if (err) {
                reject(err)
            }
            if (ret) {
                resolve(ret)
            } else {
                resolve([])
            }
        });
    })

    return res;
}

// 更新多项
const updateOneDB = async ({
    name,
    filter,
    data
}) => {
    let db = await getDB(name);

    let res = await new Promise((resolve, reject) => {
        db.update(filter, {
            $set: data
        }, (err, ret) => {
            if (err) {
                reject(err)
            }
            if (ret) {
                console.log('updateOneDB ret', ret);
                resolve(true)
            } else {
                resolve(false)
            }
        });
    })
    console.log('updateOneDB', res);
    return res;
}



const deleteDB = async ({
    name,
    filter
}) => {
    console.log('findDB', name);
    let db = await getDB(name);

    let res = await new Promise((resolve, reject) => {
        db.remove(filter, {
            multi: true
        }, (err, ret) => {
            if (err) {
                reject(err)
            }
            if (ret) {
                resolve(ret)
            }
        });
    })
    return res;
}

module.exports = {
    createDB,
    getDB,
    insertDB,
    findOneDB,
    findDB,
    updateOneDB,
    deleteDB,
    isExist
}