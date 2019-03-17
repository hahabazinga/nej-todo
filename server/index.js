const express = require('express');
const bodyParser = require('body-parser');

const server = express();
const db = require('./db');

/**
 * 允许跨域中间件
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8002');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next();
};
server.use(allowCrossDomain);

server.use(bodyParser.json());

server.get('/getTodoList', (request, response) => {
    try {
        db.find({}, (res) => {
            response.status(200);
            response.send({
                type: 'success',
                data: res
            });
        });
    } catch (e) {
        response.status(500);
        response.send({
            type: 'error',
            message: e.toString()
        })
        console.error('/getTodoList出错', e);
    }
});
server.post('/addTodo', (request, response) => {

    console.log('收到请求', request.body);
    
    try {
        const record = request.body;
        db.insertOne(record, () => {
            db.find({}, (res) => {
                response.status(200);
                response.send({
                    type: 'success',
                    data: res
                });
            });
        })
    } catch (e) {
        response.status(500);
        response.send({
            type: 'error',
            message: e.toString()
        })
        console.error('/addTodo出错', e);
    }
})
server.post('/deleteTodo', (request, response) => {

    console.log('收到请求', request.body);
    const record = request.body;
    try {
        db.deleteOne(record, () => {
            db.find({}, (res) => {
                response.status(200);
                response.send({
                    type: 'success',
                    data: res
                });
            });
        })
    } catch (e) {
        response.status(500);
        response.send({
            type: 'error',
            message: e.toString()
        })
        console.error('/deleteTodo出错', e);
    }
})
server.post('/deleteAllCompleted', (request, response) => {
    const whereStr = request.body;
    try {
        db.deleteMany(whereStr, (n) => {
            db.find({}, (res) => {
                response.status(200);
                response.send({
                    type: 'success',
                    data: res
                });
            });
        })
    } catch (e) {
        response.status(500);
        response.send({
            type: 'error',
            message: e.toString()
        })
        console.error('/deleteAllCompleted', e);
    }
})
server.post('/toggleTodo', (request, response) => {
    try {
        const whereStr = { _id: request.body._id };
        const updateStr = { $set: { completed: !request.body.completed } }
        db.updateOne(whereStr, updateStr, () => {
            db.find({}, (res) => {
                response.status(200);
                response.send({
                    type: 'success',
                    data: res
                });
            });
        })
    } catch (e) {
        response.status(500);
        response.send({
            type: 'error',
            message: e.toString()
        })
        console.error('/toggleTodo出错', e);
    }
})
server.post('/toggleAllTodo', (request, response) => {
    try {
        const updateStr = { $set: request.body }
        db.updateMany({}, updateStr, () => {
            db.find({}, (res) => {
                response.status(200);
                response.send({
                    type: 'success',
                    data: res
                });
            });
        })
    } catch (e) {
        response.status(500);
        response.send({
            type: 'error',
            message: e.toString()
        })
        console.error('/toggleTodo出错', e);
    }
})


server.listen(8005, () => console.log('server listening on port 8005'));