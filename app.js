var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var searchRouter = require('./routes/search');
var hotSearchRouter = require('./routes/hotSearch')
var listRouter = require('./routes/list')
var messageRouter = require('./routes/message')
var personalRouter = require('./routes/personal')
var shopRouter = require('./routes/shop')


var mypassport = require('./config/passport')

var app = express();

//设置跨域请求的允许操作
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    next()
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 10 } //通过cookie下的maxAg变量保存session时间
    //从用户最后一次操作网页开始计时
}))



app.use(express.static(path.join(__dirname, 'public')));
//使用passport中间件，并初始化
app.use(passport.initialize());
//使用passport的验证方法
mypassport(passport)

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/search', searchRouter);
app.use('/hotSearch', hotSearchRouter);
app.use('/list', listRouter);
app.use('/message', messageRouter);
app.use('/personal', personalRouter);
app.use('/shop', shopRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;