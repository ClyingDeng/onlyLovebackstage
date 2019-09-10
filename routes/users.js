var express = require('express');
var router = express.Router();
var passport = require('passport')
var userController = require('../controllers/userControllers')

/* 获取所有用户信息. */
router.get('/',passport.authenticate('jwt',{session:false}) ,function(req, res, next) {
    userController.getAllUsers(req,res)
    // res.send('respond with a resource');
  });


/* GET users listing. */
router.get('/',passport.authenticate('jwt',{session:false}) , function (req, res, next) {
    res.send('respond with a resource');
});
/*登录*/
router.post('/login', function (req, res, next) {
    userController.login(req, res)
})
/*注册*/
router.post('/register', function (req, res, next) {
    userController.register(req, res)
});
/*认证*/
router.post('/identification',passport.authenticate('jwt',{session:false}) , function (req, res, next) {
    userController.identification(req, res)
});
// 更改头像
router.post('/updateHeadPic',passport.authenticate('jwt',{session:false}) , function (req, res, next) {
    userController.updateHeadPic(req, res)
});
//修改密码
router.post('/updatePassword',passport.authenticate('jwt',{session:false}) , function (req, res, next) {
    userController.updatePassword(req, res)
});
// 忘记密码
router.post('/forgetPassword',passport.authenticate('jwt',{session:false}) , function (req, res, next) {
    userController.forgetPassword(req, res)
});
// 验证码
router.post('/Vcode',passport.authenticate('jwt',{session:false}) , function (req, res, next) {
    userController.Vcode(req, res)
});
// 修改信息、完善信息
router.post('/updateInfo',passport.authenticate('jwt',{session:false}) , function (req, res, next) {
    userController.updateInfo(req, res)
});
// 送出的礼物
router.post('/from_Presents',passport.authenticate('jwt',{session:false}) , function (req, res, next) {
    userController.from_Presents(req, res)
});
// 收到礼物
router.get('/to_Presents',passport.authenticate('jwt',{session:false}) , function (req, res, next) {
    userController.to_Presents(req, res)
});
// 用户其他信息
router.get('/userInfo',passport.authenticate('jwt',{session:false}) , function (req, res, next) {
    userController.userInfo(req, res)
});
module.exports = router;