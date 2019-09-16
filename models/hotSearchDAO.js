var DAO = require('./DAO')
var hotSearchDAO = {
    hotSearch: function(callback) {
        DAO('select * from cond', null, function(err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    publish: function(conuser,callback) {
        // console.log(conuser)
        DAO('insert into conditions (con_user_Id,con_words,con_pic_1) value (?,?,?)', [conuser.conuserId, conuser.conwords, conuser.conuserPic], function(err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    }
}
module.exports = hotSearchDAO