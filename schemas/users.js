var mongoose = require("mongoose");

// 用户的表结构
// module.exports = new mongoose.Schema({
// 	// 用户名
// 	username：String,
// 	// 密码
// 	password: String
// });
 var Schema = mongoose.Schema; 
 var User = new Schema({ 
 	//用户名
 	username: String, 
 	//密码
 	password: String,
 	//是否为管理员
 	isAdmin:{
 		type: Boolean,
 		default: false
 	}
 }); 
 module.exports = User;