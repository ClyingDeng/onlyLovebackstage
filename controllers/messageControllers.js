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
        console.log(userId)
        messageDAO.friendList(userId, function(err, results) {
            if (err) {
                res.json({ code: 500, msg: '好友列表查询失败！' })
            } else {
                console.log(results.length)

                //有不止一个好友
                if (results.length > 0) {
                    // Step(
                    function infos(fri_Id) {
                        var friends = []
                        personalDAO.getPersonalManyInfo(fri_Id, function(err, results2) {
                            if (err) {
                                res.json({ code: 500, msg: '搜索查询失败！' })
                            } else {
                                if (results2.length > 0) {

                                    friends.push(results2)
                                    console.log('friends还有吗：')
                                    console.log(friends)
                                    return friends
                                } else {
                                    res.json({ code: 200, data: results, msg: '查无此人！' })
                                }
                            }
                        })
                    }
                    //遍历好友列表，带回好友基本信息
                    function forFriends(results, userId) {
                        console.log(results)
                        var friends = []
                        for (var i = 0; i < results.length; i++) {
                            //fri_Id是自己
                            if (results[i].fri_Id == userId) {
                                DAO('select user_Id from friends where fri_Id = ?', [results[i].fri_Id], function(err, results1) {
                                    if (err) {
                                        res.json({ code: 500, msg: '你的好友列表查询失败！' })
                                    } else {
                                        console.log(results1)
                                        console.log('fri_Id是自己' + i - 1)
                                        console.log(results1[i - 1].user_Id)
                                        console.log('调用infos：')
                                        console.log(infos(results1[i - 1].user_Id))
                                        friends.push(infos(results1[i - 1].user_Id))
                                        return friends
                                    }
                                })

                            } else {
                                DAO('select fri_Id from friends where user_Id = ?', [userId], function(err, results1) {
                                    if (err) {
                                        res.json({ code: 500, msg: '你的好友列表查询失败！' })
                                    } else {
                                        console.log('user_Id是自己')
                                        console.log(results1[i - 1].fri_Id)
                                        console.log('调用infos：')
                                        console.log(infos(results1[i - 1].user_Id))
                                        console.log('好友呢')
                                        console.log(friends)
                                    }
                                })
                                return friends
                            }
                        }
                    }

                    function showFriends(results, userId) {
                        console.log('遍历好友：')
                        forFriends(results, userId)
                        var friend = forFriends(results, userId)
                        console.log(friend)
                        res.json({ code: 200, data: friend, msg: '好友列表查询成功！' })
                    }


                    // )
                    showFriends(results, userId)

                } else {
                    res.json({ code: 200, data: results, msg: '没有好友！' })
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