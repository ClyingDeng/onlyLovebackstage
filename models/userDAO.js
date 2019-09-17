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
    },
    // 更改头像
    upload: function(user, callback) {
        console.log(user)
        DAO('update base_info set headPic = ? where base_info_Id = ?',[user.file,user.userId],function(err,results){
            if(err){
                callback(err,null)
            }else{
                callback(null,results)
            }
        })
    },
    // 修改密码
    updatePassword: function(user, callback) {
        console.log(user)
        DAO('update base_info set pwd = ? WHERE base_info_id = ?',[user.pwd,user.userId],function(err,results){
            if(err){
                callback(err,null)
            }else{
                callback(null,results)
            }
        })
    },
 //认证查询
 identification: function(userId, callback) {
    console.log(userId)
    DAO('select use_status from base_info WHERE base_info_id = ?',[userId],function(err,results){
        if(err){
            callback(err,null)
        }else{
            callback(null,results)
        }
    })
},
//认证插入
identifications: function(user, callback) {
    console.log(user)
    DAO('update base_info set use_status = 1 where base_info_id = ?',[user.userId,user.use_status],function(err,results){
        if(err){
            callback(err,null)
        }else{
            callback(null,results)
        }
    })
},
}
module.exports = userDAO