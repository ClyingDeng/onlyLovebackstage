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
// var payRouter =  require("./routes/pay")
const config     = require('./config.js')
const alipayf2f  = require('./lib/alipay_f2f')
const bodyParser = require('body-parser')
const fs         = require('fs')
console.log('!!!')
console.log(alipayf2f)
console.log(config)
const SERVICE_PORT = 3001;
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
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.set("views", path.join(__dirname, 'views'));
app.engine(".ejs", require("ejs").__express);
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require("compression")());
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


app.use((req, res, next) => {
	req.config    = config;
	req.alipayf2f = new alipayf2f(config);


	/* 模拟数据库 仅仅作为演示 */
	req.database  = {
		get(id) {
			return new Promise((resolve, reject) => {
				if(!fs.existsSync(`./fs-database/${id}.json`)) {
					return resolve(null);
				}
				fs.readFile(`./fs-database/${id}.json`, function (err, data) {
					if (err) return (reject);
					resolve(JSON.parse(data.toString()));
				});
			});
		},

		delete(id) {
			return new Promise((resolve, reject) => {
				if(!fs.existsSync(`./fs-database/${id}.json`)) {
					return resolve();
				}
				fs.unlink((`./fs-database/${id}.json`, function (err) {
					resolve(data);
				}));
			});
		},

		insert(id, obj) {
			return new Promise((resolve, reject) => {
				if(fs.existsSync(`./fs-database/${id}.json`)) {
					return resolve(false);
				}
				fs.writeFile(`./fs-database/${id}.json`, JSON.stringify(obj), function(err){
					if(err) return reject(err);
					resolve(true);
				});
			});
		},

		update(id, obj) {
			return new Promise((resolve, reject) => {
				fs.writeFile(`./fs-database/${id}.json`, JSON.stringify(obj), function(err){
					if(err) return reject(err);
					resolve(true);
				});
			});
		},
	};
	res.error     = (result) => res.json({ "status": false, message: result });
	res.success   = (result) => res.json({ "status": true, message: result });
	res.catch     = (error) => {
		console.error(error);
		res.json({ "status": false, "message": "服务器错误, 请稍后重试。" }).end();
	};
	next();
});


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
// app.use('/pay', payRouter);
app.use("/", require("./routes/pay"));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    console.log(err.message);
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
app.listen(SERVICE_PORT, (error) => {
	if (error) {
		return console.error("Listening error:", error);
	}
	console.log("Listening port:", SERVICE_PORT);
});


module.exports = app;