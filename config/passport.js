var DAO = require('../models/DAO')
    //用于验证token的模块
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'privateKey';

function myPassport(passport) {
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        // console.log(jwt_payload.telephone)
        DAO('select base_info_Id,nickName,sex,age,telephone,use_status from base_info where base_info.telephone = ? ', [jwt_payload.telephone], function(err, results) {
                if (err) {
                    done(err, null)
                } else {
                    // console.log(results)
                    done(null, results)
                        // console.log(results)
                }
            })
            //jwt_payload保存的是token生成时的对象
            // console.log('token:' + jwt_payload)
            //通过验证后执行下一步
            // done(null, results)
    }));
}
module.exports = myPassport