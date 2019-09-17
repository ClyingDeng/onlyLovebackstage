var userDAO = require('../models/userDAO')
var formidable = require('formidable')
var path = require('path')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
var userController = {
    getAllUsers: function(req, res) {
        // userDAO.getAllUsers(function(err, results) {
        //     if (err) {
        //         res.json({ code: 500, msg: '用户信息查询失败！' })
        //     } else {
        //         res.json({ code: 200, data: results, msg: '用户查询成功！' })
        //     }
        // })
    },
    getUserById: function(req, res, userId) {
        // var userId = req.params.uId
        // userDAO.getUserById(userId, function(err, results) {
        // if (err) {
        //     res.json({ code: 500, msg: '用户信息查询失败！' })
        // } else {
        //     if (results.length > 0) {
        //         res.json({ code: 200, data: results, msg: '用户查询成功！' })
        //     } else {
        //         res.json({ code: 200, data: results, msg: '查无此人！' })

        //     }
        // }
        // })
    },
    changeName: function(req, res) {

    },
    //上传头像
    updateHeadPic: function(req, res) {
        var form = new formidable.IncomingForm()    //创建上传表单对象
        form.uploadDir = path.join(__dirname, '..', '/public/upload')         //设置上传文件的路径
        form.keepExtensions = true                  //设置保留上传文件的扩展名
        form.parse(req, function (err, fields, files) {
            if (err) {
                res.send('文件上传错误！')
            }
            console.log('...................')
            //fields是上传的表单字段数组，files是上传的文件列表
            console.log(files)
            //保存图片路径到数据库
            //1.获取当前用户编号
            var userId = fields.userId
            //2.获取当前用户的图片名称
            var headPic = path.parse(files.file.path).base
            console.log(headPic)
            userDAO.upload({ file: headPic,userId: userId}, function (err, results) {
            //    console.log(user.headPic)
                if (err) {
                    res.json({ code: 500, msg: '上传文件失败！' })
                } else {
                    res.json({ code: 200, data: results, msg: '上传文件成功！' })
                }
            })
        })
              
    },
    // 登录
    login: function(req, res) {
        var user = { telephone: req.body.telephone, password: req.body.password }
        userDAO.login(user, function(err, results) {
            if (err) {
                res.status(500).json({ msg: '数据库错误，登录失败！' })
            } else {
                if (results == null || results.length != 1) {
                    // console.log(results)
                    // console.log(user.password)
                    res.status(200).json({ msg: '手机号不存在，登录失败！' })
                } else {
                    bcrypt.compare(user.password, results[0].pwd, function(err, resPwd) {
                        // res == true
                        // console.log(user.password)
                        if (resPwd) {
                            //记录登录成功后的token
                            jwt.sign({ telephone: user.telephone }, 'privateKey', { expiresIn: 60 * 60 }, function(err, token) {
                                console.log(token);
                                console.log(req.user)
                                //注意token的固定格式“Bearer ”前缀
                                res.status(200).json({ msg: '登录成功！！', token: 'Bearer ' + token })
                            });
                        } else {
                            console.log(user.password)
                            console.log(results[0])
                            res.status(200).json({ msg: '密码错误，登录失败！！' })
                        }
                    });
                }
            }
        })
    },
    //

    // 注册
    register: function(req, res) {
        
        //接收用户请求传入的参数，并创建用户对象
        var user = { telephone: req.body.telephone, password: req.body.password,vCode:req.body.code }
            // console.log(user)
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
                //hash是加密后的字符
                user.password = hash
                userDAO.register(user, function(err, results) {
                    if (err) {
                        console.log(err)
                        res.status(500).json({ msg: '手机号已存在，注册失败！' + err })
                    } else {
                        console.log(req.session.TelvCode)
                        for(var i = 0; i < req.session.TelvCode.length; i++){
                            if(req.session.TelvCode[i].telephone == user.telephone && req.session.TelvCode[i].vCode == user.vCode ){
                                res.status(200).json({ msg: '验证码正确，注册成功！' })
                                delete req.session.TelvCode[i];
                                if(req.session.TelvCode[i] == " " || req.session.TelvCode[i] == null || typeof(req.session.TelvCode[i]) == "undefined")  
                                {  
                                    req.session.TelvCode.splice(i,1);  
                                         i= i-1;  
                                }
                                console.log(req.session.TelvCode)
                            }else{
                                res.status(200).json({ msg: '验证码输入失败，注册失败！' })
                            }

                        }
                    }
                })
            });
        });
    },

    // 修改密码
    updatePassword:function(req,res){
        var userId = req.body.base_info_Id
        var userpwd = req.body.userpwd
        userDAO.updatePassword({ userId: userId, pwd: userpwd }, function (err, results) {
            if (err) {
                res.json({ code: 500, msg: '用户修改密码失败！' })
            } else {
                //检查该操作对数据表是否造成影响
                if (results.affectedRows == 0) {
                    res.json({ code: 500, msg: '用户修改密码失败！' })
                } else {
                    res.json({ code: 200, data: results, msg: '用户修改密码成功！' })
                }
            }
        });
      
            
        },
    //认证
    identification:function(req,res){
        console.log(req.user)
        var userId = req.user[0].base_info_Id
        console.log('注释：' + userId)
        // var use_status = req.body.use_status
        userDAO.identification(userId, function (err, results) {
            if (err) {
                res.json({ code: 500, msg: '用户认证失败' })
            } else {
                //检查该操作对数据表是否造成影响
                if (results.length > 0) {
                    console.log(results[0].use_status)
                    var status = results[0].use_status
                    if(status == 0){
                        //去认证，调用认证方法
                        

                        res.json({ code: 200, data: results, msg: '查无此人！' })
                    }else{
                        res.json({ code: 500,data: results, msg: '用户已认证！' })
                    }
                } else {
                    res.json({ code: 200, data: results, msg: '用户认证成功！' })
                }
            }
        });
      
            
        },


    }

module.exports = userController