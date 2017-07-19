var mongoose = require("mongoose");

 var Schema = mongoose.Schema; 
 var Contents = new Schema({ 
 	//关联字段，这个和其他的表结构相关联，会引用其他的字段  分类的信息
 	category: {
       //类型
       type: Schema.Types.ObjectId,
       //引用
       ref: 'Category'
 	},
 	//内容标题
 	title: String,
  //用户
  user: {
        //类型
        type: Schema.Types.ObjectId,
        //引用
        ref: 'User'
    },
  //时间
  addTime:{
    type: Date,
    default: new Date()
  },
  //阅读量
  view:{
    type: Number,
    default: 0
  },
    //简介
  description:{
    type: String,
    default:''
  },
  //内容
   content: {
        type: String,
        default: ''
  },
  //评论
  comments:{
    type:Array,
    default:[]
  }
}); 
 module.exports = Contents;