import pify from 'promise.ify'

module.exports = function(router,body,connection){

    const selectCountSql = `select time,phoneNumber,listId from loan_list_count`
    const loanListSql = `select name,id from loan_list`
    const countByPhoneNumber = `select count(*) as clickNumber,phoneNumber from loan_list_count group by phoneNumber`
    const countByListId = `select count(*) as listNumber,listId from loan_list_count group by listId`
    const getNameListSql = `select phoneNumber,listId from loan_list_count
    `
    router.post('/admin/api/getcountdatabylist',body,async ctx => {

        let timeData = [];
        let pushTag = true;

        const selectCountResult = await pify(connection.query,connection)(selectCountSql)

        if(JSON.stringify(selectCountResult[0]) !== '[]'){

            const MiddleResult = selectCountResult[0].filter( (item,index) => {
                return  item.listId  == ctx.request.body.value
            });

            if(MiddleResult.length){

                timeData.push({time:MiddleResult[0].time,count:0})

                for (let i = 0; i < MiddleResult.length;i++){
                    pushTag = true
                    for (let j = 0; j < timeData.length;j++){

                        if(MiddleResult[i].time == timeData[j].time){

                            ++timeData[j].count
                            pushTag = false
                        }

                    }
                    if(pushTag){
                        timeData.push({time:MiddleResult[i].time,count:1})

                    }

                }
                ctx.body = timeData
            }else{
                ctx.body = []
            }
        }else{
            ctx.body = []
        }
    })
    router.post('/admin/api/getcountdatabyuser',body,async ctx => {

        let timeData = [];
        let pushTag = true;

        const selectCountResult = await pify(connection.query,connection)(selectCountSql)
        if(JSON.stringify(selectCountResult[0]) !== '[]'){
            let MiddleResult = selectCountResult[0].filter((item, index) => {
                return item.phoneNumber == ctx.request.body.phoneNumber
            });

            if (MiddleResult.length >= 1) {
  
                timeData.push({time: MiddleResult[0].time, listArr: []})

                for (let i = 0; i < MiddleResult.length; i++) {
                    pushTag = true
                    for (let j = 0; j < timeData.length; j++) {

                        if (MiddleResult[i].time == timeData[j].time) {
                            timeData[j].listArr.push(MiddleResult[i].listId)
                            pushTag = false
                        }

                    }
                    if (pushTag) {
                        timeData.push({time: MiddleResult[i].time, listArr: []})

                    }

                }

                ctx.body = timeData
            } else {
                ctx.body = "此人没有点击过任何东西"
            }
        }else{
            ctx.body = []
        }
        
    })
    
    router.post('/admin/api/getusercount',body, async ctx => {
        const selectCountPhoneNumberResult = await pify(connection.query,connection)(countByPhoneNumber)
        if(JSON.stringify(selectCountPhoneNumberResult[0]) !== '[]'){
            ctx.body = selectCountPhoneNumberResult[0]
        }else{
            ctx.body = []
        }            
        
    })
        
    router.post('/admin/api/getlistcount',body, async ctx => {
        const selectListIdResult = await pify(connection.query,connection)(countByListId)
        if(JSON.stringify(selectListIdResult[0]) !== '[]'){
            ctx.body = selectListIdResult[0]
        }else{
            ctx.body = []
        }            
        
    })
    router.post('/admin/api/getnamelist',body, async ctx => {

        const selectNameListResult = await pify(connection.query,connection)(getNameListSql)

        if(JSON.stringify(selectNameListResult[0]) !== '[]'){

           let MiddleResult =  selectNameListResult[0].filter(item => {
                return item.listId == ctx.request.body.listId
            });
            ctx.body = MiddleResult
        }else{
            ctx.body = []
        }            
        
    })
}
