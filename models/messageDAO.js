var DAO = require('./DAO')
var messageDAO = {
    friendList: function(userId, callback) {
        DAO('select * from friends,base_info where base_info_Id = ?', [userId], function(err, results) {
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