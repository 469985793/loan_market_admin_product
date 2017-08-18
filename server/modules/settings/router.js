import decode  from 'jwt-decode'
import pify from 'promise.ify'
import md5 from 'md5'

module.exports = function(router,body,connection) {
    router.post('/admin/api/settingurl',body,ctx => {
            if(ctx.request.header.authorization){
                connection.query(`select * from settings`,function(err,result){
                    if(result.length){
                       connection.query(`update settings set url='${ctx.request.body.url}'`)
                    }else{
                        connection.query(`insert into settings (url) values ('${ctx.request.body.url}')`,function(err,result){
                            if(!err){
                                ctx.body = 0
                            }
                        })
                    }
                })
            }else{
                ctx.body = '请登陆'
            }
        })

        router.post('/admin/api/changeuserNameAndPassword',body,async ctx => {

            if(ctx.request.header.authorization){

                const checkAdminSql = `select * from loan_list_admin where admin = '${decode(ctx.request.header.authorization).username}' and password='${md5(ctx.request.body.data.beforepassword)}'`
                const result = await pify(connection.query,connection)(checkAdminSql)
           
                if(JSON.stringify(result[0]) !== '[]'){
                    const updateAdminSql = `update loan_list_admin set admin='${ctx.request.body.data.username}',password='${md5(ctx.request.body.data.password)}'`
                    pify(connection.query,connection)(updateAdminSql)
                    ctx.body = {success:true}
                }else{
                    ctx.body = {success:false}                    
                }
                
            }else{
                ctx.body = "请登陆"
            }                
        })
}