var userDAO = require('../models/userDAO')
var formidable = require('formidable')
var path = require('path')
var bcrypt = require('bcrypt')
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
    register: function(req, res) {
        // //接收用户请求传入的参数，开始创建用户
        // var user = { userTel: req.body.userTel, userPwd: req.body.userPwd }
        // bcrypt.genSalt(10, function(err, salt) {
        //     bcrypt.hash(user.userPwd, salt, function(err, hash) {
        //         //hash是加密后的字符
        //         userDAO.register(user, function(err, results) {
        //             if (err) {
        //                 res.status(500).json({ msg: '数据库错误，注册失败' })
        //             } else {
        //                 res.status(200).json({ msg: '注册成功' })
        //             }
        //         })
        //     });
        // });

    }
}
module.exports = userController