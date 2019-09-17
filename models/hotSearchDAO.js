var DAO = require('./DAO')
var hotSearchDAO = {
    hotSearch: function(userId,callback) {
        DAO('SELECT (@rowNO := @rowNo+1) AS rowno,a.* FROM (SELECT * FROM condhot where con_user_Id = ?) a,(SELECT @rowNO :=0) b ', [userId], function(err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    publish: function(conuser,callback) {
        // console.log(conuser)
        DAO('insert into conditions (con_user_Id,con_words,con_time) values (?,?,?)', [conuser.conuserId, conuser.conwords, conuser.conTime], function(err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    getconId:function(conuser,callback) {
        DAO('select con_id from conditions where con_user_Id = ? and con_time = ?',[conuser.conuserId,conuser.conTime], function(err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    insertapprove: function(results1,conuser,callback) {
        DAO('insert into approve (condition_Id,user_Id) values (?,?)', [results1[0].con_id,conuser.conuserId], function(err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    }
}
module.exports = hotSearchDAO