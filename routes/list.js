var express = require('express');
var router = express.Router();
var passport = require('passport')
var userController = require('../controllers/userController')

// 狂热榜
router.get('/crazy', function (req, res, next) {
    userController.crazy(req, res)
})
// 魅力榜
router.get('/charm', function (req, res, next) {
    userController.charm(req, res)
})
// 比翼榜
router.get('/sweet-chart', function (req, res, next) {
    userController.sweet-chart(req, res)
})