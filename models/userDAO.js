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
            DAO('select * from stuinfos',null,function(err,results){
                if(err){
                    callback(err,null)
                }else{
                    callback(null,results)
                }
            })
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
        getUserByTel:function(telephone,callback){
            DAO('select * from base_info where telephone = ?',[telephone],function(err,results){
                if(err){
                    callback(err,null)
                }else{
                    callback(null,results)
                }
            })
        },
        // 注册
        register: function(user, callback) {
            DAO('insert into base_info(telephone,password) values(?,?)',[user.telephone,user.password],function(err,results){
                if(err){
                    callback(err,null)
                }else{
                    callback(null,results)
                }
            })
        },
        identification: function(user, callback) {
            DAO('',[],function(err,results){
                if(err){
                    callback(err,null)
                }else{
                    callback(null,results)
                }
            })
        },
        updateHeadPic: function(user, callback) {
            DAO('',[],function(err,results){
                if(err){
                    callback(err,null)
                }else{
                    callback(null,results)
                }
            })
        },
        updatePassword: function(user, callback) {
            DAO('',[],function(err,results){
                if(err){
                    callback(err,null)
                }else{
                    callback(null,results)
                }
            })
        },
        forgetPassword: function(user, callback) {
            DAO('',[],function(err,results){
                if(err){
                    callback(err,null)
                }else{
                    callback(null,results)
                }
            })
        },
        Vcode: function(user, callback) {
            DAO('',[],function(err,results){
                if(err){
                    callback(err,null)
                }else{
                    callback(null,results)
                }
            })
        },
        updateInfo: function(user, callback) {
            DAO('',[],function(err,results){
                if(err){
                    callback(err,null)
                }else{
                    callback(null,results)
                }
            })
        },
        from_Presents: function(user, callback) {
            DAO('',[],function(err,results){
                if(err){
                    callback(err,null)
                }else{
                    callback(null,results)
                }
            })
        },
        to_Presents: function(user, callback) {
            DAO('',[],function(err,results){
                if(err){
                    callback(err,null)
                }else{
                    callback(null,results)
                }
            })
        },
        userInfo: function(user, callback) {
            DAO('',[],function(err,results){
                if(err){
                    callback(err,null)
                }else{
                    callback(null,results)
                }
            })
        }

    }
    module.exports = userDAO