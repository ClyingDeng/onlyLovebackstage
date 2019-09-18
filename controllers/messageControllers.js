var messageDAO = require('../models/messageDAO')
var personalDAO = require('../models/personalDAO')
var formidable = require('formidable')
var path = require('path')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
var DAO = require('../models/DAO')
var Step = require('step')
var messageController = {
    friendList: function(req, res) {
        var userId = req.user[0].base_info_Id
            // console.log(req.user)
        console.log('我的：' + userId)
        messageDAO.friendList(userId, function(err, results) {
            if (err) {
                res.json({ code: 500, msg: '好友列表查询失败！' })
            } else {
                // console.log(results)
                if (results.length > 0) {
                    messageDAO.friends(userId, function(err, results1) {
                        if (err) {
                            res.json({ code: 500, msg: '好友列表查询失败！' })
                        } else {
                            console.log('好友')
                            console.log(results1[0])
                            messageDAO.attFriends(userId, function(err, results2) {
                                if (err) {
                                    res.json({ code: 500, msg: '好友列表查询失败！' })
                                } else {
                                    console.log('关注')
                                    console.log(results2[0])
                                    results1[1] = results2[0]
                                    console.log(results1)
                                    messageDAO.blackFriends(userId, function(err, results3) {
                                        if (err) {
                                            res.json({ code: 500, msg: '好友列表查询失败！' })
                                        } else {
                                            console.log('黑名单')
                                            console.log(results3[0])
                                            results1[2] = results2[0]
                                            res.json({ code: 200, data: results1, msg: '好友列表查询成功！' })

                                        }
                                    })
                                }
                            })
                        }
                    })
                } else {
                    res.json({ code: 200, data: results, msg: '好友列表无好友！' })
                }
            }


        })
    },
    attention: function(req, res) {
        var telephone = req.user.telephone
            // var telephone = 15238552239
        console.log(req.user)
        messageDAO.attention(telephone, function(err, results) {
            if (err) {
                res.json({ code: 500, msg: '关注查询失败！' })
            } else {
                res.json({ code: 200, data: results, msg: '关注查询成功！' })
            }
        })
    },
    messageList: function(req, res) {
        var userId = req.params.uId
        messageDAO.messageList(function(err, results) {
            if (err) {
                res.json({ code: 500, msg: '消息查询失败！' })
            } else {
                res.json({ code: 200, data: results, msg: '消息查询成功！' })
            }
        })
    },
    systemMessage: function(req, res) {
        var userId = req.params.uId
        messageDAO.systemMessage(function(err, results) {
            if (err) {
                res.json({ code: 500, msg: '系统消息插入失败！' })
            } else {
                res.json({ code: 200, data: results, msg: '系统消息插入成功！' })
            }
        })
    },
}
module.exports = messageController