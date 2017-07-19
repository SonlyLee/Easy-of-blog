// 应用程序的启动文件

// 加载express模块
var express = require("express");

// 加载模板处理模块
var swig = require("swig");

var router = express.Router();

// 加载数据库文件
var mongoose = require("mongoose");

//加载body-parser,用来处理post提交过来的数据
var bodyParser = require('body-parser');

//加载cookies模块
var Cookies = require('cookies');

// 创建app应用 => Node.js Http.createServer();
var app = express();

var User = require('./models/User');

// 设置静态文件托管
// 当用户访问的url以public开始，那么直接返回对应的__dirname+'/public'下的文件
app.use('/public',express.static(__dirname + '/public'));

// 定义当前应用使用的模板引擎
// 第一个参数：模板引擎的名称，同时也是模板文件的后缀，第二个参数表示用于解析处理模板内容的方法
app.engine("html",swig.renderFile);

// 设置模板文件存放的目录,第一个参数必须是views，第二个参数是目录
app.set("views","./views");

// 注册所使用的模板引擎，第一个参数必须是view engine，第二个参数和app.engine这个方法中定义的模板引擎的名称(第一个参数)是一致的
app.set("view engine","html");

// 在开发过程中，需要取消模板缓存
swig.setDefaults({cache:false});



//设置bodyparser
app.use( bodyParser.urlencoded({extended:true}));
//在bodyParser中调用url的这个方法，会自动的在api中的request对象中增加一个属性，这个属性叫body，body里面保存的是post提交的过来的数据，设置一个参数extended

//设置cookie
app.use(function(req,res,next){
    req.cookies = new Cookies(req,res);
    //解析登录用户的cookie信息
    req.userInfo = {};
    if(req.cookies.get('userInfo')){
    	try{
    		req.userInfo = JSON.parse(req.cookies.get('userInfo'));
    		//获取当前登录用户的类型，是否为管理员
    		User.findById(req.userInfo._id).then(function(userInfo){
    			req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
    			next();
    		})
    	}catch(e){next();}
    }else{
    	next();
    }
});

// 根据不同的功能划分模块
app.use('/admin', require('./routers/admin'));
app.use('/api', require('./routers/api'));
app.use('/', require('./routers/main'));

// 监听http请求
mongoose.connect('mongodb://localhost:27018/blog',function(err){
    if(err){
    	console.log("数据库连接失败!");
    }else{
    	console.log("数据库连接成功!");
    	app.listen(8081);
    }
});
