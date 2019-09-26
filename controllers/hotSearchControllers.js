var hotSearchDAO = require('../models/hotSearchDAO')
var formidable = require('formidable')
var path = require('path')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
var hotSearchController = {
    //查询动态
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
    //发布动态
    publish: function (req, res) {
        var form = new formidable.IncomingForm() //创建上传表单对象
        form.uploadDir = path.join(__dirname, '..', '/public/hspicture') //设置上传文件的路径
        form.keepExtensions = true //设置保留上传文件的扩展名
        // console.log(files)
        form.parse(req, function (err, fields, files) {
            console.log(files)
            if (err) {
                res.send('图片上传错误！')
            }
            // console.log(fields)
            var conuser = { conuserId: req.user[0].base_info_Id, headPic: path.parse(files.file.path).base, conwords: fields.conwords, conTime: fields.conTime }
            console.log(conuser)
            hotSearchDAO.publish(conuser, function (err, results) {
                if (err) {
                    res.status(500).json({ msg: '发布动态失败！' })
                } else {
                    if (conuser.conwords == '' && conuser.headPic=='') {
                        res.status(200).json({ msg: '动态信息不能为空' })
                    } else {
                        hotSearchDAO.getconId(conuser, function (err, results1) {
                            if (err) {
                                res.status(500).json({ msg: '查询动态ID失败！' })
                            } else {
                                hotSearchDAO.insertapprove(results1, conuser, function (err, results2) {
                                    if (err) {
                                        res.status(500).json({ msg: '添加点赞失败！' })
                                    } else {
                                        res.json({ code: 200, affectedRows: results.affectedRows, msg: '动态发布成功！', 动态ID: results1[0], 发布动态: conuser })
                                    }
                                })
                            }
                        })
                    }
                }
            })
        })
    },
    //删除动态
    deleteHotSearch: function (req, res) {
        var userId = req.user[0].base_info_Id
        var conId = req.body.conId
        // var conId = req.parse.conId
        hotSearchDAO.deleteHotSearch(conId,function(err,results1){
            if(err){
                res.json({ code: 500, msg: '删除失败！' })
            }else{
                hotSearchDAO.hotSearch(userId, function (err, results) {
                    if (err) {
                        res.json({ code: 500, msg: '动态查询失败！' })
                    } else {
                        if (results == 0 || results == null) {
                            res.json({ code: 200, msg: '删除成功,您没有动态了！' })
                        } else {
                            res.json({ code: 200,affectedRows: results1.affectedRows, msg: '删除动态成功！您还有以下动态', data: results })
                        }
                    }
                })
            }
        })
    }
}
module.exports = hotSearchController