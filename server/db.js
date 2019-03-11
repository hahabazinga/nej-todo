var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";
const DB_NAME = 'DB_TODO';
const TABLE_NAME = 'TABLE_TODO';

/**
 * 数据库插入单条记录
 * 
 * @param {插入的记录} record 
 * @param {插入完成的回调} cb 
 */
const insert = (record, cb) => {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        const dbase = db.db(DB_NAME);
        dbase.collection(TABLE_NAME).insertOne(record, function(err, res) {
            if (err) throw err;
            console.log("插入记录", res);
            cb(res);
            db.close();
        });
    });
}

/**
 * 数据库查询
 * 
 * @param {查询语句} whereStr 
 * @param {查询结果的回调} cb 
 */
const find = (whereStr, cb) => {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        const dbase = db.db(DB_NAME);
        dbase.collection(TABLE_NAME).find(whereStr).toArray((err, result) => {
            if (err) throw err;
            console.log('查询记录', result);
            cb(result);
            db.close();
        })
    });
}

/**
 * 
 * 数据库更新单条记录
 * @param {查询语句} whereStr 
 * @param {更新内容} updateStr 
 * @param {回调函数} cb 
 */
const update = (whereStr, updateStr, cb) => {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db(DB_NAME);
        dbo.collection(TABLE_NAME).updateOne(whereStr, updateStr, function (err, res) {
            if (err) throw err;
            console.log(`${TABLE_NAME}更新:`, res);
            cb(res);
            db.close();
        });
    });

}



module.exports = {
    insert,
    find,
    update

} 