import  officegen from 'officegen'
import fs from 'fs'
import path from 'path'
import pify from 'promise.ify'

 module.exports = function(router,body,connection) {

         router.post('/admin/api/xlsx', body, async ctx => {

            if(ctx.request.header.authorization){
                const xlsx = officegen('xlsx')
                const exportConf = ctx.request.body.data;
                const selectUserSql = `select * from user_base_info`
                
                const time = {
                    Year:exportConf.Year,
                    Month:exportConf.Month,
                    Day:exportConf.Day
                };
   
              //  console.log(time)
               const result = await pify(connection.query, connection)(selectUserSql)
   
               const dateFilter = result[0].filter(item => {
   
                   const filterTime = exportConf.Type == 1?new Date(item.update_time):new Date(item.create_time);
                   
                   return (time.Year[0]<= filterTime.getFullYear() && time.Year[1] >= filterTime.getFullYear())&& (time.Month[0] <= (filterTime.getMonth()+1) && time.Month[1] >= (filterTime.getMonth()+1) )&& (time.Day[0] <= filterTime.getDate()&& time.Day[1] >= filterTime.getDate()) 
               })
               
             //  console.log(dateFilter)
              
               //生成excel
   
                xlsx.on('finalize', function (written) {
                    console.log('Finish to create an Excel file. Total bytes created: ' + written + '\n');
                });
   
                xlsx.on('error', function (err) {
                    console.log(err);
                });
   
                const sheet = xlsx.makeNewSheet();
                sheet.name = `${time.Year[0]}年${time.Month[0]}月${time.Day[0]}日 - ${time.Year[1]}年${time.Month[1]}月${time.Day[1]}日${exportConf.Type == 1?'最后一次':'首次'}登录用户信息列表`;
                   sheet.data[0] = []
                   sheet.data[0][0] = '姓名'
                   sheet.data[0][1] = '手机号'
                   sheet.data[0][2] = '联系人'
                   sheet.data[0][3] = '公司地址'
                   sheet.data[0][4] = '家庭住址'
                   sheet.data[0][5] = '登录时间'
   
                for(let i = 0; i < dateFilter.length;i++){
                    sheet.data[i+1] = [];
   
                    sheet.data[i+1][0] = dateFilter[i].userName;
                    sheet.data[i+1][1] = dateFilter[i].phoneNumber;
                    sheet.data[i+1][2] = dateFilter[i].personName;
                    sheet.data[i+1][3] = dateFilter[i].work_address;
                    sheet.data[i+1][4] = dateFilter[i].home_address;
                    sheet.data[i+1][5] = (exportConf.Type == 1?dateFilter[i].update_time:dateFilter[i].create_time).toString();
                }
   
                 var out = fs.createWriteStream(path.join(__dirname,'../../public/download/out.xlsx'));
   
                out.on('error', function (err) {
                    console.log(err);
                });
   
                xlsx.generate(out);
                ctx.body = "export success"
   
            }else{
                ctx.body = '请登陆'
            }
         })
 }


