var userDAO = require('../models/userDAO')
var formidable = require('formidable')
var path = require('path')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
var userController = {
    getAllUsers: function(req, res) {
        // userDAO.getAllUsers(function(err, results) {
        //     if (err) {
        //         res.json({ code: 500, msg: '用户信息查询失败！' })
        //     } else {
        //         res.json({ code: 200, data: results, msg: '用户查询成功！' })
        //     }
        // })
    },
    getUserById: function(req, res, userId) {
        // var userId = req.params.uId
        // userDAO.getUserById(userId, function(err, results) {
        // if (err) {
        //     res.json({ code: 500, msg: '用户信息查询失败！' })
        // } else {
        //     if (results.length > 0) {
        //         res.json({ code: 200, data: results, msg: '用户查询成功！' })
        //     } else {
        //         res.json({ code: 200, data: results, msg: '查无此人！' })

        //     }
        // }
        // })
    },
    changeName: function(req, res) {

    },
    //上传头像
    uploadPic: function(req, res) {

    },
    login: function(req, res) {
        //接收用户请求传入的参数，并创建用户对象
        var user = { telephone: req.body.telephone, password: req.body.password }
        userDAO.getUserByTel(user.telephone, function(err, results) {
            if (err) {
                res.status(500).json({ msg: '数据库错误，登录失败！' })
            } else {
                if (results == null || results.length != 1) {
                    res.status(200).json({ msg: '手机号不存在，登录失败！' })
                } else {
                    bcrypt.compare(user.password, results[0].password, function(err, resPwd) {
                        // res == true
                        if (resPwd) {
                            res.status(200).json({ msg: '登录成功！！' })
                        } else {
                            res.status(200).json({ msg: '密码错误，登录失败！！' })
                        }
                    });
                }
            }
        })
    },
    register: function(req, res) {
        //接收用户请求传入的参数，并创建用户对象
        var user = { telephone: req.body.telephone, password: req.body.password }
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
                //hash是加密后的字符
                user.password = hash
                userDAO.register(user, function(err, results) {
                    if (err) {
                        res.status(500).json({ msg: '数据库错误，注册失败！' })
                    } else {
                        res.status(200).json({ msg: '注册成功！' })
                    }
                })
            });
        });
    }
}
module.exports = userController