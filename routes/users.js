var express = require('express');
var router = express.Router();
var passport = require('passport')
var userController = require('../controllers/userController')

/* GET users listing. */
router.get('/',passport.authenticate('jwt',{session:false}) , function (req, res, next) {
    res.send('respond with a resource');
});
/*登录*/
router.post('/login', function (req, res, next) {
    userController.login(req, res)
})
/*注册*/
router.get('/register', function (req, res, next) {
    userController.register(req, res)
});
/*认证*/
router.get('/register', function (req, res, next) {
    userController.identification(req, res)
});
module.exports = router;