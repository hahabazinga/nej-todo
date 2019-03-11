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
    next();
};
server.use(allowCrossDomain);

server.use(bodyParser.json());

server.get('/getTodoList', (request, response) => {
    try{
        db.find({},(res) => response.send(res))
    }catch (e) {
        console.error(e);
    }
    
    
});
server.put('/addTodo', (request, response) => {
    
    console.log('收到请求', request.body);
    response.send(request.body)
})

server.listen(8005, ()=>console.log('server listening on port 8005'));