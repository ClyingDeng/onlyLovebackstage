var personalDAO = require('../models/personalDAO')
var formidable = require('formidable')
var path = require('path')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
var DAO = require('../models/DAO')
var personalController = {
    manyInfo: function(req, res) {
        // console.log('personal连接请求：')
        // console.log(req.user)
        var userId = req.user[0].base_info_Id
        console.log('当前用户Id:' + userId)
            // console.log(req.user[0].base_info_Id)
        personalDAO.getPersonalManyInfo(userId, function(err, results) {
            if (err) {
                res.json({ code: 500, msg: '个人信息搜索查询失败！' })
            } else {
                if (results.length > 0) {
                    var manyInfo = {}
                    manyInfo = results
                        //会员等级
                    personalDAO.getGrade(userId, function(err, results1) {
                        if (err) {
                            res.json({ code: 500, msg: '个人信息搜索查询失败！' })
                        } else {
                            console.log('等级：')
                            console.log(results1)
                            if (results1[0] == 0 || results1[0] == null) {
                                manyInfo[0].grade = 0
                            } else {
                                manyInfo[0].grade = results1[0].member_grade
                            }
                            //关注数量
                            personalDAO.getMeAttention(userId, function(err, results2) {
                                if (err) {
                                    res.json({ code: 500, msg: '关注信息查询失败！' })
                                } else {
                                    // console.log('关注数量：')
                                    // console.log(results2[0].attNum)
                                    if (results2 == 0 || results2 == null) {
                                        results2 = 0
                                    }
                                    manyInfo[0].attentionNum = results2[0].attNum
                                        // console.log(manyInfo[0])
                                        //
                                    personalDAO.getConditionNum(userId, function(err, results3) {
                                        if (err) {
                                            res.json({ code: 500, msg: '关注信息查询失败！' })
                                        } else {
                                            if (results3 == 0 || results3 == null) {
                                                results3 = 0
                                                res.json({ code: 200, data: manyInfo, msg: '搜索查询成功，无动态！' })
                                            }
                                            manyInfo[0].conditionNum = results3[0].conNum
                                                //有动态显示动态
                                            personalDAO.getCondition(userId, function(err, results4) {
                                                if (err) {
                                                    res.json({ code: 500, msg: '显示动态失败！' })
                                                } else {
                                                    console.log('动态：')
                                                    console.log(results4)
                                                    if (!results4[0]) {
                                                        manyInfo[0].condition = 0
                                                    } else {
                                                        manyInfo[0].condition = results4
                                                    }
                                                    res.json({ code: 200, data: manyInfo, msg: '搜索查询成功！' })
                                                }
                                            })


                                        }
                                    })

                                }
                            })
                        }
                    })
                } else {
                    res.json({ code: 200, data: results, msg: '查无此人！' })

                }
            }
        })
    },
    otherPersonal: function(req, res) {
        var oId = req.params.uId
        console.log(req.user)
        var userId = req.user[0].base_info_Id
        console.log('他人主页编号：' + oId)
        console.log(userId)
        personalDAO.getSweet(oId, userId, function(err, results) {
            if (err) {
                res.json({ code: 500, msg: '搜索查询失败！' })
            } else {
                if (!results[0]) {
                    sweet = 0
                } else {
                    console.log(results[0].sweet_score)
                    var sweet = results[0].sweet_score
                }
                if (sweet == 0) {
                    //亲密度为0
                    personalDAO.getPersonalManyInfo(oId, function(err, results1) {
                        if (err) {
                            res.json({ code: 500, msg: '搜索查询失败！' })
                        } else {
                            if (results1.length > 0) {

                                res.json({ code: 200, data: results1, msg: '他人主页查询成功！' })

                            } else {
                                res.json({ code: 200, data: results, msg: '查无此人！' })

                            }
                        }
                    })
                } else if (sweet <= 10) {
                    personalDAO.getFirstSweet(oId, function(err, results1) {
                        if (err) {
                            res.json({ code: 500, msg: '搜索查询失败！' })
                        } else {
                            if (results1.length > 0) {

                                res.json({ code: 200, data: results1, msg: '他人主页查询成功！' })

                            } else {
                                res.json({ code: 200, data: results, msg: '查无此人！' })

                            }
                        }
                    })
                } else {
                    personalDAO.getSecondSweet(oId, function(err, results1) {
                        if (err) {
                            res.json({ code: 500, msg: '搜索查询失败！' })
                        } else {
                            if (results1.length > 0) {

                                res.json({ code: 200, data: results1, msg: '他人主页查询成功！' })

                            } else {
                                res.json({ code: 200, data: results, msg: '查无此人！' })

                            }
                        }
                    })
                }
            }
        })


    },
    addFriend: function(req, res) {
        personalDAO.postPersonaladdFriend(function(err, results) {
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
    },
    addGift: function(req, res) {
        personalDAO.postPersonalAddGift(function(err, results) {
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
    },
    sweet: function(req, res) {
        personalDAO.postPersonalSweet(function(err, results) {
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
module.exports = personalController