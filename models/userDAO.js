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
        register: function(user, callback) {
            //     DAO('insert into users(userTel,userPwd) values(?,?)', [user.userTel, user.userPwd], function(err, results) {
            //         if (err) {
            //             callback(err, null)
            //         } else {
            //             callback(null, results)
            //         }
            //     })
            // }
        }
        module.exports = userDAO