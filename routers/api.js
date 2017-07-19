var express = require("express");
var router = express.Router();
//User返回的是一个构造函数,该构造函数底下有很多的方法，有静态方法与对象方法，通过这些方法可以去操作数据库
var User = require('../models/User');
var Content = require('../models/Content');
//统一返回格式,不管以一个什么样子进行，进行一个简单的初始化，code是0无错误，message时返回的错误信息
var  responseData;
router.use(function(req,res,next){
	responseData = {
		code: 0,
		message:''
	}
	next();
});
/*
用户注册
用户注册逻辑判断----就是多少个字符，不能为空，字符用什么格式，奇数偶数等等进行判断，还有用户名是否已经被注册，查询数据库才可以判断
	1.用户名不能为空
	2.密码不能为空
	3.两次输入密码必须一致

	1.用户名是否已经被注册
	   数据库查询
*/
router.post('/user/register',function(req,res,next){
	var username = req.body.username;
	var password = req.body.password;
	var repassword = req.body.repassword;

	//用户名是否为空
	if(username == ''){
		responseData.code = 1;
		responseData.message = '用户名不能为空';
		res.json(responseData);
		return;//一旦出现错误，终止代码的执行
	}
	//密码不能为空
	if(password == ''){
		responseData.code = 2;
		responseData.message = '密码不能为空';
		res.json(responseData);
		return;
	}
    //两次密码不能不相同
    if(password != repassword){
    	responseData.code = 3;
    	responseData.message = '两次输入的密码不一致';
    	res.json(responseData);
    	return;
    }
    
    //用户名是否已经被注册，如果数据库中已经存在和我们的注册用户名同名的数据，表示该用户名已经被注册
    User.findOne({
        username:username
    }).then(function(userInfo){
       if(userInfo){
       	   //表示数据库中有该记录
       	   responseData.code = 4;
       	   responseData.message = '用户名已经被注册';
       	   res.json(responseData);
       	   return;
       }
	    //保存用户注册的信息到数据库中
	    var user = new User({
	    	username: username,
	    	password: password
	    });
        return user.save();
        // req.cookies.set('userInfo',JSON.stringify({
        // 	_id: userInfo._id,
        //     username: userInfo.username
        // }));

    }).then(function(newUserInfo){//当用户的数据信息没有被注册，要保存到数据库中，首先进行一个return，然后到newUserInfo中去，进行保存
        console.log(newUserInfo);    
    	responseData.message = '注册成功';
    	res.json(responseData);
    });

});

/*
登录
*/

router.post('/user/login',function(req,res){
    var username = req.body.username;
    var password = req.body.password;

    if(username == '' || password == ''){
    	responseData.code = 1;
    	responseData.message = '用户名和密码不能为空';
    	res.json(responseData);
    	return;
    }

    //通过数据库查询密码和相同用户名是否在存在，如果存在登陆成功
    User.findOne({
    	username: username,
    	password: password
    }).then(function(userInfo){
        if(!userInfo){
        	//表示没有该记录
        	responseData.code = 2;
        	responseData.message = '用户名和密码错误';
        	res.json(responseData);
        	return;
        }
        //用户名和密码是正确的
        responseData.message = '登录成功';
        responseData.userInfo={
            _id: userInfo._id,
            username: userInfo.username
        };
        //发送一个cookie给浏览器，浏览器得到这个cookies之后，会保存起来，以后，每一次只要访问站点，会以头信息的方式发送给服务器，服务器会根据这个头信息验证是否为登录状态
        req.cookies.set('userInfo',JSON.stringify({
        	_id: userInfo._id,
            username: userInfo.username
        }));
        res.json(responseData);
        return;
    })  
});


//退出
router.get('/user/logout',function(req,res){
	req.cookies.set('userInfo',null);
	res.json(responseData);
});
//获取文章的所有评论

router.get('/comments', function(req, res) {
    var contentId = req.query.contentid || '';

    Content.findOne({
        _id: contentId
    }).then(function(content) {
        responseData.data = content.comments;
        res.json(responseData);
    })
});
//评论提交
router.post('/comments/post',function(req,res){
    var contentId = req.body.contentid || '';
    var postData = {
        username: req.userInfo.username,
        postTime: new Date(),
        content: req.body.content
    };
    //查询当前这篇文章内容的信息
    Content.findOne({
        _id: contentId
    }).then(function(content){
        content.comments.push(postData);
        return content.save();
    }).then(function(newContent){
        responseData.message = '评论成功';
        responseData.data = newContent;
        res.json(responseData);
    });
});
module.exports = router;
