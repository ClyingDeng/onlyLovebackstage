var hotSearchDAO = require('../models/hotSearchDAO')
var formidable = require('formidable')
var path = require('path')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
var hotSearchController = {
    hotSearch: function (req, res) {
        hotSearchDAO.hotSearch(function (err, results) {
            if (err) {
                res.json({ code: 500, msg: '动态查询失败！' })
            } else {
                res.json({ code: 200, data: results, msg: '动态查询成功！' })
            }
        })
    },
    publish: function (req, res) {
        // 需要用户id
        var conuser = {conuserId: req.body.conuserId,conwords: req.body.conwords,conuserPic: req.body.conuserPic}
        console.log(conuser)
        // hash是加密后的字符
        hotSearchDAO.publish(conuser, function (err, results) {
            if (err) {
                res.status(500).json({ msg: '发布动态失败！' })
            } else {
                res.status(200).json({ msg: '发布动态成功！' })
            }
        })

    }
}
module.exports = hotSearchController