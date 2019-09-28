var DAO = require('./DAO')
var messageDAO = {
    friendList: function(userId, callback) {
        DAO('select fri_Id,user_Id from friends where (user_Id = 20003 or fri_Id = 20003)and fri_status = 1', [userId, userId], function(err, results) {
            // console.log(results)
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    friends: function(userId, callback) {
        DAO('call pro_friends(?,0);', [userId], function(err, results) {
            // console.log(results)
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    attFriends: function(userId, callback) {
        DAO('call pro_friends(?,1);', [userId], function(err, results) {
            // console.log(results)
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    blackFriends: function(userId, callback) {
        DAO('call pro_friends(?,2);', [userId], function(err, results) {
            // console.log(results)
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    attention: function(telephone, callback) {
        DAO('select nickName,sex,headPic from base_info,attention where base_info.base_info_Id = attention.att_Id and telephone = ?', [telephone], function(err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    messageList: function(userId, callback) {
        DAO('select * from message,base_info where base_info_Id = ?', [userId], function(err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    systemMessage: function(userId, callback) {
        DAO('select * from message,base_info where base_info_Id = ?', [userId], function(err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    }

}
module.exports = messageDAO