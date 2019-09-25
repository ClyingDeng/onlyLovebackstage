var express = require('express');
var router = express.Router();
var passport = require('passport')
var hotSearchController = require('../controllers/hotSearchControllers')



// 动态
router.get('/hotSearch', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    hotSearchController.hotSearch(req, res)
})
// 发布动态
router.post('/publish', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    hotSearchController.publish(req, res)
})
// 删除动态
router.post('/deleteHotSearch', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    hotSearchController.deleteHotSearch(req, res)
})
module.exports = router;