var express = require('express');
var router = express.Router();
var passport = require('passport')
var userController = require('../controllers/searchControllers')

// 普通用户
router.get('/commUser', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    searchController.commUser(req, res)
});
// 一级用户
router.get('/seniorUser', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    searchController.seniorUser(req, res)
});
// 二级用户
router.get('/masterUser', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    searchController.masterUser(req, res)
});