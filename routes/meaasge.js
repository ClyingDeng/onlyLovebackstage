var express = require('express');
var router = express.Router();
var passport = require('passport')
var userController = require('../controllers/userControllers')

// 好友列表
router.post('/friendList',passport.authenticate('jwt',{session:false}) , function (req, res, next) {
    userController.friendList(req, res)
});
// 关注
router.get('/attention',passport.authenticate('jwt',{session:false}) , function (req, res, next) {
    userController.attention(req, res)
});
// 消息
router.post('/messageList',passport.authenticate('jwt',{session:false}) , function (req, res, next) {
    userController.messageList(req, res)
});
// 系统消息
router.get('/systemMessage',passport.authenticate('jwt',{session:false}) , function (req, res, next) {
    userController.systemMessage(req, res)
});