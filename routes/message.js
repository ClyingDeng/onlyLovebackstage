var express = require('express');
var router = express.Router();
var passport = require('passport')
var messageController = require('../controllers/messageControllers')

// 好友列表
router.get('/friendList', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    messageController.friendList(req, res)
});
// 关注
router.get('/attention', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    messageController.attention(req, res)
});
// 消息
router.post('/messageList', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    messageController.messageList(req, res)
});
// 系统消息
router.get('/systemMessage', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    messageController.systemMessage(req, res)
});
//同意加好友
router.post('/agreeFriend/:oId', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    messageController.agreeFriend(req, res)
});
//同意成为恋人
router.post('/agreeLovers/:oId', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    messageController.agreeLovers(req, res)
});
module.exports = router;