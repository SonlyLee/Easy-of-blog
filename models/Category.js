var mongoose = require("mongoose");
var categoriesSchema = require("./../schemas/categories");

// 创建好数据表结构后，需要在models模型中对表结构对象进行增删改查，然后进行对users创建一个模型
module.exports = mongoose.model("Category",categoriesSchema);