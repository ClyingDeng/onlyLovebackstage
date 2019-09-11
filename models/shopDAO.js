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
    getShopMember: function(userId, callback) {
        DAO('', [userId], function(err, results) {
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