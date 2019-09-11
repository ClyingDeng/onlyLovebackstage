var DAO = require('./DAO')
    //针对用户数据表操作的模块对象
var userDAO = {
    getAllUsers: function(callback) {
        // DAO('select * from stu', null, function(err, results) {
        // if (err) {
        //     callback(err, null)
        // } else {
        //     callback(null, results)
        // }
        // })
    },
    getUserById: function(userId, callback) {
        // DAO('select * from stu where stuNo = ?', [userId], function(err, results) {
        //     console.log(results)
        //     if (err) {
        //         callback(err, null)
        //     } else {
        //         callback(null, results)
        //     }
        // })
    },
    changeName: function(userId, userName, callback) {

    },
    upload: function(user, callback) {

    },
    // 登录
    login: function(user, callback) {
        console.log(user)
        DAO('select * from base_info where telephone = ? ', [user.telephone], function(err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    // 注册
    register: function(user, callback) {
        DAO('insert into base_info(telephone,pwd) values (?,?)', [user.telephone, user.password], function(err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    }
}
module.exports = userDAO