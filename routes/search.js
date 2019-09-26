var express = require('express');
var router = express.Router();
var passport = require('passport')
var searchController = require('../controllers/searchControllers')

// 普通用户
router.get('/member', passport.authenticate('jwt', { session: false }), function(req,res,next){
    var status = req.user[0].use_status
    if(status == 1){
        //已认证
        next()
    }else{
        res.json({ code: 500, msg: '未实名认证,请前往认证！'  })
    }
},function(req, res, next) {
    searchController.getSearch(req, res)
});
module.exports = router;