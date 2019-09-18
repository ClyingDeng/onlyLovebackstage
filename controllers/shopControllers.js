var shopDAO = require('../models/shopDAO')
var formidable = require('formidable')
var path = require('path')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
var shopController = {
    product: function (req, res) {
        var userId = req.user[0].base_info_Id
        shopDAO.getmembergrade(userId, function (err, results1) {
            if (err) {
                res.json({ code: 500, msg: '请完善你的个人信息！' })
            } else {
                if (results1 == "") {
                    shopDAO.getShopProduct(function (err, results) {
                        if (err) {
                            res.json({ code: 500, msg: '查询商品信息失败！', err: err })
                        } else {
                            if (results == 0 || results == null) {
                                res.json({ code: 200, msg: '商城内暂时没有商品上架' })
                            } else {
                                res.json({ code: 200, data: results, msg: '查询商品信息成功！' })
                            }
                        }
                    })
                } else if (results1[0].member_grade == 0) {
                    shopDAO.getShopProduct(function (err, results) {
                        if (err) {
                            res.json({ code: 500, msg: '查询商品信息失败！', err: err })
                        } else {
                            if (results == 0 || results == null) {
                                res.json({ code: 200, msg: '商城内暂时没有商品上架' })
                            } else {
                                res.json({ code: 200, data: results, msg: '查询商品信息成功！' })
                            }
                        }
                    })
                } else if (results1[0].member_grade > 0 && results1[0].member_grade < 4) {
                    shopDAO.getShopProduct1(function (err, results) {
                        if (err) {
                            res.json({ code: 500, msg: '查询商品信息失败！', err: err })
                        } else {
                            if (results == 0 || results == null) {
                                res.json({ code: 200, msg: '商城内暂时没有商品上架' })
                            } else {
                                // results[0].prop_price = results[0].prop_price * 0.88
                                // results[1].prop_price = results[1].prop_price * 0.88
                                // results[2].prop_price = results[2].prop_price * 0.88
                                // results[3].prop_price = results[3].prop_price * 0.88
                                // results[4].prop_price = results[4].prop_price * 0.88
                                res.json({ code: 200, data: results, msg: '查询商品信息成功！' })
                            }
                        }
                    })
                } else {
                    shopDAO.getShopProduct2(function (err, results) {
                        if (err) {
                            res.json({ code: 500, msg: '查询商品信息失败！', err: err })
                        } else {
                            if (results == 0 || results == null) {
                                res.json({ code: 200, msg: '商城内暂时没有商品上架' })
                            } else {
                                // results[0].prop_price = results[0].prop_price * 0.78
                                // results[1].prop_price = results[1].prop_price * 0.78
                                // results[2].prop_price = results[2].prop_price * 0.78
                                // results[3].prop_price = results[3].prop_price * 0.78
                                // results[4].prop_price = results[4].prop_price * 0.78
                                res.json({ code: 200, data: results, msg: '查询商品信息成功！' })
                            }
                        }
                    })
                }
            }
        })
    },
    member: function (req, res) {
        var userId = req.user[0].base_info_Id
        shopDAO.getmembergrade(userId, function (err, results1) {
            if (err) {
                res.json({ code: 500, msg: '请完善你的个人信息！' })
            } else {
                if (results1 == "") {
                    res.json({ code: 500, msg: '您还没有成为会员！' })
                } else {
                    shopDAO.getShopMember(userId, function (err, results) {
                        if (err) {
                            res.json({ code: 500, msg: '查询会员信息个人失败！', err: err })
                        } else {
                            if (results[0].member_grade == 0) {
                                res.json({ code: 200, msg: '您还没有成为会员' })
                            } else {
                                if (results[0].member_status == 1) {
                                    res.json({ code: 200, msg: '您的会员已过期' })
                                } else {
                                    res.json({ code: 200, data: results, msg: '查询会员信息个人成功！' })
                                }
                            }
                        }
                    })
                }
            }
        })
    },
    charge: function (req, res) {
        var user = { userId: req.user[0].base_info_Id, integral: req.body.integral }
        shopDAO.getShopCharge(user, function (err, results) {
            if (err) {
                res.json({ code: 500, msg: '用户充值失败！' })
            } else {
                shopDAO.getintegral(user, function (err, results1) {
                    if (err) {
                        res.json({ code: 500, msg: '查询用户积分失败！' })
                    } else {
                        res.json({ code: 200, affectedRows: results.affectedRows, msg: '用户充值成功！', 您的当前积分: results1[0].integral })
                    }
                })
            }
        })
    },
    props: function (req, res) {
        var userId = req.user[0].base_info_Id
        var user = { userId: req.user[0].base_info_Id, propsId: req.body.propsId, number: req.body.number, haveTime: req.body.haveTime }
        // console.log(user)
        shopDAO.insertShopProps(user, function (err, results) {
            if (err) {
                res.json({ code: 500, msg: '添加个人道具失败！', err: err })
            } else {
                shopDAO.getShopProps(user, function (err, results1) {
                    if (err) {
                        res.json({ code: 500, msg: '查询个人道具失败！', err: err })
                    } else {
                        shopDAO.getprice(user, function (err, results2) {
                            if (err) {
                                res.json({ code: 500, msg: '查询价格，个人余额失败！', err: err })
                            } else {
                                // console.log(results2[0])
                                shopDAO.getmembergrade(userId, function (err, results3) {
                                    if (err) {
                                        res.json({ code: 500, msg: '请完善你的个人信息！' })
                                    } else if (results3 == '') {
                                        if ((results2[0].prop_price) * (user.number) > results2[0].integral) {
                                            res.json({ code: 200, msg: '你的余额不足！' })
                                        } else {
                                            var integral = results2[0].integral - (results2[0].prop_price) * (user.number)
                                            shopDAO.updateintegral(user, integral, function (err, results4) {
                                                if (err) {
                                                    res.json({ code: 500, msg: '修改积分失败！', err: err })
                                                } else {
                                                    res.json({ code: 200, data: results1, msg: '查询个人道具成功！', 您的积分还有: integral })
                                                }
                                            })
                                        }
                                    } else if (results3[0].member_grade == 0) {
                                        if ((results2[0].prop_price) * (user.number) > results2[0].integral) {
                                            res.json({ code: 200, msg: '你的余额不足！' })
                                        } else {
                                            var integral = results2[0].integral - (results2[0].prop_price) * (user.number)
                                            shopDAO.updateintegral(user, integral, function (err, results4) {
                                                if (err) {
                                                    res.json({ code: 500, msg: '修改积分失败！', err: err })
                                                } else {
                                                    res.json({ code: 200, data: results1, msg: '查询个人道具成功！', 您的积分还有: integral })
                                                }
                                            })
                                        }
                                    } else if (results3[0].member_grade >= 4) {
                                        if ((results2[0].prop_price) * (user.number) * 0.78 > results2[0].integral) {
                                            res.json({ code: 200, msg: '你的余额不足！' })
                                        } else {
                                            var integral = results2[0].integral - (results2[0].prop_price) * (user.number) * 0.78
                                            shopDAO.updateintegral(user, integral, function (err, results4) {
                                                if (err) {
                                                    res.json({ code: 500, msg: '修改积分失败！', err: err })
                                                } else {
                                                    res.json({ code: 200, data: results1, msg: '查询个人道具成功！', 您的积分还有: integral })
                                                }
                                            })
                                        }
                                    } else if (results3[0].member_grade < 4 && results3[0].member_grade > 0) {
                                        if ((results2[0].prop_price) * (user.number) * 0.88 > results2[0].integral) {
                                            res.json({ code: 200, msg: '你的余额不足！' })
                                        } else {
                                            var integral = results2[0].integral - (results2[0].prop_price) * (user.number) * 0.88
                                            shopDAO.updateintegral(user, integral, function (err, results4) {

                                                if (err) {
                                                    res.json({ code: 500, msg: '修改积分失败！', err: err })
                                                } else {
                                                    res.json({ code: 200, data: results1, msg: '查询个人道具成功！', 您的积分还有: integral })
                                                }
                                            })
                                        }
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    },
    backpack: function (req, res) {
        var userId = req.user[0].base_info_Id
        shopDAO.getbackpack(userId, function (err, results) {
            if (err) {
                res.json({ code: 500, msg: '个人道具查询失败！' })
            } else {
                if (results == 0 || results == null) {
                    res.json({ code: 200, msg: '您的背包为空' })
                } else {
                    res.json({ code: 200, data: results, msg: '个人道具查询成功！' })
                }
            }
        })
    },
    buymember: function (req, res) {
        var user = { userId: req.user[0].base_info_Id, day: req.body.day }
        shopDAO.getintegral(user, function (err, results) {
            if (err) {
                res.json({ code: 500, msg: '查询余额失败！' })
            } else {
                var integral = results[0].integral
                if (user.day == 30) {
                    // user.day = 30
                    if(integral<=10){
                        res.json({ code: 500, msg: '您的余额不足！' })
                    }else{
                        shopDAO.buymember(user,function(err,results1){
                            if(err){
                                res.json({ code: 500, msg: '购买失败请重试！'+err })
                            }else{
                                integral = integral-10
                                shopDAO.updateintegral(user,integral,function(err,results2){
                                    if(err){
                                        res.json({ code: 500, msg: '修改余额失败！' })
                                    }else{
                                        res.json({ code: 200, 您的积分还有: integral ,msg: '购买包月会员成功！' })
                                    }
                                })
                            }
                        })
                    }
                } else if (user.day == 120) {
                    if(integral<=30){
                        res.json({ code: 500, msg: '您的余额不足！' })
                    }else{
                        shopDAO.buymember(user,function(err,results1){
                            if(err){
                                res.json({ code: 500, msg: '购买失败请重试！'})
                            }else{
                                integral = integral-30
                                shopDAO.updateintegral(user,integral,function(err,results2){
                                    if(err){
                                        res.json({ code: 500, msg: '修改余额失败！' })
                                    }else{
                                        res.json({ code: 200, 您的积分还有: integral ,msg: '购买包季会员成功！' })
                                    }
                                })
                            }
                        })
                    }
                } else if (user.day == 365) {
                    if(integral<=80){
                        res.json({ code: 500, msg: '您的余额不足！' })
                    }else{
                        shopDAO.buymember(user,function(err,results1){
                            if(err){
                                res.json({ code: 500, msg: '购买失败请重试！' })
                            }else{
                                integral = integral-80
                                shopDAO.updateintegral(user,integral,function(err,results2){
                                    if(err){
                                        res.json({ code: 500, msg: '修改余额失败！' })
                                    }else{
                                        res.json({ code: 200, 您的积分还有: integral ,msg: '购买包年会员成功！' })
                                    }
                                })
                            }
                        })
                    }
                }
            }
        })
    }
}
module.exports = shopController;