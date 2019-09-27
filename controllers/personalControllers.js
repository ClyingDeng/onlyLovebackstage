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
                                                    console.log(err)
                                                    res.json({ code: 500, msg: '显示动态失败！' })
                                                } else {
                                                    console.log('动态：')
                                                    console.log(results4)
                                                    if (!results4[0]) {
                                                        manyInfo[0].condition = null
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
                if (sweet < 10) {
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
                } else if (sweet < 20) {
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
                } else if (sweet < 50) {
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
                } else if (sweet < 99) {
                    personalDAO.getThirdSweet(oId, function(err, results1) {
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
                } else if (sweet < 199) {
                    personalDAO.getFourthSweet(oId, function(err, results1) {
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
                } else if (sweet <= 299) {
                    personalDAO.getFifthSweet(oId, function(err, results1) {
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
                    personalDAO.getSixthSweet(oId, function(err, results1) {
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

        var oId = req.params.oId
        var userId = req.user[0].base_info_Id
        console.log('对方账号：' + oId)
        console.log('我自己的账号：' + userId)
        personalDAO.postPersonaladdFriend(oId, userId, function(err, results) {
            if (err) {
                res.json({ code: 500, msg: '搜索查询失败！' })
            } else {
                // console.log(results)
                if (results.affectedRows > 0) {
                    res.json({ code: 200, affectedRows: results.affectedRows, msg: '加好友请求发送成功！' })
                } else {
                    res.json({ code: 200, affectedRows: results.affectedRows, msg: '加好友请求发送失败！' })
                }
            }
        })
    },
    agreeFriend: function(req, res) {
        var oId = req.params.oId
        var userId = req.user[0].base_info_Id
        console.log('对方账号：' + oId)
        console.log('我自己的账号：' + userId)
            //无好友请求
        DAO('select fri_status from friends where user_Id = ? and fri_Id = ? ', [oId, userId], function(err, results) {
            if (err) {
                res.json({ code: 500, msg: '搜索查询失败！' })
            } else {
                // console.log(results)
                if (results) {
                    if (results[0].fri_status == 0) {
                        //有好友请求
                        personalDAO.agreeFriend(oId, userId, function(err, results1) {
                            if (err) {
                                res.json({ code: 500, msg: '搜索查询失败！' })
                            } else {
                                if (results1.affectedRows > 0) {
                                    res.json({ code: 200, affectedRows: results1.affectedRows, msg: '同意加好友！' })
                                } else {
                                    res.json({ code: 200, affectedRows: results1.affectedRows, msg: '同意失败!' })
                                }
                            }
                        })
                    } else {
                        res.json({ code: 200, data: results, msg: '已是好友！' })
                    }
                } else {
                    res.json({ code: 200, data: results, msg: '无好友请求！' })
                }
            }
        })


    },
    // addGift: function(req, res) {
    //     personalDAO.postPersonalAddGift(function(err, results) {
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
    approve: function(req, res) {
        var conId = req.body.conId
        var userId = req.user[0].base_info_Id
        console.log('对方动态编号：' + conId)
        console.log('我自己的账号：' + userId)
        async function appr() {
            try {
                //动态是否是第一次点赞
                let isCon = await personalDAO.isAppCon(conId)
                    // console.log('存在否')
                    // console.log(isCon)
                    // console.log(isCon[0].approve_status)
                if (isCon) {
                    let appCon = await personalDAO.appCon(conId, userId)
                        // console.log(appCon)
                        //存在可以点赞，同时显示当前点赞数
                    if (appCon[0]) {
                        if (appCon[0].approve_status == 1) {
                            //不是第一次点赞
                            //取消点赞
                            try {
                                let appStatus0 = await personalDAO.disApprove(conId, userId)
                                    // console.log('取消点赞')
                                    // console.log(appStatus0)
                                try {
                                    let getApprove = await personalDAO.getApprove(conId)
                                        // console.log(getApprove)
                                    if (getApprove) {
                                        let approve = {
                                            'approveNum': getApprove[0].approveNum
                                        }
                                        res.json({ code: 200, affectedRows: appStatus0.affectedRows, data: approve, msg: '取消点赞成功！' })
                                    }
                                } catch (err) {
                                    res.json({ code: 200, msg: '此条动态还没获的点赞！' })
                                }

                            } catch (err) {
                                res.json({ code: 500, data: err, msg: '取消点赞失败！' })
                            }

                        } else {
                            //当前状态时取消状态,第二或多次点赞
                            let appStatus1 = await personalDAO.AgainApprove(conId, userId)
                            let getApprove = await personalDAO.getApprove(conId)
                                // console.log(getApprove[0].approveNum)
                            let approve = {
                                'approveNum': getApprove[0].approveNum
                            }
                            res.json({ code: 200, affectedRows: appStatus1.affectedRows, data: approve, msg: '再次点赞成功！' })
                        }

                    } else {
                        //第一次点赞
                        let appStatus = await personalDAO.approve(conId, userId)
                        let getApprove = await personalDAO.getApprove(conId)
                            // console.log(getApprove[0].approveNum)
                        let approve = {
                            'approveNum': getApprove[0].approveNum
                        }
                        res.json({ code: 200, affectedRows: appStatus.affectedRows, data: approve, msg: '首次点赞成功！' })
                    }

                } else {
                    res.json({ code: 200, msg: '此动态不存在！' })
                }
            } catch (err) {
                res.json({ code: 500, data: err, msg: '点赞错误！' })
            }

        }
        appr()
    },
    see: function(req, res) {
        var conId = req.body.conId
        var userId = req.user[0].base_info_Id
        console.log('对方动态编号：' + conId)
        console.log('我自己的账号：' + userId)
        async function look() {
            try {
                let seeNum1 = await personalDAO.seeNum(conId)
                    //发布人账号不能是浏览人账号
                if (seeNum1[0].con_user_Id != userId) {
                    let updateSee = await personalDAO.updateSee(conId)
                        // console.log('看')
                        // console.log(updateSee)
                    let seeNum = await personalDAO.seeNum(conId)
                        // console.log(seeNum)
                    let seenums = {}
                    seenums.seeNum = seeNum
                    res.json({ code: 200, affectedRows: updateSee.affectedRows, data: seenums, msg: '浏览他人动态成功!' })
                } else {
                    let seenums = {}
                    seenums.seeNum = seeNum1
                    res.json({ code: 200, data: seenums, msg: '浏览自己动态成功!' })
                }
            } catch (err) {
                res.json({ code: 500, data: err, msg: '浏览错误！' })
            }
        }
        look()

    }
}
module.exports = personalController