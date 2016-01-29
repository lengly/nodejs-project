# 使用Redis搭建漂流瓶服务器

### 版本
**Node.js**: 0.10.32<br>
**Redis**: 2.4.2<br>
**Mongoose**: 4.3.7

本章使用了Redis + MongoDB搭建了一个漂流瓶服务器，最终通过Heroku + MongoLab + Redis4You的组合发布到了网上。
由于Redis4You提供的免费服务**有效期仅一个月**，所以线上网址仅在**2016.1.28 ~ 2016.2.28**期间可以访问。

### 目录
 - 初识Redis
 - 开始漂流瓶之旅
 - 讨厌的海星
 - 扔回海里
 - 今天的瓶子已经用完啦
 - 我的瓶子
 - 女神，我们做朋友吧
 - 部署
 
### 接口说明
- 网址
 - https://lengly-drifter.herokuapp.com/
- 扔一个漂流瓶
 - POST owner=xxx&type=xxx&content=xxx[&time=xxx]
- 捡一个漂流瓶
 - GET /?user=xxx[&type=xxx]
- 扔回海里一个漂流瓶
 - POST owner=xxx&type=xxx&content=xxx&time=xxx
- 获取一个用户所有的漂流瓶
 - GET /user/lengly
- 获取指定id的漂流瓶
 - GET /bottle/529a8b5b39242c82417b3c3
- 回复特定id的漂流瓶
 - POST user=xxx&content=xxx[&time=xxx]
- 删除特定id的漂流瓶
 - GET /delete/56aa18d2318a01bf59fe0d16

### 说明
- 现在的代码是部署后的代码，所以无法本地运行，如果想本地运行，需要将"3.8 部署Heroku+MongoLab+Redis4You"这个commit中的修改还原回去
- 由于搭建的仅是一个服务器，所以如果要使用这些功能要自己发送请求。例如使用Chrome的Postman
- 举个例子
 - 线上查看lengly的所有漂流瓶:
https://lengly-drifter.herokuapp.com/user/lengly
 - 线下:
http://localhost:3000/?user=lengly

 对于一些post的方法要记得附带参数
- 本章节代码 **非原创**，但是做的过程中发现原书代码有一些问题，修改后并记录在[我的博客][1]中

### 参考
- 原作者nswbmw的项目地址: [N-drifter][2]


  [1]: http://lengly.top/?p=233
  [2]: https://github.com/nswbmw/N-drifter
