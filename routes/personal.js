var express = require('express');
var router = express.Router();
var passport = require('passport')
var userController = require('../controllers/userController')

// 部分信息
router.get('/manyInfo',passport.authenticate('jwt',{session:false}) , function (req, res, next) {
    userController.manyInfo(req, res)
});
// 他人可见
router.post('/others',passport.authenticate('jwt',{session:false}) , function (req, res, next) {
    userController.others(req, res)
});
// 加好友
router.post('/addFriend',passport.authenticate('jwt',{session:false}) , function (req, res, next) {
    userController.addFriend(req, res)
});
// 送她礼物
router.post('/addGift',passport.authenticate('jwt',{session:false}) , function (req, res, next) {
    userController.addGift(req, res)
});
// 亲密度
router.get('/sweet',passport.authenticate('jwt',{session:false}) , function (req, res, next) {
    userController.sweet(req, res)
});