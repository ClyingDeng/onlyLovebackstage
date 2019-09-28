CREATE TABLE `identification` (
`identification_Id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '认证表ID',
`ID_card_No` bigint(18) NOT NULL COMMENT '身份证号码',
`ID_card_name` varchar(8) NOT NULL COMMENT '身份证姓名',
`ID_card_sex` varchar(2) NULL COMMENT '身份证性别',
`ID_card_birthday` varchar(20) NOT NULL COMMENT '身份证出生日期',
`ID_card_front` varchar(255) NOT NULL UNIQUE COMMENT '身份证正面',
`ID_card_reverse` varchar(255) NULL COMMENT '身份证反面',
`ID_card_Id` bigint(11) NULL COMMENT '认证用户的账号',
`remark1` bigint(20) NULL,
`remark2` varchar(300) NULL,
`remark11` bigint(20) NULL,
`remark22` varchar(300) NULL,
PRIMARY KEY (`identification_Id`) 
);
-- 插入数据
insert into identification(ID_card_Id,ID_card_front,ID_card_No,ID_card_name,ID_card_sex,ID_card_birthday) values(20003,'fwcre',23454353,'nrufd','男','324');



CREATE TABLE `base_info` (
`base_info_Id` bigint(20) not NULL AUTO_INCREMENT COMMENT '用户账号ID',
`nickName` varchar(20) NULL COMMENT '昵称',
`sex` varchar(2) NULL COMMENT '性别',
`age` bigint(3) NULL COMMENT '年龄',
`constellation` varchar(10) NULL COMMENT '星座',
`love_description` varchar(255) NULL COMMENT '爱情宣言',
`birthday` datetime(6) NULL ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '出生年月日',
`hobby` bigint(2) NULL DEFAULT 0 COMMENT '爱好：0代表无，1代表唱歌，2代表跳舞，3代表跑步，4代表游泳，5代表弹琴，6代表其他',
`choose_object` varchar(255) NULL COMMENT '择偶要求',
`province` varchar(10) NULL COMMENT '所在地区省',
`city` varchar(10) NULL COMMENT '所在地区市',
`location_detail` varchar(100) NULL COMMENT '所在市的区',
`marriage` bigint(1) NULL DEFAULT 0 COMMENT '婚姻状况：0代表未婚，1代表离异，2代表丧偶',
`love_affair` bigint(1) NULL DEFAULT 0 COMMENT '恋爱关系:0代表单身，1代表恋爱',
`body_status` bigint(1) NULL DEFAULT 0 COMMENT '身体状况：0代表健康，1代表疾病，2代表残疾',
`height` bigint(3) NULL,
`weight` bigint(3) NULL,
`education` bigint(1) NULL DEFAULT 0 COMMENT '学历：-2代表初中，-1代表高中，0代表本科，1代表研究生，2代表博士',
`occupation` bigint(1) NULL DEFAULT 0 COMMENT '职业：0代表上班族，1代表创业者，2代表自由职业，3代表其他',
`salary` bigint(5) NULL,
`blight` bigint(1) NULL DEFAULT 0 COMMENT '不良嗜好：0代表无，1代表酗酒，2代表抽烟，3代表赌博',
`telephone` bigint(11) UNIQUE NOT NULL COMMENT '手机号码',
`pwd` varchar(255) NOT NULL COMMENT '密码',
`use_status` bigint(1) NOT NULL DEFAULT 0 COMMENT '0表示未认证，1代表已认证',
`house` bigint(1) NULL DEFAULT 0 COMMENT '是否有房：0代表无，1代表有',
`car` bigint(1) NULL COMMENT '是否有车：0代表无，1代表有',
`remark1` bigint(20) NULL COMMENT '备份整型',
`remark2` varchar(300) NULL COMMENT '备份字符串',
`remark11` bigint(20) NULL COMMENT '备份整型',
`remark22` varchar(300) NULL COMMENT '备份字符串',
`Vcode` bigint(6) NULL COMMENT '验证码',
`headPic` varchar(255) NULL COMMENT '用户头像，插入时默认有原始头像',
`signDate` bigint(5) NULL COMMENT '签到天数',
`integral` bigint(10) NULL DEFAULT 0 COMMENT '积分',
PRIMARY KEY (`base_info_Id`) 
);
-- 插入数据
insert into base_info(base_info_Id,nickName,sex,age,constellation,love_description,birthday,hobby,choose_object,province,city,location_detail,marriage,love_affair,body_status,height,weight,education,occupation,salary,blight,telephone,pwd,use_status,house,car,headPic) values (020003,'Clying','女',22,'天秤座','一切随缘','1997-09-29',0,'清秀型的男生','江苏省','苏州市','工业园区',0,0,0,'165','55',0,0,6000,0,1886260006,'123456',0,1,1,'defaultHead.jpg');

insert into base_info(base_info_Id,nickName,sex,age,constellation,love_description,birthday,hobby,choose_object,province,city,location_detail,marriage,love_affair,body_status,height,weight,education,occupation,salary,blight,telephone,pwd,use_status,house,car,headPic) values (020004,'有意思','男',21,'狮子座','爱是你我','1998-06-20',1,'漂亮的女生','河南省','南阳市','邓州市',0,0,0,'173','70',0,1, 10000,0,15238552239,'123456',1,1,1,'defaultHead.jpg');

insert into base_info(base_info_Id,nickName,sex,age,constellation,love_description,birthday,hobby,choose_object,province,city,location_detail,marriage,love_affair,body_status,height,weight,education,occupation,salary,blight,telephone,pwd,use_status,house,car,headPic) values (020005,'宋佳镱','男',23,'处女座','风吹裤裆毛飞扬','1996-09-03',0,'女生就行','黑龙江','大庆市','二道沟子区',0,0,0,'180','71',0,0,9000,0,13966623589,'123456',0,0,1,'defaultHead.jpg');

insert into base_info(base_info_Id,nickName,sex,age,constellation,love_description,birthday,hobby,choose_object,province,city,location_detail,marriage,love_affair,body_status,height,weight,education,occupation,salary,blight,telephone,pwd,use_status,house,car,headPic) values (020006,'李佳欣','女',22,'双子座','有多少爱可以重来','1997-11-19',0,'长的要像王俊凯','黑龙江','大庆市','三道沟子区',0,0,0,'170','50',0,0,8000,0,15660181102,'123456',0,0,1,'defaultHead.jpg');

insert into base_info(base_info_Id,nickName,sex,age,constellation,love_description,birthday,hobby,choose_object,province,city,location_detail,marriage,love_affair,body_status,height,weight,education,occupation,salary,blight,telephone,pwd,use_status,house,car,headPic) values (020007,'石吉红','女',22,'双鱼座','欢喜就好','1997-06-01',2,'身材的男生','吉林省','长春','四道沟子区',0,0,0,'173','54',0,0,6600,0,17649852369,'123456',0,1,0,'defaultHead.jpg');

CREATE TABLE `memberinfos`(
`member_Id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '会员ID',
`member_grade` int(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '1-6级会员等级',
`member_user_Id` bigint(20) NULL COMMENT '会员对应的用户账号',
`member_date` int(10) NULL DEFAULT 0 COMMENT '充值会员天数',
`member_act_date` int(10) NOT NULL DEFAULT 0  COMMENT '会员活跃天数',
`member_status` int(1) NULL COMMENT '是否过期，0代表未过期，1代表过期',
`remark1` int(20) NULL,
`remark2` varchar(300) NULL,
`remark11` int(20) NULL,
`remark22` varchar(300) NULL,
PRIMARY KEY (`member_Id`) 
);

-- 插入数据
insert into memberinfos(member_grade,member_user_Id,member_date,member_act_date,member_status) values(2,20003,30,100,0);
insert into memberinfos(member_user_Id,member_date,member_act_date,member_status) values(20004,60,90,0);
-- insert into memberinfos(
-- member_Id,member_grade,
-- member_user_Id,
-- member_date,member_act_date,member_status
-- ) values (0101,1,020003,30,100,0)
CREATE TABLE `props` (
`prop_Id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '道具编号',
`prop_Name` varchar(20) NOT NULL COMMENT '道具名称',
`prop_price` bigint(10) NOT NULL COMMENT '道具价格',
`prop_pic` varchar(20) NOT NULL COMMENT '道具图片',
`prop_fun_confession` int(2) NULL DEFAULT 0 COMMENT '道具0代表不能向好友匿名表白，1代表向好友匿名表白',
`prop_fun_intimacy` int(2) NULL DEFAULT 0 COMMENT '亲密度：0表示无，1表示+1，2表示+2、、、',
`prop_reality` int(2) NULL DEFAULT 0 COMMENT '道具是否现实：0不现实，1现实。',
`remark1` int(20) NULL,
`remark2` varchar(300) NULL,
`remark11` int(20) NULL,
`remark22` varchar(300) NULL,
PRIMARY KEY (`prop_Id`) 
);
-- 插入数据
insert into props(prop_Id,prop_Name,prop_price,prop_pic,prop_fun_confession,prop_fun_intimacy,prop_reality) values (10120,'flower',9,'flower.jpg',1,1,1);
insert into props(prop_Id,prop_Name,prop_price,prop_pic,prop_fun_confession,prop_fun_intimacy,prop_reality) values (10121,'rose',29,'rose.jpg',1,3,1);
insert into props(prop_Id,prop_Name,prop_price,prop_pic,prop_fun_confession,prop_fun_intimacy,prop_reality) values (10122,'ring',49,'ring.jpg',1,5,0);
insert into props(prop_Id,prop_Name,prop_price,prop_pic,prop_fun_confession,prop_fun_intimacy,prop_reality) values (10123,'diamondring',79,'diamondring.jpg',1,7,0);
insert into props(prop_Id,prop_Name,prop_price,prop_pic,prop_fun_confession,prop_fun_intimacy,prop_reality) values (10124,'diamondnecklace',89,'diamondnecklace.jpg',1,10,0);


CREATE TABLE `message` (
`mess_Id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '消息编号',
`user_Id` bigint(20) NULL COMMENT '主用户账号',
`user_content` varchar(255) NULL COMMENT '主用户发送消息内容',
`fri_Id` bigint(20) NULL COMMENT '聊天对象用户账号',
`fri_content` varchar(255) NULL COMMENT '聊天好友发送消息内容',
`user_Time` datetime NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '主用户发送消息时间',
`fri_Time` datetime NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '聊天对象发送消息时间',
`remark1` varchar(300) NULL COMMENT '备份字符串',
`remark11` varchar(300) NULL COMMENT '备份字符串',
`remark2` bigint(20) NULL COMMENT '备份整型',
`remark22` int(20) NULL COMMENT '备份整型',
PRIMARY KEY (`mess_Id`) 
);
-- 插入数据
insert into message(mess_Id,user_Id,user_content,fri_Id,fri_content,user_Time,fri_Time) values (1008612,020003,'hello',020004,'我不好','2019-09-10-19:28','2019-09-10-19-20:32');

CREATE TABLE `friends` (
`user_Id` bigint(20) NOT NULL COMMENT '主用户账号，与base相连',
`fri_Id` bigint(20) NOT NULL COMMENT '好友账号，与用户详情表的账号相关联，与base相连',
`fri_classified` varchar(2) NULL DEFAULT 0 COMMENT '好友分类：0代表好友，1代表关注，2代表黑名单',
`fri_status` int(1) NOT NULL DEFAULT 0 COMMENT '是否是好友：0代表不是，1代表是（双向好友）',
`user_remark` varchar(100) NULL COMMENT '好友备注（主用户对好友的备注）',
`fri_remark` varchar(100) NULL COMMENT '好友备注（好友对主用户的备注）',
`remark1` int(20) NULL,
`remark2` varchar(300) NULL,
`remark11` int(20) NULL,
`remark22` varchar(300) NULL,
PRIMARY KEY (`user_Id`,`fri_Id`) 
);
-- 插入数据
insert into friends(user_Id,fri_Id,fri_classified,fri_status,user_remark,fri_remark) values (020003,020004,'1',1,'老高头','老于头');

CREATE TABLE `comments` (
`comm_Id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '这条评论的编号',
`cond_Id` bigint(20) NULL COMMENT '当前动态的ID',
`user_Id` bigint(20) NOT NULL COMMENT '评论人的用户账号',
`content` varchar(255) NOT NULL COMMENT '评论内容',
`comm_Time` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '当前评论时间',
`remark1` int(20) NULL,
`remark2` varchar(300) NULL,
`remark11` int(20) NULL,
`remark22` varchar(300) NULL,
PRIMARY KEY (`comm_Id`) 
);
-- 插入数据
insert into comments(comm_Id,cond_Id,user_Id,content,comm_Time) values(3838438,120,020004,'买了否冷','2019-09-10-21:38');


CREATE TABLE `replys` (
`Id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '评论回复',
`comm_Id` bigint(20) NOT NULL COMMENT '评论表的Id',
`reply_Id` bigint(20) NULL COMMENT '回复目标ID（本表中的ID）',
`from_Uid` bigint(20) NOT NULL COMMENT '回复人账号',
`to_Uid` bigint(20) NOT NULL COMMENT '目标用户',
`reply_Content` varchar(255) NOT NULL COMMENT '回复内容',
`reply_Time` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '回复评论时间',
`reply_type` int(1) NULL COMMENT '回复类型：1回复的代表评论表，0代表回复的本表',
`remark1` int(20) NULL,
`remark2` varchar(300) NULL,
`remark11` int(20) NULL,
`remark22` varchar(300) NULL,
PRIMARY KEY (`Id`) 
);
-- 插入数据
insert into replys(Id,comm_Id,from_Uid,to_Uid,reply_Content,reply_Time,reply_type) values (4,3838438,020005,020004,'Why','2019-09-10-20:01',1);
insert into replys(Id,comm_Id,reply_Id,from_Uid,to_Uid,reply_Content,reply_Time,reply_type) values (5,3838438,4,020004,020005,'Ok','2019-09-10-20:02',0);
insert into replys(Id,comm_Id,from_Uid,to_Uid,reply_Content,reply_Time,reply_type) values (6,3838438,020003,020004,'Why','2019-09-10-20:09',1);

CREATE TABLE `conditions` (
`con_Id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '动态ID',
`con_words` varchar(500) NULL COMMENT '动态文字',
`con_pic_1` varchar(255) NULL COMMENT '动态图片1',
`con_pic_2` varchar(255) NULL COMMENT '动态图片2',
`con_pic_3` varchar(255) NULL COMMENT '动态图片3',
`con_pic_4` varchar(255) NULL COMMENT '动态图片4',
`con_user_Id` int(20) NULL COMMENT '发布动态人的用户账号',
`see` int(10) NOT NULL DEFAULT 0 COMMENT '浏览量',
`con_time` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '动态发布时间',
`remark1` int(20) NULL,
`remark2` varchar(300) NULL,
`remark11` int(20) NULL,
`remark22` varchar(300) NULL,
PRIMARY KEY (`con_Id`) 
); 
-- 插入数据
insert into conditions(con_Id,con_words,con_time,con_user_Id) values (120,'你怎么这样子啊','2019-09-10-02:09',020003);

CREATE TABLE `attention` (
`Id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '关注ID',
`user_Id` bigint(20) NULL COMMENT '用户的账号',
`att_Id` bigint(20) NULL COMMENT '用户关注的账号',
`remark1` int(20) NULL,
`remark2` varchar(300) NULL,
`remark11` int(20) NULL,
`remark22` varchar(300) NULL,
PRIMARY KEY (`Id`) 
);
-- 插入数据
insert into attention(Id,user_Id,att_Id) values (4396,020003,020004);

CREATE TABLE `approve` (
`condition_Id` bigint(20) NOT NULL COMMENT '点赞对应的动态编号',
`user_Id` int(20) NOT NULL COMMENT '点赞用户账号，与用户基本信息表的账号一致',
`approve_status` int(1) NULL DEFAULT 0 COMMENT '点赞状态：0取消点赞，1点赞',
`remark1` int(20) NULL,
`remark2` varchar(300) NULL,
`remark11` int(20) NULL,
`remark22` varchar(300) NULL,
PRIMARY KEY (`condition_Id`, `user_Id`) 
);
-- 插入数据
insert into approve(condition_Id,user_Id,approve_status) values (120,020004,1);

CREATE TABLE `have_props` (
`Id` bigint(20) NOT NULL AUTO_INCREMENT,
`owners` bigint(20) NOT NULL COMMENT '用户拥有账号，与base相连',
`props_Id` bigint(20) NULL COMMENT '道具编号，与props相连',
`number` int(100) NULL COMMENT '拥有的道具数',
`have_Time` datetime NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '购买时间',
`remark1` int(20) NULL,
`remark2` varchar(300) NULL,
`remark11` int(20) NULL,
`remark22` varchar(300) NULL,
PRIMARY KEY (`Id`) 
);
-- 插入数据
insert into have_props(owners,props_Id,number,have_Time) values (020003,10121,10,'2019-09-10-17:35');

CREATE TABLE `sweet` (
`user_Id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主用户的账号',
`obj_Id` bigint(20) NOT NULL COMMENT '亲密对象的账号',
`sweet_score` int(10) NULL COMMENT '亲密度值',
`sweetState` int(1) NOT NULL DEFAULT 0 COMMENT '状态：0代表单身，1代表恋人',
`remark1` int(20) NULL,
`remark2` varchar(300) NULL,
`remark11` int(20) NULL,
`remark22` varchar(300) NULL,
PRIMARY KEY (`user_Id`,`obj_Id`) 
);
-- 插入数据
insert into sweet(user_Id,obj_Id,sweet_score) values (020003,020004,38);

insert into sweet(user_Id,obj_Id,sweet_score) values (020004,020003,38);


CREATE TABLE `gift` (
`Id` int(20) NOT NULL,
`from_Id` bigint(20) NULL COMMENT '送道具用户的Id',
`to_Id` bigint(20) NULL COMMENT '收道具的用户的Id',
`gift` bigint(20) NULL COMMENT '送的道具编号',
`giftNum` bigint(20) NULL COMMENT '送道具的数量',
`remark1` int(20) NULL,
`remark2` varchar(300) NULL,
`remark11` int(20) NULL,
`remark22` varchar(300) NULL,
PRIMARY KEY (`Id`) 
);
-- 插入数据
insert into gift
(Id,from_Id,to_Id,gift,giftNum)
values (3333,020003,020004,10121,2);

-- 邓颖创建搜索视图
select nickName,headPic
from base_info;

create view commUser
as
select base_info_Id,nickName,headPic
from base_info ;

select *
from commUser;

create view seniorUser
as
select base_info_Id,nickName,headPic,sex,age,marriage
from base_info ;

create view masterUser
as
select base_info_Id,nickName,headPic,sex,age,marriage,height,weight,province,city,location_detail,education,salary,house,car,blight
from base_info ;


insert into base_info(telephone,pwd) values (18862600063,'523142');


-- 主页视图
-- 显示头像/昵称/性别/爱情宣言/会员等级
select base_info_Id 用户账号,nickName,headPic,sex,love_description,member_grade 会员等级
from base_info,memberinfos
where base_info_Id = member_user_Id and base_info_Id = 20004;
-- 显示关注数量
select count(1) 我关注的数量 from attention where user_Id = 20003;

-- 显示动态
-- 没有评论的动态
select base_info_Id 用户账号,conditions.con_Id,conditions.con_words,con_pic_1,con_pic_2,con_pic_3,con_pic_4
from conditions,base_info
where conditions.con_user_Id = base_info_Id and base_info_Id = 20003;
-- 点赞，某个用户动态的点赞数
select conditions.*,count(1)
from approve,base_info,conditions;
-- where approve.condition_Id =

select con_user_Id,con_words,con_pic_1,con_pic_2,con_pic_3,con_pic_4,con_time,see
from conditions
where con_user_Id = 20003 ;



select base_info_Id,nickName,sex,age,telephone from base_info where base_info.telephone =  18273473907;


select member_grade 会员等级 from memberinfos where member_user_Id = 20018;

select base_info_Id 用户账号,nickName,headPic,sex,love_description from base_info where base_info_Id = 20018;

create view approves
as
select condition_Id,count(1) approveNum,user_Id
from approve
where approve_status = 1
group by condition_Id;

create view con_app
as
select con_Id,con_user_Id,con_words,con_pic_1,con_pic_2,con_pic_3,con_pic_4,con_time,see,approveNum from conditions left join approves on con_Id = condition_Id ;

select * from con_app where con_user_Id = 20018;



select count(1) approveNum from conditions,approve where con_Id = condition_Id and con_Id = 121;

select member_grade from memberinfos where member_user_Id = 20014;

select sweet_score from sweet where user_Id = 20014 and obj_Id = 20003;

-- 宋佳镱视图 

-- 狂热榜
create view crazyRank
as
select DISTINCT(base_info.base_info_Id) 用户ID,headPic 用户头像,nickName 昵称 
from base_info,sweet 
where base_info.base_info_Id = sweet.user_Id and sweetState=0 
order by sweet_score DESC ;
-- 魅力榜
create view beautRank
as
select  DISTINCT(base_info.base_info_Id) 用户ID,headPic 用户头像,nickName 昵称 
from base_info,sweet 
where base_info.base_info_Id = sweet.obj_Id and sweetState=0 
order by sweet_score DESC ;
-- 比翼榜
create view sweetRank
as
select c.情侣1,d.情侣1头像,c.情侣2,d.情侣2头像,积分 from
  (select a.user_Id 情侣1,a.obj_Id 情侣2,(a.sweet_score+b.sweet_score) 积分
   from sweet a join sweet b 
   on a.user_Id = b.obj_Id
   where a.sweetState = 1 and b.sweetState=1
   GROUP BY (a.sweet_score+b.sweet_score) 
	 ORDER BY (a.sweet_score+b.sweet_score) DESC)as c,
  (select pic1.user_Id qinglv1,情侣1头像,pic2.obj_Id,情侣2头像 from
    (select user_Id,headPic 情侣1头像,obj_Id
     from base_info,sweet 
     where user_id = base_info_Id) as pic1,
    (select user_Id,headPic 情侣2头像,obj_Id 
     from base_info,sweet 
     where obj_Id = base_info_Id) as pic2
   where pic1.user_Id = pic2.user_Id) as d
where c.情侣1 = d.qinglv1;
-- 动态表
create view cond
as
select conditions.con_Id,con_user_Id,con_words,con_pic_1,con_pic_2,con_pic_3,con_pic_4,approvenum, conditions.see 
from conditions,
(select IF(approve_status=1,count(approve_status),sum(approve_status))AS approvenum,condition_Id
from approve GROUP BY condition_Id ) as approve1
where conditions.con_Id = approve1.condition_Id
GROUP BY con_Id 
order by conditions.con_Id;
-- select * from cond;
-- 有热度的动态表
create view condhot
as
select con_Id,con_user_Id,con_words,con_pic_1,con_pic_2,con_pic_3,con_pic_4,approvenum,see,sum(approvenum*2 + see)as hot 
from cond GROUP BY con_Id ORDER BY hot desc;
-- 个人背包 
create view backpack
as
select owners,props_Id,prop_Name,sum(number) as num from have_props,props where prop_Id=props_Id GROUP BY owners,props_Id;


drop procedure if exists `pro_friends`; 
create procedure pro_friends(in dId int,in classfied int)
begin
	select fri_Id,user_remark,fri_classified,nickName,headPic
from
(
select fri_Id,user_remark,fri_classified,nickName,headPic
from base_info join (select fri_Id,user_remark,fri_classified from friends where user_Id = dId and fri_status = 1) as newFri1
on base_info_Id = fri_Id 
UNION ALL 
select user_Id,fri_remark,fri_classified,nickName,headPic
from base_info join (select user_Id,fri_remark,fri_classified from friends where fri_Id = dId and fri_status = 1) as newFri2
on base_info_Id = user_Id
) as newFri
where newFri.fri_classified = classfied;
end;

call pro_friends(20015,0);

create event update_date 
    on schedule every 1 day 
    starts timestamp(current_date,'00:00:00')
    do
    update memberinfos set memberinfos.member_act_date = memberinfos.member_act_date+1,memberinfos.member_date = memberinfos.member_date - 1
		where member_status=0;
-- where member_user_Id = 20009;

create event update_member_status
    on schedule every 1 day 
    starts timestamp(current_date,'00:00:05')
    do
		update (select member_user_Id,if(member_date>0,1,0) as compare from memberinfos) as m,memberinfos 
		set member_status=1 where compare = 0 and m.member_user_Id = memberinfos.member_user_Id;
