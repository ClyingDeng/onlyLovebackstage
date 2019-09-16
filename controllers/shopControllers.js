var shopDAO = require('../models/shopDAO')
var formidable = require('formidable')
var path = require('path')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
var shopController = {
    product: function(req, res) {
        shopDAO.getShopProduct(userId, function(err, results) {
            if (err) {
                res.json({ code: 500, msg: '搜索查询失败！' })
            } else {
                if (results.length > 0) {
                    res.json({ code: 200, data: results, msg: '搜索查询成功！' })
                } else {
                    res.json({ code: 200, data: results, msg: '查无此人！' })

                }
            }
        })
    },
    member: function(req, res) {
        // var userId = req.body.userId
        shopDAO.getShopMember(function(err, results) {
            if (err) {
                res.json({ code: 500, msg: '查询失败！' })
            } else {
                res.json({ code: 200, data: results, msg: '查询成功！' })
            }
        })
    },
    charge: function(req, res) {
        shopDAO.getShopCharge(userId, function(err, results) {
            if (err) {
                res.json({ code: 500, msg: '搜索查询失败！' })
            } else {
                if (results.length > 0) {
                    res.json({ code: 200, data: results, msg: '搜索查询成功！' })
                } else {
                    res.json({ code: 200, data: results, msg: '查无此人！' })

                }
            }
        })
    },
    props: function(req, res) {
        shopDAO.getShopProps(userId, function(err, results) {
            if (err) {
                res.json({ code: 500, msg: '搜索查询失败！' })
            } else {
                if (results.length > 0) {
                    res.json({ code: 200, data: results, msg: '搜索查询成功！' })
                } else {
                    res.json({ code: 200, data: results, msg: '查无此人！' })

                }
            }
        })
    }
}
module.exports = shopController;