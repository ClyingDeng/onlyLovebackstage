var DAO = require('./DAO')
var shopDAO = {
    getmembergrade: function(userId, callback) {
        // console.log(userId)
        DAO('select member_grade from memberinfos where member_user_Id = ?', [userId], function(err, results) {
            console.log(results)
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    getShopProduct: function(callback) {
        DAO('select prop_Id,prop_Name,prop_pic,prop_price from props', null, function(err, results) {
            console.log(results)
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    getShopProduct1: function(callback) {
        DAO('select prop_Id,prop_Name,prop_pic,prop_price*0.88 prop_price from props', null, function(err, results) {
            console.log(results)
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    getShopProduct2: function(callback) {
        DAO('select prop_Id,prop_Name,prop_pic,prop_price*0.78 prop_price from props', null, function(err, results) {
            console.log(results)
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    getShopMember: function(userId, callback) {
        // console.log(userId)
        DAO('select member_user_Id,nickName,integral,member_grade,member_date,member_act_date,member_status from memberinfos,base_info where member_user_Id = base_info_Id and member_user_Id= ? ',[userId], function(err, results) {
            console.log(results)
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    getShopCharge: function(user, callback) {
        DAO('UPDATE base_info SET integral =integral + ? WHERE base_info_Id = ?', [user.integral,user.userId], function(err, results) {
            console.log(results)
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    getintegral: function(user, callback) {
        DAO('select integral from base_info WHERE base_info_Id = ?', [user.userId], function(err, results) {
            // console.log(results)
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    getShopProps: function(user, callback) {
        DAO('select owners,prop_Id,prop_Name,prop_pic,number,prop_fun_intimacy,have_Time from have_props,props where have_props.props_Id = props.prop_Id and owners = ? ', [user.userId], function(err, results) {
            console.log(results)
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    insertShopProps:function(user,callback){
        DAO('insert into have_props (owners,props_Id,number,have_Time) values (?,?,?,?)', [user.userId,user.propsId,user.number,user.haveTime], function(err, results) {
            console.log(results)
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    getbackpack:function(userId,callback){
        DAO('select * from backpack where owners = ?', [userId], function(err, results) {
            // console.log(results)
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    getprice:function(user,callback){
        console.log(user)
        DAO('select prop_price,integral from props,base_info where prop_Id=? and base_info_Id = ?  ', [user.propsId,user.userId], function(err, results) {
            // console.log(results)
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    updateintegral:function(user,integral,callback){
        DAO('update base_info set integral = ?  where base_info_Id = ? ', [integral,user.userId], function(err, results) {
            // console.log(results)
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    buymember:function(user,callback){
        DAO('update memberinfos set member_status = 1,member_date = member_date + ?,member_grade=1,member_status=0   where member_user_Id = ? ', [user.day,user.userId], function(err, results) {
            // console.log(results)
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    }
}
module.exports = shopDAO