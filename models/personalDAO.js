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
    //三级
    getThirdSweet: function(userId, callback) {
        console.log(userId)
        DAO('select base_info_Id,nickName,headPic,sex,love_description,blight,hobby,height,weight,occupation,birthday,choose_object,body_status from base_info where base_info_Id = ?', [userId], function(err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    //四级
    getFourthSweet: function(userId, callback) {
        console.log(userId)
        DAO('select base_info_Id,nickName,headPic,sex,love_description,blight,hobby,height,weight,occupation,birthday,choose_object,body_status,education,marriage,salary from base_info where base_info_Id = ?', [userId], function(err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    //五级
    getFifthSweet: function(userId, callback) {
        console.log(userId)
        DAO('select base_info_Id,nickName,headPic,sex,love_description,blight,hobby,height,weight,occupation,birthday,choose_object,body_status,education,marriage,salary,province,city,love_affair from base_info where base_info_Id = ?', [userId], function(err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    //六级
    getSixthSweet: function(userId, callback) {
        console.log(userId)
        DAO('select base_info_Id,nickName,headPic,sex,love_description,blight,hobby,height,weight,occupation,birthday,choose_object,body_status,education,marriage,salary,province,city,love_affair,car,house,telephone from base_info where base_info_Id = ?', [userId], function(err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },

    postPersonaladdFriend: function(oId, userId, callback) {

        DAO('insert into friends(user_Id,fri_Id,fri_classified,fri_status) values (?,?,0,0)', [userId, oId], function(err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    //同意加好友
    agreeFriend: function(oId, userId, callback) {
        DAO('update friends set fri_status = 1 where user_Id = ? and fri_Id = ?', [oId, userId], function(err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    postPersonalAddGift: function(callback) {

    },
    postPersonalSweet: function(callback) {

    },
    //点赞动态是否存在
    isAppCon: function(conId) {
        return new Promise((resolve, reject) => {
            DAO('select condition_Id from approve where condition_Id = ?', [conId], function(err, results) {
                // console.log(results)
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            })
        })
    },
    //查看之前有没有点过赞
    appCon: function(conId, userId) {
        return new Promise((resolve, reject) => {
            DAO('select condition_Id,user_Id,approve_status from approve where condition_Id = ? and user_Id = ?', [conId, userId], function(err, results) {
                // console.log(results)
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            })
        })
    },
    //第一次点赞
    approve: function(conId, userId) {
        return new Promise((resolve, reject) => {
            DAO('insert into approve(condition_Id,user_Id,approve_status) values (?,?,1);', [conId, userId], function(err, results) {
                console.log(results)
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            })
        })
    },
    //取消点赞
    disApprove: function(conId, userId) {
        return new Promise((resolve, reject) => {
            DAO('update approve set approve_status = 0 where condition_Id = ? and user_Id = ?', [conId, userId], function(err, results) {
                // console.log(results)
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            })
        })
    },
    //不是第一次点赞
    AgainApprove: function(conId, userId) {
        return new Promise((resolve, reject) => {
            DAO('update approve set approve_status = 1 where condition_Id = ? and user_Id = ?', [conId, userId], function(err, results) {
                // console.log(results)
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            })
        })
    },
    //获取点赞数
    getApprove: function(conId) {
        return new Promise((resolve, reject) => {
            DAO('select condition_Id,approveNum from approves where condition_Id = ?', [conId], function(err, results) {
                // console.log(results)
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            })
        })
    },
    seeNum: function(conId) {
        return new Promise((resolve, reject) => {
            DAO('select see,con_user_Id from conditions where con_Id = ?', [conId], function(err, results) {
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            })
        })
    },
    updateSee: function(conId) {
        return new Promise((resolve, reject) => {
            DAO('update conditions set see = see + 1 where con_Id = ?', [conId], function(err, results) {
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            })
        })
    }


}
module.exports = personalDAO;