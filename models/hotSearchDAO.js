var DAO = require('./DAO')
var hotSearchDAO = {
    hotSearch: function(callback) {
        DAO('select user_Id from sweet order by sweet_score', null, function(err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    publish: function(callback) {
        DAO('select obj_Id from sweet order by sweet_score', null, function(err, results) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    }
}
module.exports = hotSearchDAO