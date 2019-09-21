var userDAO = require('../models/userDAO')
var shopDAO = require('../models/shopDAO')
var formidable = require('formidable')
var path = require('path')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
var personalDAO = require('../models/personalDAO')
var userController = {
    changeName: function(req, res) {

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
                        console.log(user.password)
                        console.log(results[0].pwd) //加密
                        console.log(resPwd)
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
                            res.status(500).json({ msg: '密码错误，登录失败！！' })
                        }
                    });
                }
            }
        })
    },

    // 注册
    register: function(req, res) {

        //接收用户请求传入的参数，并创建用户对象
        var user = { telephone: req.body.telephone, password: req.body.password, vCode: req.body.code }
            // console.log(user)
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
                //hash是加密后的字符
                user.password = hash
                userDAO.register(user, function(err, results) {
                    if (err) {
                        console.log(err)
                        res.json({ code: 500, msg: '手机号已存在，注册失败！' + err })
                    } else {
                        console.log(req.session.TelvCode)
                        for (var i = 0; i < req.session.TelvCode.length; i++) {
                            if (req.session.TelvCode[i].telephone == user.telephone && req.session.TelvCode[i].vCode == user.vCode) {
                                res.status(200).json({ msg: '验证码正确，注册成功！' })
                                delete req.session.TelvCode[i];
                                if (req.session.TelvCode[i] == " " || req.session.TelvCode[i] == null || typeof(req.session.TelvCode[i]) == "undefined") {
                                    req.session.TelvCode.splice(i, 1);
                                    i = i - 1;
                                }
                                console.log(req.session.TelvCode)
                            } else {
                                res.json({ code: 200, msg: '验证码输入失败，注册失败！' })
                            }

                        }
                    }
                })
            });
        });
    },
    //忘记密码
    forgetPassword: function(req, res) {
        // var userId = req.user[0].base_info_Id
        var user = { telephone: req.body.telephone, vCode: req.body.code, password: req.body.newPassword, password1: req.body.surePassword }

        // console.log(userId)
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
                //hash是加密后的字符
                user.password = hash
                userDAO.exitTel(user.telephone, function(err, results) {
                    if (err) {
                        res.json({ code: 500, msg: '查询手机号失败！' + err })
                    } else {
                        console.log('数据库里面的手机号：' + results[0].telephone)
                        console.log(req.session.TelvCode)
                        console.log('laiba')

                        console.log(req.session.TelvCode[0].vCode)
                        console.log(user.vCode)
                            //判断当前输入的手机号是否与注册手机号一致
                        for (var i = 0; i < req.session.TelvCode.length; i++) {
                            if (results[0].telephone == user.telephone) {
                                //判断验证码
                                if (req.session.TelvCode[i].vCode == user.vCode) {

                                    //判断密码
                                    bcrypt.compare(user.password1, user.password, (err, res1) => {
                                            console.log('数据库密码：' + user.password)
                                            console.log(user.password1)
                                            console.log(res1)
                                            if (res1) {
                                                userDAO.updateNewPassword(user.telephone, user.password, function(err, results) {
                                                    if (err) {
                                                        res.json({ code: 500, msg: '数据库报错，用户设置新密码失败！' + err })
                                                    } else {
                                                        //检查该操作对数据表是否造成影响
                                                        if (results.affectedRows == 0) {
                                                            res.json({ code: 200, msg: '用户设置新密码失败！' })
                                                        } else {
                                                            res.json({ code: 200, affectedRows: results.affectedRows, msg: '用户设置新密码成功！' })

                                                        }
                                                    }
                                                })
                                            } else {
                                                res.json({ code: 500, msg: '原密码输入错误！' })
                                            }
                                        })
                                        //用完删除验证码
                                    delete req.session.TelvCode[i];
                                    if (req.session.TelvCode[i] == " " || req.session.TelvCode[i] == null || typeof(req.session.TelvCode[i]) == "undefined") {
                                        req.session.TelvCode.splice(i, 1);
                                        i = i - 1;
                                    }
                                    console.log(req.session.TelvCode)
                                } else {
                                    res.json({ code: 200, msg: '验证码输入失败，修改密码失败！' })
                                }

                            } else {
                                res.json({ code: 200, msg: '手机号不一致，无法修改密码！' + err })
                            }

                        }

                    }
                })
            });
        });
    },
    // 修改密码
    updatePassword: function(req, res) {
        var userId = req.user[0].base_info_Id
        var orguserpwd = req.body.orguserpwd
        var userpwd = req.body.userpwd
        bcrypt.genSalt(10, function(err, salt) {
            userDAO.getPassword(userId, function(err, results1) {
                if (err) {
                    res.json({ code: 500, msg: '查询密码失败！' })
                } else {
                    bcrypt.compare(orguserpwd, results1[0].pwd, (err, res1) => {
                        console.log('数据库密码：' + results1[0].pwd)
                        console.log(res1)
                        if (res1) {
                            bcrypt.hash(userpwd, salt, function(err, hash) {
                                userpwd = hash
                                    // console.log('哈哈哈哈' + hash)
                                    // console.log(results)
                                userDAO.updatePassword(userId, userpwd, function(err, results) {
                                    if (err) {
                                        res.json({ code: 500, msg: '用户修改密码失败！' })
                                    } else {
                                        //检查该操作对数据表是否造成影响
                                        if (results.affectedRows == 0) {
                                            res.json({ code: 500, msg: '用户修改密码失败！' })
                                        } else {
                                            res.json({ code: 200, affectedRows: results.affectedRows, msg: '用户修改密码成功！' })
                                        }
                                    }
                                });
                            });
                        } else {
                            res.json({ code: 500, msg: '原密码输入错误！' })
                        }
                    })
                }
            })
        });
    },
    //上传头像
    updateHeadPic: function(req, res) {
        var form = new formidable.IncomingForm() //创建上传表单对象
        form.uploadDir = path.join(__dirname, '..', '/public/upload') //设置上传文件的路径
        form.keepExtensions = true //设置保留上传文件的扩展名
        form.parse(req, function(err, fields, files) {
            if (err) {
                res.send('头像上传错误！')
            }
            console.log('...................')
                //fields是上传的表单字段数组，files是上传的文件列表
            console.log(files)
                //保存图片路径到数据库
                //1.获取当前用户编号
            var userId = req.user[0].base_info_Id
                //2.获取当前用户的图片名称
            var headPic = path.parse(files.file.path).base
            console.log(headPic)
            userDAO.upload({ file: headPic, userId: userId }, function(err, results) {
                //    console.log(user.headPic)
                if (err) {
                    res.json({ code: 500, msg: '头像文件失败！' })
                } else {
                    res.json({ code: 200, affectedRows: results.affectedRows, msg: '头像文件成功！' })
                }
            })
        })

    },
    // 修改个人信息
    updateInfo: function(req, res) {
        var user = { userId: req.user[0].base_info_Id, nickName: req.body.nickName, age: req.body.age, sex: req.body.sex, constellation: req.body.constellation, love_description: req.body.love_description, birthday: req.body.birthday, hobby: req.body.hobby, choose_object: req.body.choose_object, province: req.body.province, city: req.body.city, location_detail: req.body.location_detail, marriage: req.body.marriage, love_affair: req.body.love_affair, height: req.body.height, weight: req.body.weight, education: req.body.education, occupation: req.body.occupation, salary: req.body.salary, blight: req.body.blight, use_status: req.body.use_status, house: req.body.house, car: req.body.car, integral: req.body.integral }
        userDAO.updateInfo(user, function(err, results) {
            console.log(results)
            if (err) {
                console.log(err)
                res.json({ code: 500, msg: '用户修改失败!' })
            } else {
                if (results.affectedRows == 0) {
                    res.json({ code: 500, msg: '用户信息修改失败' })
                } else {
                    res.json({ code: 200, affectedRows: results.affectedRows, msg: '用户信息修改成功' })
                }
            }
        })
    },
    //用户其他信息
    userInfo: function(req, res) {
        // var oId = req.params.uId 2o;
        // console.log(req.user)
        var userId = req.user[0].base_info_Id
        console.log(userId)
        userDAO.userInfo_member(userId, function(err, results) {

            if (err) {
                res.json({ code: 500, msg: '搜索查询失败！' })
            } else {
                if (!results) {
                    console.log('该用户不是会员')
                } else {
                    res.json({ code: 200, data: results, msg: '搜索查询成功！' })
                }
            }
        })

    },
    //送出礼物搜索
    from_Presents: function(req, res) {
        var userId = req.body.to_Id
            // var gift = req.body.gift
        userDAO.from_Presents(userId, function(err, results) {
            if (err) {
                res.json({ code: 500, msg: '用户送出礼物失败！' + err })
            } else {
                //检查该操作对数据表是否造成影响
                // if (results.affectedRows == 0) {
                //     res.json({ code: 500, msg: '用户送出礼物失败！' })
                // } else {
                res.json({ code: 200, data: results, msg: '用户送出礼物成功！' })
                    // }
            }
        });


    },
    //送出礼物
    from_Present: function(req, res) {
        var userId = req.user[0].base_info_Id

        // var gift = req.body.gift
        userDAO.from_Present(userId, function(err, results) {
            if (err) {
                res.json({ code: 500, msg: '用户送出礼物失败！' + err })
            } else {
                //检查该操作对数据表是否造成影响
                // if (results.affectedRows == 0) {
                //     res.json({ code: 500, msg: '用户送出礼物失败！' })
                // } else {
                res.json({ code: 200, data: results, msg: '用户送出礼物成功！' })
                    // }
            }
        });


    },
    //收到礼物搜索
    to_Presents: function(req, res) {
        var fromId = req.body.from_Id
        var toId = req.user[0].base_info_Id

        console.log(toId)
            // var gift = req.body.gift
        userDAO.to_Presents(fromId, toId, function(err, results) {
            if (err) {
                console.log(err)
                res.json({ code: 500, msg: '用户收到礼物失败！' + err })
            } else {
                //检查该操作对数据表是否造成影响
                // if (results.affectedRows == 0) {
                //     res.json({ code: 500, msg: '用户收到礼物失败！' })
                // } else {
                res.json({ code: 200, data: results, msg: '用户收到礼物成功！' })
                    // }
            }
        });


    },
    //收到礼物
    to_Present: function(req, res) {
        // var fromId = req.body.from_Id
        var userId = req.user[0].base_info_Id

        console.log(userId)
            // var gift = req.body.gift
        userDAO.to_Present(userId, function(err, results) {
            if (err) {
                console.log(err)
                res.json({ code: 500, msg: '用户收到礼物失败！' + err })
            } else {
                //检查该操作对数据表是否造成影响
                // if (results.affectedRows == 0) {
                //     res.json({ code: 500, msg: '用户收到礼物失败！' })
                // } else {

                res.json({ code: 200, data: results, msg: '用户收到礼物成功！' })
                    // }
            }
        });


    },
    //查询其他信息
    otherInfo: function(req, res) {
        var userId = req.user[0].base_info_Id
        console.log(userId)
        personalDAO.getPersonalManyInfo(userId, function(err, results) {
            if (err) {
                res.json({ code: 500, msg: '用户其他信息查询失败！' + err })
            } else {
                if (results.length > 0) {
                    var manyInfo = {}
                    manyInfo = results
                    personalDAO.getGrade(userId, function(err, results1) {
                        if (err) {
                            res.json({ code: 500, msg: '个人信息搜索查询失败！' })
                        } else {
                            console.log('等级：')
                            console.log(results1)
                            if (results1[0] == 0 || results1[0] == null) {
                                manyInfo[0].grade = 0
                            } else {
                                manyInfo[0].grade = results1[0].member_grade
                            }
                            userDAO.OtherSweet(userId, function(err, results2) {
                                if (err) {
                                    res.json({ code: 500, msg: '用户信息搜索查询失败！' })
                                } else {
                                    // console.log(results2)
                                    manyInfo[0].sweetObj = results2
                                    res.json({ code: 200, data: manyInfo, msg: '用户其他信息查询成功！' })
                                }
                            })
                        }
                    })
                }

            }
        })
    },
    //关注我的
    attentionMe: function(req, res) {
        var userId = req.user[0].base_info_Id
        console.log(userId)
        userDAO.attentionMe(userId, function(err, results) {
            if (err) {
                console.log(err)
                res.json({ code: 500, msg: '关注我的用户基本信息查询失败！' + err })
            } else {
                res.json({ code: 200, data: results, msg: '关注我的用户基本信息查询成功！' })

            }
        })
    },
    //我关注的
    iAttention: function(req, res) {
        var userId = req.user[0].base_info_Id
        console.log(userId)
        userDAO.iAttention(userId, function(err, results) {
            if (err) {
                console.log(err)
                res.json({ code: 500, msg: '我关注的用户基本信息查询失败！' + err })
            } else {
                res.json({ code: 200, data: results, msg: '我关注的用户基本信息查询成功！' })

            }
        })
    },
    //我关注的人的详情
    iAttentionPerson: function(req, res) {
        var userId = req.user[0].base_info_Id
        console.log(userId)
        userDAO.to_Present(userId, function(err, results) {
            if (err) {
                console.log(err)
                res.json({ code: 500, msg: '用户收到礼物失败！' + err })
            } else {
                res.json({ code: 200, data: results, msg: '用户收到礼物成功！' })

            }
        })
    },
    //订单
    userOrder: function(req, res) {
        var user = { userId: req.user[0].base_info_Id, propsId: req.body.propsId, number: req.body.number, haveTime: req.body.haveTime }
        console.log(user)
        shopDAO.getShopProps(user, function(err, results1) {
            if (err) {
                res.json({ code: 500, msg: '查询个人订单失败！' + err })
            } else {
                res.json({ code: 500, data: results1, msg: '查询个人订单成功！' })
            }
        })
    }

}
module.exports = userController