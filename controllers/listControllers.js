var listDAO = require('../models/listDAO')
var formidable = require('formidable')
var path = require('path')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
var listController = {
    crazy: function (req, res) {
        listDAO.crazy(function(err, results) {
            if (err) {
                res.json({ code: 500, msg: '狂热榜查询失败！' })
            } else {
                res.json({ code: 200, data: results, msg: '狂热榜查询成功！' })
            }
        })
    },
    charm: function (req, res) {
        listDAO.charm(function(err, results) {
            if (err) {
                res.json({ code: 500, msg: '魅力榜查询失败！' })
            } else {
                res.json({ code: 200, data: results, msg: '魅力榜查询成功！' })
            }
        })
    },
    sweetChart: function (req, res) {
        listDAO.sweetChart(function(err, results) {
            if (err) {
                res.json({ code: 500, msg: '比翼榜查询失败！' })
            } else {
                res.json({ code: 200, data: results, msg: '比翼榜查询成功！' })
            }
        })
    }
}
module.exports = listController