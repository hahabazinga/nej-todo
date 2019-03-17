const MongoClient = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectId;
const url = "mongodb://localhost:27017";
const DB_NAME = 'DB_TODO';
const TABLE_NAME = 'TABLE_TODO';

/**
 * 数据库插入单条记录
 * 
 * @param {插入的记录} record 
 * @param {插入完成的回调} cb 
 */
const insertOne = (record, cb) => {
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
const updateOne = (whereStr, updateStr, cb) => {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbase = db.db(DB_NAME);
        dbase.collection(TABLE_NAME).updateOne({ _id: objectId(whereStr._id)}, updateStr, function (err, res) {
            if (err) throw err;
            console.log(`${TABLE_NAME}更新:`, res);
            cb(res);
            db.close();
        });
    });
}

/**
 * 
 * 数据库删除单条记录
 * @param {查询语句} whereStr { _id: '5c89e8f8c3fb468fe9e4e13e'}
 * @param {回调函数} cb 
 */
const deleteOne = (whereStr, cb) => {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbase = db.db(DB_NAME);
        dbase.collection(TABLE_NAME).deleteOne({ _id: objectId(whereStr._id)}, function (err, obj) {
            if (err) throw err;
            console.log(`${TABLE_NAME}删除:`, obj);
            cb(obj);
            db.close();
        });
    });
}

/**
 * 
 * 数据库删除多条记录
 * @param {查询语句} whereStr { completed: true}
 * @param {回调函数} cb 
 */
const deleteMany = (whereStr, cb) => {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbase = db.db(DB_NAME);
        dbase.collection(TABLE_NAME).deleteMany(whereStr, function (err, obj) {
            if (err) throw err;
            console.log(`${TABLE_NAME}删除:`, obj);
            cb(obj.result.n);
            db.close();
        });
    });
}
/**
 * 
 * 数据库更新多条记录
 * @param {查询语句} whereStr 
 * @param {更新内容} updateStr 
 * @param {回调函数} cb 
 */
const updateMany = (whereStr, updateStr, cb) => {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbase = db.db(DB_NAME);
        dbase.collection(TABLE_NAME).updateMany(whereStr, updateStr, function (err, res) {
            if (err) throw err;
            console.log(`${TABLE_NAME}更新:`, res);
            cb(res);
            db.close();
        });
    });
}



module.exports = {
    insertOne,
    find,
    updateOne,
    deleteOne,
    deleteMany,
    updateMany
} 