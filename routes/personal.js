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
router.post('/addFriend', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    personalController.addFriend(req, res)
});
// 送她礼物
router.post('/addGift', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    personalController.addGift(req, res)
});
// // 亲密度
// router.get('/sweet', passport.authenticate('jwt', { session: false }), function(req, res, next) {
//     personalController.sweet(req, res)
// });
module.exports = router;