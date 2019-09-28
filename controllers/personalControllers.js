var personalDAO = require('../models/personalDAO')
var formidable = require('formidable')
var path = require('path')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
var DAO = require('../models/DAO')
var personalController = {
    //主页信息
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
    //我看他人主页
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
                                results1[0].sweet = results[0].sweet_score
                                    // console.log(results1[0].sweet)
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
                                results1[0].sweet = results[0].sweet_score
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
                                results1[0].sweet = results[0].sweet_score
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
                                results1[0].sweet = results[0].sweet_score
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
                                results1[0].sweet = results[0].sweet_score
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
                                results1[0].sweet = results[0].sweet_score
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
    //发送好友请求
    addFriend: function(req, res) {

        var oId = req.params.oId
        var userId = req.user[0].base_info_Id
        console.log('对方账号：' + oId)
        console.log('我自己的账号：' + userId)
            //当前亲密度是否达到199
        async function friends() {
            try {
                let sesweet = await personalDAO.seeSweet(userId, oId)
                console.log(sesweet)
                if (sesweet) {
                    console.log(sesweet[0].sweet_score)
                    if (sesweet[0].sweet_score >= 199) {
                        // console.log(sesweet[0].sweet_score)
                        let addFriend = await personalDAO.postPersonaladdFriend(userId, oId)
                        console.log(addFriend)
                        res.json({ code: 200, affectedRows: addFriend.affectedRows, msg: '加好友请求发送成功！' })
                    } else {
                        res.json({ code: 200, data: sesweet, msg: '亲密度不足，无法添加好友！' })
                    }
                }
            } catch (err) {

                res.json({ code: 200, msg: '您和该用户还未有亲密度！' })
            }

        }
        friends()
    },

    //发送恋人请求
    addLovers: function(req, res) {
        var oId = req.params.oId
        var userId = req.user[0].base_info_Id
        console.log('对方账号：' + oId)
        console.log('我自己的账号：' + userId)
            //当前亲密度是否达到299
        async function Lovers() {
            try {
                let sesweet = await personalDAO.seeSweet(userId, oId)
                console.log(sesweet)
                if (sesweet) {
                    console.log(sesweet[0].sweet_score)
                    if (sesweet[0].sweet_score >= 299) {
                        //判断对方是否已经有恋人
                        let isLover = await personalDAO.isLover(oId)
                            // console.log(isLover)
                            // console.log(isLover == false)
                        if (isLover == false) {
                            res.json({ code: 200, data: sesweet, msg: '恋人请求发送成功！' })
                        } else {
                            res.json({ code: 200, data: sesweet, msg: '对方已经是恋人状态，发送请求失败！' })
                        }
                    } else {
                        res.json({ code: 200, data: sesweet, msg: '亲密度不足，无法成为恋人！' })
                    }
                }
            } catch (err) {

                res.json({ code: 200, msg: '您和该用户还未有亲密度！' })
            }

        }
        Lovers()
    },
    //送礼物
    addGift: function(req, res) {
        var userId = req.user[0].base_info_Id
        var propsId = req.body.propsId
        var num = req.body.num
        var addId = req.body.addId
        var haveTime = req.body.haveTime
        personalDAO.getprops(userId, function(err, results) {
            var str = JSON.stringify(results);
            console.log(str)
            var flag = str.indexOf(propsId)
            if (err) {
                res.json({ code: 500, msg: '查询背包礼物种类失败' })
            } else if (flag != -1) {
                personalDAO.getbackpack(userId, propsId, function(err, results1) {
                    if (err) {
                        res.json({ code: 500, msg: '查询背包礼物数量失败' })
                    } else {
                        console.log(results1[0].prop_Name)
                        console.log(results1[0].num)
                        if (results1[0].num == 0) {
                            res.json({ code: 200, msg: '您已经没有的' + results1[0].prop_Name + '礼物了' })
                        } else if (results1[0].num < num) {
                            res.json({ code: 200, msg: '您的' + results1[0].prop_Name + '只有' + results1[0].num + '个' })
                        } else {
                            personalDAO.insertGift(userId, propsId, num, haveTime, function(err, results2) {
                                if (err) {
                                    res.json({ code: 500, msg: '修改礼物数据失败' + err })
                                } else {
                                    personalDAO.getgiftsweet(propsId, function(err, results3) {
                                        if (err) {
                                            res.json({ code: 500, msg: '获取礼物亲密度失败' })
                                        } else {
                                            let propsweet = results3[0].prop_fun_intimacy * num
                                            console.log(propsweet)
                                            personalDAO.selectsweet(userId, function(err, results4) {
                                                console.log(results4[0])
                                                if (err) {
                                                    res.json({ code: 500, msg: '判断亲密度表中是否有二人失败' })
                                                } else if (results4[0] == '') {
                                                    personalDAO.updatesweet(userId, addId, propsweet, function(err, results5) {
                                                        if (err) {
                                                            res.json({ code: 500, msg: '修改亲密度失败' })
                                                        } else {
                                                            res.json({ code: 200, affectedRows: results2.affectedRows + results5.affectedRows, msg: '送出礼物成功！你与 ' + addId + ' 亲密度增加 ' + propsweet })
                                                        }
                                                    })
                                                } else {
                                                    personalDAO.insertsweet(userId, addId, propsweet, function(err, results6) {
                                                        if (err) {
                                                            res.json({ code: 500, msg: '添加两人到亲密表失败' })
                                                        } else {
                                                            res.json({ code: 200, affectedRows: results2.affectedRows + results6.affectedRows, msg: '送出礼物成功！你与 ' + addId + ' 亲密度增加 ' + propsweet })
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }
                            })

                        }
                    }
                })
            } else {
                // console.log(results[0].props_Id)
                res.json({ code: 500, msg: '您的背包没有该商品' })
            }
        })
    },
    //点赞
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
    //浏览量
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
                res.json({ code: 500, data: err, msg: '数据库错误！' })
            }
        }
        look()

    },
    //关注
    pickAttention: function(req, res) {
        var oId = req.params.oId
        var userId = req.user[0].base_info_Id
        console.log('对方账号：' + oId)
        console.log('我自己的账号：' + userId)
        async function attention() {
            try {
                let isAtt = await personalDAO.isAttention(userId, oId)
                console.log(isAtt)
                console.log(isAtt == false) //之前没有关注
                if (isAtt == false) {
                    let att = await personalDAO.pickAttention(userId, oId)
                    console.log(att)
                    res.json({ code: 200, affectedRows: att.affectedRows, msg: '关注他人成功!' })
                } else {
                    //之前有关注过
                    //查看关注状态，关注过就取消关注，取消关注就关注
                    let status = await personalDAO.attentionStatus(userId, oId)
                        // console.log(status)
                        // console.log(status[0].att_status)
                    if (status[0].att_status) { //1已关注--->取消关注
                        //取消关注
                        let canelAttention = await personalDAO.canelAttention(userId, oId)
                            // console.log(canelAttention)
                        let status1 = await personalDAO.attentionStatus(userId, oId)
                        res.json({ code: 200, affectedRows: canelAttention.affectedRows, data: status1, msg: '取消关注成功' })

                    } else {
                        //关注
                        let attentionAgain = await personalDAO.attentionAgain(userId, oId)
                            // console.log(attentionAgain)
                        let status2 = await personalDAO.attentionStatus(userId, oId)
                        res.json({ code: 200, affectedRows: attentionAgain.affectedRows, data: status2, msg: '再次关注成功' })
                    }
                }
            } catch (err) {
                res.json({ code: 500, data: err, msg: '数据库错误！' })
            }
        }
        attention()
    }
}
module.exports = personalController