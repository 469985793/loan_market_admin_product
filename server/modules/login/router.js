import md5 from 'md5'
import pify from 'promise.ify'
import jwt from 'jsonwebtoken'

module.exports = function(router,body,connection){

    router.post('/admin/api/login',body,async ctx => {

        const checkLoginSql = `select * from loan_list_admin where admin = '${ctx.request.body.user.username}'`

        const result = await pify(connection.query,connection)(checkLoginSql)

        if(JSON.stringify(result[0]) == '[]' ){
            ctx.body = '用户名或错误'
        }else{
            if(result[0][0].password == md5(ctx.request.body.user.password)){
                const userToken = {
                    username: result[0][0].admin,
                    type:result[0][0].type
                  }

                  const secret = 'meili_secret';
                  const token = jwt.sign(userToken,secret); // 签发token                  
                ctx.body = {
                    success:true,
                    token:token
                }
            }else{
                ctx.body = '密码错误'                
            }
            
        }
    })
}