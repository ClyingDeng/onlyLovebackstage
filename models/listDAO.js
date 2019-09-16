var DAO = require('./DAO')
var listDAO = {
    crazy: function(callback) {
        DAO('SELECT (@rowNO := @rowNo+1) AS rowno,a.* FROM (SELECT * FROM crazyRank) a,(SELECT @rowNO :=0) b ', null, function(err, results) {
        if (err) {
            callback(err, null)
        } else {
            callback(null, results)
        }
        })
    },
    charm: function(callback) {
        DAO('SELECT (@rowNO := @rowNo+1) AS rowno,a.* FROM (SELECT * FROM beautRank) a,(SELECT @rowNO :=0) b ', null, function(err, results) {
        if (err) {
            callback(err, null)
        } else {
            callback(null, results)
        }
        })
    },
    sweetChart: function(callback) {
        DAO('SELECT (@rowNO := @rowNo+1) AS rowno,a.* FROM (SELECT * FROM sweetRank) a,(SELECT @rowNO :=0) b ', null, function(err, results) {
        if (err) {
            callback(err, null)
        } else {
            callback(null, results)
        }
        })
    }
}
module.exports = listDAO