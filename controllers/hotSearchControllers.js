var hotSearchDAO = require('../models/hotSearchDAO')
var formidable = require('formidable')
var path = require('path')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
var hotSearchController = {
    hotSearch: function (req, res) {
        var userId = req.user[0].base_info_Id
        hotSearchDAO.hotSearch(userId, function (err, results) {
            if (err) {
                res.json({ code: 500, msg: '动态查询失败！' })
            } else {
                if (results == 0 || results == null) {
                    res.json({ code: 200, msg: '您还没有发布过动态！' })
                } else {
                    res.json({ code: 200, data: results, msg: '动态查询成功！' })
                }
            }
        })
    },
    publish: function (req, res) {
        // 需要用户id
        var conuser = { conuserId: req.user[0].base_info_Id, conwords: req.body.conwords, conTime: req.body.conTime }
        console.log(conuser)
        // hash是加密后的字符
        hotSearchDAO.publish(conuser, function (err, results) {
            if (err) {
                res.status(500).json({ msg: '发布动态失败！' })
            } else {
                if (conuser.conwords == '') {
                    res.status(200).json({ msg: '动态信息不能为空' })
                } else {
                    hotSearchDAO.getconId(conuser,function(err,results1){
                        if(err){
                            res.status(500).json({ msg: '查询动态ID失败！' })
                        }else{
                            hotSearchDAO.insertapprove(results1,conuser,function(err,results2){
                                if(err){
                                    res.status(500).json({ msg: '添加点赞失败！' })
                                }else{
                                    res.json({ code: 200, data: results, msg: '动态发布成功！', 动态ID:results1[0],发布动态: conuser })
                                }
                            })
                        }
                    })
                }
            }
        })

    }
}
module.exports = hotSearchController