var express = require('express');
var router = express.Router();
var passport = require('passport')
var personalController = require('../controllers/personalControllers')

// 个人首页需要的数据
router.get('/manyInfo', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    personalController.manyInfo(req, res)
});
// 我看他人的主页
router.get('/othersAttention/:uId', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    personalController.otherPersonal(req, res)
});
// 加好友
router.post('/addFriend/:oId', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    personalController.addFriend(req, res)
});
//发送恋人请求
router.post('/addLovers/:oId', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    personalController.addLovers(req, res)
});
// 送她礼物
router.post('/addGift', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    personalController.addGift(req, res)
});
//点赞
router.post('/approve', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    personalController.approve(req, res)
});
//浏览量
router.post('/see', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    personalController.see(req, res)
});
//点击关注
router.post('/pickAttention/:oId', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    personalController.pickAttention(req, res)
});



module.exports = router;