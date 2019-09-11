var DAO = require('./DAO')
var searchDAO = {
    getSearchComm: function(callback) {
        DAO('select * from commUser', function(err, results) {
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
module.exports = searchDAO