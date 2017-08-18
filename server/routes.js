const router = require('koa-router')();
const list = require('./modules/list/router')
const user = require('./modules/user/router')
const listItem = require('./modules/list/getListItem')
const count =  require('./modules/count/router')
const settings = require('./modules/settings/router')
const xlsx = require('./modules/xlsx/router')
const login = require('./modules/login/router')

module.exports = function(app,body,connection) {

    list(router,body,connection);
    user(router,body,connection);
    listItem(router,body,connection);
    count(router,body,connection);
    settings(router,body,connection);
    xlsx(router,body,connection);
    login(router,body,connection);

    app.use(router.routes());

}