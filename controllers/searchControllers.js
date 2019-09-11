var searchDAO = require('../models/searchDAO')
var formidable = require('formidable')
var path = require('path')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
var searchController = {
    commUser: function(req, res) {
        searchDAO.getSearchComm(function(err, results) {
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
    seniorUser: function(req, res) {
        searchDAO.getSearchSenior(userId, function(err, results) {
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
    masterUser: function(req, res) {
        searchDAO.getSearchMaster(userId, function(err, results) {
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
module.exports = searchController