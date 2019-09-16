var DAO = require('./DAO')
var listDAO = {
    crazy: function(callback) {
        DAO('select * from crazyrank', null, function(err, results) {
        if (err) {
            callback(err, null)
        } else {
            callback(null, results)
        }
        })
    },
    charm: function(callback) {
        DAO('select * from crazyrank', null, function(err, results) {
        if (err) {
            callback(err, null)
        } else {
            callback(null, results)
        }
        })
    },
    sweetChart: function(callback) {
        DAO('select * from sweetRank', null, function(err, results) {
        if (err) {
            callback(err, null)
        } else {
            callback(null, results)
        }
        })
    }
}
module.exports = listDAO