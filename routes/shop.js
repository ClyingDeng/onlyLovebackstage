var express = require('express');
var router = express.Router();
var passport = require('passport')
var shopController = require('../controllers/shopControllers')


// 商品
router.get('/product', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    shopController.product(req, res)
});
// 会员中心
router.get('/memeber', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    shopController.member(req, res)
});
// 充值中心
router.post('/charge', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    shopController.charge(req, res)
});
// 道具
router.post('/props', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    shopController.props(req, res)
});
//个人背包
router.get('/backpack', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    shopController.backpack(req, res)
});
//购买会员
router.post('/buymember', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    shopController.buymember(req, res)
});
module.exports = router;