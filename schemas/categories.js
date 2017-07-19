var mongoose = require("mongoose");

 var Schema = mongoose.Schema; 
 var Categories = new Schema({ 
 	//分类的名称
 	name: String
 }); 
 module.exports = Categories;