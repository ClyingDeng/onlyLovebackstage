var searchDAO = require('../models/searchDAO')
var formidable = require('formidable')
var path = require('path')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
var DAO = require('../models/DAO')
var searchController = {
    getSearch: function(req, res) {
            var uId = req.user.base_info_Id
            var grade = DAO('select member_grade from memberinfos where member_user_Id = ?', [uId], function(err, results) {
                // console.log(results)
                if (err) {
                    return false
                } else {
                    return results
                }
            })
            console.log('会员等级：' + grade)
            if (grade = 0 || grade == null) {
                searchDAO.getSearchComm(function(err, results) {
                    if (err) {
                        res.json({ code: 500, msg: '搜索查询失败！' })
                    } else {
                        if (results.length > 0) {
                            res.json({ code: 200, data: results, msg: '搜索查询成功！' })
                        } else {
                            res.json({ code: 200, data: results, msg: '查无此人！' })

                        }
                    }
                })
            } else if (grade <= 3) {
                searchDAO.getSearchSenior(function(err, results) {
                    if (err) {
                        res.json({ code: 500, msg: '搜索查询失败！' })
                    } else {
                        if (results.length > 0) {
                            res.json({ code: 200, data: results, msg: '搜索查询成功！' })
                        } else {
                            res.json({ code: 200, data: results, msg: '查无此人！' })

                        }
                    }
                })
            } else if (grade <= 6) {
                searchDAO.getSearchMaster(function(err, results) {
                    if (err) {
                        res.json({ code: 500, msg: '搜索查询失败！' })
                    } else {
                        if (results.length > 0) {
                            res.json({ code: 200, data: results, msg: '搜索查询成功！' })
                        } else {
                            res.json({ code: 200, data: results, msg: '查无此人！' })

                        }
                    }
                })
            }
        }
        // seniorUser: function(req, res) {
        //     var uId = req.user.base_info_Id
        //     searchDAO.getSearchSenior(uId, function(err, results) {
        //         if (err) {
        //             res.json({ code: 500, msg: '搜索查询失败！' })
        //         } else {
        //             if (results.length > 0) {
        //                 res.json({ code: 200, data: results, msg: '搜索查询成功！' })
        //             } else {
        //                 res.json({ code: 200, data: results, msg: '查无此人！' })

    //             }
    //         }
    //     })
    // },
    // masterUser: function(req, res) {
    //     var uId = req.user.base_info_Id
    //     searchDAO.getSearchMaster(uId, function(err, results) {
    //         if (err) {
    //             res.json({ code: 500, msg: '搜索查询失败！' })
    //         } else {
    //             if (results.length > 0) {
    //                 res.json({ code: 200, data: results, msg: '搜索查询成功！' })
    //             } else {
    //                 res.json({ code: 200, data: results, msg: '查无此人！' })

    //             }
    //         }
    //     })
    // }
}
module.exports = searchController