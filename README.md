![](http://i.imgur.com/SdxR7FL.jpg)

# 这是一个利用*Node.js+express+mongoDB+swig模板+BootStrap*搭建的一个博客

##### 该BLOG具有浏览信息，分类信息，用户登录，用户注册，管理员登录注册，添加内容的分类，修改内容分类，删除类容分类，添加内容，修改内容，删除内容，显示内容分类，显示内容，评论分页等功能。

# 如何使用
- clone该项目到本地


  git clone https://github.com/SonlyLee/Easy-of-blog.git
- 安装所需要的第三方库和中间件


  npm install或npm i
- 启动项目


  node app.js
- 查看效果


  在浏览器输入localhost:8081

# 需要重点说明
- npm是node的包管理工具，要使用npm命令要下载node.js，可在[http://nodejs.cn/](http://nodejs.cn/)下载安装
- mongoDB可在[https://www.mongodb.com/cn](https://www.mongodb.com/cn)下载安装
- 个人推荐mongoDB视图化工局，参考[https://robomongo.org/](https://robomongo.org/)下载安装
- 要在当前文件夹下面建立一个db文件夹，就是数据库存放文件，在命令行中运行mongd --dbpath=url --port=27018,url是在该项目中db的目录地址，例如:mongod --   dbpath=C:\Users\lenovo\Desktop\Blog\db --port=27018,由于我自己把文件放在了桌面，所以就是url是C:\Users\lenovo\Desktop\Blog\db。


在可视化工具中，在User里面创建一个管理员用户，就是本人，账户密码自行设置，但是isAdmin设置为true。这样子，在页面中登录后，就可以进行页面的后台管理了，例如发表文章，增啊分类等等，而其他普通用户只能是浏览，并且参与评论等。
