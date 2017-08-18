import Koa from 'koa';
import {sqlConf,serverConf} from "./conf"
const app = new Koa();
const historyApiFallback = require('koa-history-api-fallback'); // 引入依赖
const body = require('koa-body')();
const mysql = require('mysql')
const serve = require('koa-static')
const convert = require('koa-convert');
const routes = require('./routes')

//连接数据库
const connection = mysql.createConnection(sqlConf);

connection.connect();

routes(app,body,connection);

app.use(convert(historyApiFallback())); // 在这个地方加入。一定要加在静态文件的serve之前，否则会失效。
app.use(serve(__dirname + '/public'))

app.listen(serverConf.port,() => {
    console.log('run at port ',serverConf.port);
});

