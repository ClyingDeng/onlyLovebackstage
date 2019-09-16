var DAO = require('./DAO')
var personalDAO = {
    //显示头像/昵称/性别/爱情宣言
    getPersonalManyInfo: function(userId, callback) {
        console.log(userId)
        DAO('select base_info_Id,nickName,headPic,sex,love_description from base_info where base_info_Id = ?', [userId], function(err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    //会员等级
    getGrade: function(userId, callback) {
        DAO('select member_grade from memberinfos where member_user_Id = ?', [userId], function(err, results) {
            console.log('结果呢：' + results)
            if (err) {
                console.log('无法获取会员等级')
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    //显示我关注的数量
    getMeAttention: function(userId, callback) {
        DAO('select count(1) attNum from attention where user_Id = ?', [userId], function(err, results) {
            if (err) {
                console.log('无法获取关注数量')
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    //动态数
    getConditionNum: function(userId, callback) {
        DAO('select count(1) conNum from conditions where con_user_Id = ?', [userId], function(err, results) {
            if (err) {
                console.log('无法获取动态数')
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    //获取动态
    getCondition: function(userId, callback) {
        DAO('select * from con_app where con_user_Id = ?', [userId], function(err, results) {
            // console.log(results)
            if (err) {
                console.log('无法获取动态')
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    //主用户和次用户亲密度
    getSweet: function(oId, userId, callback) {
        DAO('select sweet_score from sweet where user_Id = ? and obj_Id = ?', [userId, oId], function(err, results) {
            console.log(results)
            if (err) {
                console.log('无法获取动态')
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    //亲密度一级解锁
    getFirstSweet: function(userId, callback) {
        console.log(userId)
        DAO('select base_info_Id,nickName,headPic,sex,love_description,blight from base_info where base_info_Id = ?', [userId], function(err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    //二级
    getSecondSweet: function(userId, callback) {
        console.log(userId)
        DAO('select base_info_Id,nickName,headPic,sex,love_description,blight,hobby,height,weight,occupation from base_info where base_info_Id = ?', [userId], function(err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },

    postPersonaladdFriend: function(callback) {

    },
    postPersonalAddGift: function(callback) {

    },
    postPersonalSweet: function(callback) {

    },

    A: function() {

    }



}
module.exports = personalDAO;