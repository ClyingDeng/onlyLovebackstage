var express = require('express');
var router = express.Router();
var passport = require('passport')
// <<<<<<< branch03
// var userController = require('../controllers/userControllers')
// =======
var userController = require('../controllers/shopControllers')
// >>>>>>> master


// 商品
router.post('/product', function(req, res, next) {
    userController.product(req, res)
});
// 会员中心
router.get('/memeber', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    userController.member(req, res)
});
// 充值中心
router.get('/charge', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    userController.charge(req, res)
});
// 道具
router.post('/props', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    userController.props(req, res)
});