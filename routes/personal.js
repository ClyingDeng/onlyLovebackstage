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
router.post('/agreeFriend/:oId', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    personalController.agreeFriend(req, res)
});


// 送她礼物
router.post('/addGift', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    personalController.addGift(req, res)
});
module.exports = router;