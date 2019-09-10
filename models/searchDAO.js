var DAO = require('./DAO')
var search = {
    getSearchComm: function(callback) {
        DAO('', [userId], function(err, results) {
            console.log(results)
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    getSearchSenior: function(callback) {

    },
    getSearchMaster: function(callback) {

    }
}