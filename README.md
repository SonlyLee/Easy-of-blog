![](http://i.imgur.com/SdxR7FL.jpg)

# 这是一个利用*Node.js+express+mongoDB+swig模板+BootStrap*搭建的一个博客

##### 该BLOG具有浏览信息，分类信息，用户登录，用户注册，管理员登录注册，添加内容的分类，修改内容分类，删除类容分类，添加内容，修改内容，删除内容，显示内容分类，显示内容，评论分页等功能。

# 如何使用
- clone该项目到本地
git clone h

首先，在PC端，要有node的环境，如果没有，参考[http://nodejs.cn/](http://nodejs.cn/)下载安装.如果没有mongoDB,参考[https://www.mongodb.com/cn](https://www.mongodb.com/cn)，下载安装，个人推荐mongoDB视图化工局，参考[https://robomongo.org/](https://robomongo.org/)下载安装。然后，需要按照package.json的内容要求进行安装,操作命令npm i 即可安装所要求的第三方模块以及中间件.需要在当前文件夹下面建立一个db文件夹，就是数据库存放文件，在命令行中运行mongd --dbpath=url --port=27018,url是在该项目中db的目录地址，例如:mongod --dbpath=C:\Users\lenovo\Desktop\Blog\db --port=27018,由于我自己把文件放在了桌面，所以就是url是C:\Users\lenovo\Desktop\Blog\db。然后再启动另一个命令行窗口，运行命令node app.js, app.js是入口文件，只运行这个就可以，在浏览器窗口输入localhost:8081就可以看到我们的博客网页了。在这个工程中，可能会出现一些安装失败等等问题，可能是由于版本问题导致的。

在可视化工具中，在User里面创建一个管理员用户，就是本人，账户密码自行设置，但是isAdmin设置为true。这样子，在页面中登录后，就可以进行页面的后台管理了，例如发表文章，增啊分类等等，而其他普通用户只能是浏览，并且参与评论等。
