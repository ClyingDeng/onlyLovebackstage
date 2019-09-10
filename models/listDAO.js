var DAO = require('./DAO')
var listDAO = {
    crazy: function(callback) {
        DAO('select user_Id from sweet order by sweet_score', null, function(err, results) {
        if (err) {
            callback(err, null)
        } else {
            callback(null, results)
        }
        })
    },
    charm: function(callback) {
        DAO('select obj_Id from sweet order by sweet_score', null, function(err, results) {
        if (err) {
            callback(err, null)
        } else {
            callback(null, results)
        }
        })
    },
    sweetChart: function(callback) {
        DAO('select user_Id,obj_Id from sweet order by sweet_score', null, function(err, results) {
        if (err) {
            callback(err, null)
        } else {
            callback(null, results)
        }
        })
    }
}
module.exports = listDAO