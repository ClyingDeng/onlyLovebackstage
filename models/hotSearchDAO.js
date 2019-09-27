var DAO = require('./DAO')
var hotSearchDAO = {
    //查询自己的动态
    hotSearch: function (userId, callback) {
        DAO('SELECT (@rowNO := @rowNo+1) AS rowno,a.* FROM (SELECT * FROM condhot where con_user_Id = ?) a,(SELECT @rowNO :=0) b ', [userId], function (err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    //发布动态
    publish: function (conuser, callback) {
        // console.log(conuser)
        DAO('insert into conditions (con_user_Id,con_words,con_time,con_pic_1,con_pic_2,con_pic_3,con_pic_4) values (?,?,?,?,?,?,?)', [conuser.conuserId, conuser.conwords, conuser.conTime, conuser.conpic1, conuser.conpic2, conuser.conpic3, conuser.conpic4], function (err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    //获取动态的ID
    getconId: function (conuser, callback) {
        DAO('select con_id from conditions where con_user_Id = ? and con_time = ?', [conuser.conuserId, conuser.conTime], function (err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    //添加点赞记录
    insertapprove: function (results1, conuser, callback) {
        DAO('insert into approve (condition_Id,user_Id) values (?,?)', [results1[0].con_id, conuser.conuserId], function (err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    //删除动态
    deleteHotSearch: function (conId, callback) {
        // console.log(conId)
        DAO('delete conditions,approve from conditions,approve where conditions.con_Id = approve.condition_Id and conditions.con_Id = ?', [conId], function (err, results) {
            if (err) {
                // console.log(err)
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    }
}
module.exports = hotSearchDAO