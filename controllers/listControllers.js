var listDAO = require('../models/listDAO')
var formidable = require('formidable')
var path = require('path')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
var listController = {
    crazy: function (req, res) {
        var userId = req.user[0].base_info_Id
        listDAO.crazy(function(err, results) {
            if (err) {
                res.json({ code: 500, msg: '狂热榜查询失败！' })
            } else {
                if(results==0 || results == null){
                    res.json({ code: 200, msg: '狂热榜内暂时没有信息' })
                }else{
                    var manyInfo = {}
                    manyInfo = results
                    listDAO.mycrazy(userId, function(err, results1){
                        if(err){
                            res.json({ code: 500, msg: '狂热榜个人排名查询失败！' })
                        }else{
                            if(results1==0 || results1 == null){
                                res.json({ code: 200, msg: '狂热榜内暂时没有您的信息' })
                            }else{
                                res.json({ code: 200, data: manyInfo, msg: '狂热榜查询成功！',您的排名: results1})
                            }
                        }
                    })
                }
            }
        })
    },
    charm: function (req, res) {
        var userId = req.user[0].base_info_Id
        listDAO.charm(function(err, results) {
            if (err) {
                res.json({ code: 500, msg: '魅力榜查询失败！' })
            } else {
                if(results==0 || results == null){
                    res.json({ code: 200, msg: '魅力榜内暂时没有信息' })
                }else{
                    var manyInfo = {}
                    manyInfo = results
                    listDAO.mycharm(userId, function(err, results1){
                        if(err){
                            res.json({ code: 500, msg: '魅力榜个人排名查询失败！' })
                        }else{
                            if(results1==0 || results1 == null){
                                res.json({ code: 200, msg: '魅力榜内暂时没有您的信息' })
                            }else{
                                res.json({ code: 200, data: manyInfo, msg: '魅力榜查询成功！',您的排名: results1})
                            }
                        }
                    })
                }
            }
        })
    },
    sweetChart: function (req, res) {
        var userId = req.user[0].base_info_Id
        listDAO.sweetChart(function(err, results) {
            if (err) {
                res.json({ code: 500, msg: '比翼榜查询失败！' })
            } else {
                if(results==0 || results == null){
                    res.json({ code: 200, msg: '比翼榜内暂时没有信息' })
                }else{
                    var manyInfo = {}
                    manyInfo = results
                    listDAO.mysweetChart(userId, function(err, results1){
                        if(err){
                            res.json({ code: 500, msg: '比翼榜个人排名查询失败！' })
                        }else{
                            if(results1==0 || results1 == null){
                                res.json({ code: 200, msg: '比翼榜内暂时没有您的信息' })
                            }else{
                                res.json({ code: 200, data: manyInfo, msg: '比翼榜查询成功！',您的排名: results1})
                            }
                        }
                    })
                }
            }
        })
    }
}
module.exports = listController