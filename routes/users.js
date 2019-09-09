var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
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