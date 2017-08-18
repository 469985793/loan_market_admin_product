const multer = require('koa-multer')
const path = require('path')
const fs = require('fs')

var imgurl = '',changeImg = false;

var storage = multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname,'../../public/uploads'))
    },
    //修改文件名称
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
});

var upload = multer({ storage: storage });

module.exports = function(router,body,connection){

    router.post('/admin/api/delete',body, ctx => {
        if(ctx.request.header.authorization){
            connection.query(`select * from loan_list where id='${ctx.request.body.id}'`,(err,result) => {
                if(result.length){
                        deleteImg(result[0].icon)
    
                        //不让删除统计数据
                        // connection.query(`delete from loan_list_count where listId = ${ctx.request.body.id}`,(err,result) =>{
                        //     return result
                        // })
                         connection.query(`delete from loan_list where id='${ctx.request.body.id}'`,(err,result) => {
                             ctx.body="delete ok"
                         })
                }
            })
        }else{
            ctx.body = "请登陆"
        }


    });
    router.post('/upload', upload.single('files'), async (ctx, next) => {
         console.log(ctx.req.file)
        imgurl = ctx.req.file.filename
        changeImg = true
        ctx.body = {
            filename: ctx.req.file.filename//返回文件名
    }
 
    });
    router.post('/admin/api/getform',body,ctx => {
        connection.query(`select * from loan_list where id = ${ctx.request.body.id}`,function(err,result){

            connection.query(`select * from loan_list_tags`, function (tagErr,tagResult)  {

                let type =
                    ctx.request.body.type == "小额贷款" || ctx.request.body.type == 'small' ? 1 : ( ctx.request.body.type == "中额贷款" || ctx.request.body.type=="middle")? 2 : 3;

                let tag = ctx.request.body.tag

                for(let i = 0; i < tagResult.length; i++){
                    for (let j = 0; j < tag.length; j++){
                        if(tag[j] == tagResult[i].tag){
                            tag[j] = 'T' + tagResult[i].id
                        }
                    }
                }
                for (let i = 1; i < tag.length;i++){
                    tag[0] += tag[i]
                }
                // console.log('this body is',ctx.request.body)
                // console.log('this select queue is',result[0].queue)

                // console.log('更改后的type',type)
                // console.log('原来的type',result[0].type)
                // if(type !== result[0].type){
                //     connection.query(`select * from loan_list where type="${type}" where queue >= "${ctx.request.body.queue}"`,(a,b)=>{
                //         console.log(a,b)
                //     })
                // }
                
                //更新被交换项的queue
                // connection.query(
                //     `update loan_list
                //     set queue="${result[0].queue}" 
                //     where
                //     queue = "${ctx.request.body.queue}"
                //     and type="${type}"`
                // )

                if(result.length){
                     let upDateQuery =changeImg? `
                     update loan_list set
                      name="${ctx.request.body.name}",
                      time="${ctx.request.body.time}",
                      money="${ctx.request.body.money}",
                      type="${type}",
                      href="${ctx.request.body.url}",
                      tag="${tag[0]}",
                      icon="${imgurl}",
                      queue = "${ctx.request.body.queue}"
                      where id="${ctx.request.body.id}"
                      `:
                         `update loan_list set
                    name="${ctx.request.body.name}",
                        time="${ctx.request.body.time}",
                        money="${ctx.request.body.money}",
                        type="${type}",
                        href="${ctx.request.body.url}",
                        tag="${tag[0]}",
                        queue = "${ctx.request.body.queue}"
                    where id="${ctx.request.body.id}"
                        `;
                     changeImg = false

                    connection.query(upDateQuery,function(err,result){
                        console.log(err)
                    })
                }else{

                    let insertQuery =
                        `insert into loan_list( name,time,money,type,href,tag,icon) values(
                       '${ctx.request.body.name}',
                       '${ctx.request.body.time}',
                       '${ctx.request.body.money}',
                       ${type},'${ctx.request.body.url}','${tag[0]}','${imgurl}')`;


                    connection.query(
                        insertQuery,
                        function(err,result){

                        })
                }
            })

        })
        ctx.body = 'it works!!'

    })

    function deleteImg(imgName){
    
        fs.readFile(path.join(__dirname,'../../public/uploads',imgName),(err,data) => {
            if(!err){
                fs.unlink(path.join(__dirname,'../../public/uploads',imgName) ,err => {
                    if(err){
                        return err
                    }else{
                        console.log('已删除文件')
                        return 1
                    }
                })
            }
        })
    }
}