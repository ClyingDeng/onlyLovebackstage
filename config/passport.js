//用于验证token的模块
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'privateKey';
function myPassport(passport){
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        //jwt_payload保存的是token生成时的对象
       console.log(jwt_payload)
       //通过验证后执行下一步
       done(null,jwt_payload)
    }));
}
module.exports = myPassport