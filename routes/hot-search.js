var express = require('express');
var router = express.Router();
var passport = require('passport')
var userController = require('../controllers/userController')



// 动态
router.get('/hot_Search', function (req, res, next) {
    userController.hot_Search(req, res)
})
// 发布动态
router.post('/publish', function (req, res, next) {
    userController.publish(req, res)
})