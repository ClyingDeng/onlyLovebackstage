var DAO = require('./DAO')
//针对用户数据表操作的模块对象
var userDAO = {
    changeName: function (userId, userName, callback) {

    },
    // 登录
    login: function (user, callback) {
        console.log(user)
        DAO('select * from base_info where telephone = ? ', [user.telephone], function (err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    // 注册
    register: function (user, callback) {
        DAO('insert into base_info(telephone,pwd) values (?,?)', [user.telephone, user.password], function (err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    // 修改密码
    updatePassword: function (user, callback) {
        console.log(user)
        DAO('update base_info set pwd = ? WHERE base_info_id = ?', [user.pwd, user.userId], function (err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    // 获取密码
    getPassword: function (userId, callback) {
        DAO('select pwd from base_info WHERE base_info_id = ?', [userId], function (err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    // 上传头像
    upload: function (user, callback) {
        console.log(user)
        DAO('update base_info set headPic = ? where base_info_Id = ?', [user.file, user.userId], function (err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    // 修改个人信息
    updateInfo: function (user, callback) {
        // console.log('啊哈哈哈哈' +results)

        DAO('update base_info set nickName = ?,age = ? where base_info_Id= ?', [user.nickName, user.age, user.userId], function (err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    //用户其他信息
    userInfo_member: function (userId, callback) {

        DAO('SELECT member_grade from memberinfos,base_info WHERE member_user_Id = base_info_Id and base_info_Id =?', [userId], function (err, results) {
            console.log(results)
            if (err) {
                console.log('无法获取用户会员等级')
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    //送出礼物搜索
    from_Presents: function (userId, callback) {
        console.log(userId)
        DAO('SELECT  gift.Id,base_info_id ,gift,prop_Name,nickName,sum(giftNum),prop_pic,have_Time from base_info,gift,have_props,props where from_Id=base_info_Id and prop_Id=gift and owners=from_Id and to_id = ? GROUP BY gift', [userId], function (err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    //送出礼物
    from_Present: function (userId, callback) {
        console.log(userId)
        DAO('SELECT gift.Id,base_info_id ,to_id,gift,prop_Name,nickName,giftNum,prop_pic,have_Time from base_info,gift,have_props,props where from_Id=base_info_Id and prop_Id=gift and owners=from_Id and base_info_id = from_Id and from_id = ?  ', [userId], function (err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    //收到礼物搜索
    to_Presents: function (fromId, toId, callback) {
        // console.log(userId)
        DAO('SELECT gift.Id,base_info_Id,gift,prop_Name,nickName,SUM(giftNum),prop_pic,have_Time from base_info,gift,have_props,props where to_Id=base_info_Id and prop_Id=gift and owners=from_Id and from_id=? and to_id = ?', [fromId, toId], function (err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    //收到礼物
    to_Present: function (userId, callback) {
        // console.log(userId)
        DAO('SELECT gift.Id,base_info_Id,from_id,gift,prop_Name,nickName,giftNum,prop_pic,have_Time from base_info,gift,have_props,props where to_Id=base_info_Id and prop_Id=gift and owners=from_Id   and to_id = ?', [userId], function (err, results) {
            console.log(results)
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },

}
module.exports = userDAO