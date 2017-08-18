import pify from 'promise.ify'

module.exports = function (router,body,connection){

        router.get('/admin/api/list',body,async ctx => {

            if(ctx.request.header.authorization){

            
            const selectListSql = `select * from loan_list order by queue`
            const selectTagSql = `select * from loan_list_tags`

            const selectListResult = await pify(connection.query, connection)(selectListSql)
            const selectTagResult = await pify(connection.query,connection)(selectTagSql)
            
           // console.log(selectListResult[0])
          //  console.log(selectTagResult[0])
            selectListResult[0].map((item,index) => {
                //把数据库存的tags转换成数组

                if(!Array.isArray(item.tag)){
                    item.tag =  item.tag.split('T');
                    item.tag.shift()
                }

                //把数组对应id转换成对应字符串
                for(let i = 0; i < item.tag.length;i++){
                    for(let j = 0; j < selectTagResult[0].length;j++){

                        if(item.tag[i] == selectTagResult[0][j].id){
                            item.tag[i] = selectTagResult[0][j].tag;
                        }
                    }
                }
            })

            ctx.body = selectListResult[0]
        }else{
            ctx.body = "请登陆"
        }
        })

        router.post('/admin/api/toggle',body ,async ctx => {

            if(ctx.request.header.authorization){
          //  const selectListSql = `select toggle from loan_list where id=${ctx.request.body.id}`
        //    const selectListResult = await pify(connection.query, connection)(selectListSql)
        const toggleSql = `update loan_list set toggle=not(toggle) where id=${ctx.request.body.id} `
        ctx.body= await pify(connection.query, connection)(toggleSql)

       // console.log(selectListResult[0].toggle)
      //  ctx.body = await pify(connection.query, connection)(toggleSql)

            }else {
                ctx.body = "请登陆"
            }

        })

    }