var searchDAO = require('../models/searchDAO')
var formidable = require('formidable')
var path = require('path')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
var DAO = require('../models/DAO')
var searchController = {
    getSearch: function(req, res) {
        var uId = req.user[0].base_info_Id
        console.log(uId)
        DAO('select member_grade from memberinfos where member_user_Id = ?', [uId], function(err, results) {
            if (err) {
                res.json({ code: 500, msg: '搜索查询失败！' })
            } else {
                console.log(results)
                //不是会员
                if(!results.length){
                    res.json({code:200,data:results,msg:'非常抱歉，您不是会员！'})
                }else{

                    console.log(results[0].member_grade)
                    var grade = results[0].member_grade
                    console.log('会员等级：' + grade)
                    if (grade == 0 || grade == null) {
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
                    } else if (1 <= grade && grade <= 3) {
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
                    } else {
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

            }
        })
    }
}
module.exports = searchController