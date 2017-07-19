var mongoose = require("mongoose");
var usersSchema = require("./../schemas/users");

// 创建好数据表结构后，需要在models模型中对表结构对象进行增删改查，然后进行对users创建一个模型
module.exports = mongoose.model("User",usersSchema);