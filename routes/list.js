var express = require('express');
var router = express.Router();
var passport = require('passport')
var listController = require('../controllers/listControllers')

// 狂热榜
router.get('/crazy', passport.authenticate('jwt', { session: false }), function(req, res, next) {
        listController.crazy(req, res)
    })
    // 魅力榜
router.get('/charm', passport.authenticate('jwt', { session: false }),function(req, res, next) {
        listController.charm(req, res)
    })
    // 比翼榜
router.get('/sweetChart', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    listController.sweetChart(req, res)
})
module.exports = router;