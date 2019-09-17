var DAO = require('./DAO')
var shopDAO = {
    getShopProduct: function(userId, callback) {
        DAO('select props.prop_Name,if(member_grade>=1,prop_price*0.8,prop_price)as prop_price from (select nickName,member_grade from base_info,memberinfos where base_info_id = ?)as a,props GROUP BY props.prop_Name', [userId], function(err, results) {
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
            console.log(results)
            if (err) {
                callback(err, null)
            } else {
                callback(null, results)
            }
        })
    },
    getShopProps: function(user, callback) {
        DAO('select owners,prop_Name,number,prop_fun_intimacy,have_Time from have_props,props where have_props.props_Id = props.prop_Id and owners = ? ', [user.userId], function(err, results) {
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
    }
}
module.exports = shopDAO