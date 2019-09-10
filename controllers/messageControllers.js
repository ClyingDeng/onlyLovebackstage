var messageDAO = require('../models/messageDAO')
var formidable = require('formidable')
var path = require('path')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
var messageController = {
    friendList: function (req, res) {
        var userId = req.params.uId
        messageDAO.friendList(function (err, results) {
            if (err) {
                res.json({ code: 500, msg: '好友列表查询失败！' })
            } else {
                res.json({ code: 200, data: results, msg: '好友列表查询成功！' })
            }
        })
    },
    attention: function (req, res) {
        var userId = req.params.uId
        messageDAO.attention(function (err, results) {
            if (err) {
                res.json({ code: 500, msg: '关注查询失败！' })
            } else {
                res.json({ code: 200, data: results, msg: '关注查询成功！' })
            }
        })
    },
    messageList: function (req, res) {
        var userId = req.params.uId
        messageDAO.messageList(function (err, results) {
            if (err) {
                res.json({ code: 500, msg: '消息查询失败！' })
            } else {
                res.json({ code: 200, data: results, msg: '消息查询成功！' })
            }
        })
    },
    systemMessage: function (req, res) {
        var userId = req.params.uId
        messageDAO.systemMessage(function (err, results) {
            if (err) {
                res.json({ code: 500, msg: '系统消息插入失败！' })
            } else {
                res.json({ code: 200, data: results, msg: '系统消息插入成功！' })
            }
        })
    },
}
module.exports = messageController