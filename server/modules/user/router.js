import pify from 'promise.ify'

// var userArr = []

module.exports = function(router,body,connection){

    const selectUserSql =   `select * from user_base_info`

    router.get('/admin/api/user',body,async ctx => {

        if(ctx.request.header.authorization){
            
        const result = await pify(connection.query,connection)(selectUserSql)

        ctx.body = result[0];   

        }else{

            ctx.body = {error:'不要试图搞事情'}
        }
    })
}

