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
    },
    mycrazy: function(userId,callback){
        DAO('SELECT rowno,用户ID FROM(SELECT (@rowNO := @rowNo+1) AS rowno,a.* FROM (SELECT * FROM crazyRank) a ,(SELECT @rowNO :=0) b ) asd WHERE asd.用户ID= ? ',[userId],function(err,results){
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    mycharm: function(userId,callback){
        DAO('SELECT rowno,用户ID FROM(SELECT (@rowNO := @rowNo+1) AS rowno,a.* FROM (SELECT * FROM beautRank) a ,(SELECT @rowNO :=0) b ) asd WHERE asd.用户ID= ? ',[userId],function(err,results){
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    mysweetChart: function(userId,callback){
        DAO('SELECT rowno FROM(SELECT (@rowNO := @rowNo+1) AS rowno,a.* FROM (SELECT * FROM sweetRank) a ,(SELECT @rowNO :=0) b ) asd WHERE (asd.情侣1= ? || asd.情侣2= ?)',[userId,userId],function(err,results){
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
}
module.exports = listDAO