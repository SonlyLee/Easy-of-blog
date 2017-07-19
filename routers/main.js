var express = require('express');
var router = express.Router();
var Category = require('../models/Category');
var Content = require('../models/Content');
var data;
router.use(function(req,res,next){
	data = {
		userInfo: req.userInfo, //在模板中就可以使用userInfo
		categories: [] //分类信息数组
	};
	Category.find().then(function(categories){
		data.categories = categories;
		next();
	});
});

router.get('/',function(req,res,next){
	data.page = Number(req.query.page || 1);
	data.limit = 10;
	data.pages = 0;
	data.category = req.query.category || ''; //分类信息的点击
	data.count = 0;
	var where = {};
	if(data.category){
		where.category = data.category;   //只要传过分类ID
	}
	Content.where(where).count().then(function(count){
		data.count = count;
		data.pages = Math.ceil(data.count /data.limit);
        //取值不能大于总页数
        data.page = Math.min(data.page,data.pages);
        //取值不能小于1
        data.page = Math.max(data.page,1);
        var skip = (data.page - 1)*data.limit;
        return Content.where(where).find().sort({addTime: -1}).limit(data.limit).skip(skip).populate(['category', 'user']);
	}).then(function(contents){   //contents就是内容的一些东西，然后必须要通过contents.sth引用，而上面的数据就可以直接在页面中写
		data.contents = contents;
		console.log(data);
	   	res.render("main/index",data);
	});
});
router.get('/view',function(req,res){
	var contentId = req.query.contentid || '';
	Content.findOne({
		_id: contentId
	}).then(function(content){
        data.content = content;
        content.view++;
        content.save();
        res.render('main/view',data);
	})
});
module.exports = router;