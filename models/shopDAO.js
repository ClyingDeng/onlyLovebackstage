var DAO = require('./DAO')
var shopDAO = {
    getShopProduct: function(userId, callback) {
        DAO('', [userId], function(err, results) {
            console.log(results)
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    getShopMember: function( callback) {
        // console.log(userId)
        DAO('select member_user_Id,nickName,integral,member_grade,member_date,member_act_date from memberinfos,base_info where member_user_Id = base_info_Id ', function(err, results) {
            console.log(results)
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    getShopCharge: function(userId, callback) {
        DAO('', [userId], function(err, results) {
            console.log(results)
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    getShopProps: function(userId, callback) {
        DAO('', [userId], function(err, results) {
            console.log(results)
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    }
}
module.exports = shopDAO