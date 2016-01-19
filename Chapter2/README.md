# 使用Express+MongoDB搭建多人博客番外篇

### 版本
**Node.js**: 0.10.32<br>
**Express**: 4.13.1

本章是在第一章的基础上进行一些扩展和修改，每个小节的都是完全独立的。个人觉得部署到Heroku是最重要的一章，可以把作品免费的发布到线上
另外对于书中提到的MongoDB云平台MongoHQ已经变成收费，所以我使用的是MongoLab

### 目录
 1. 使用Passport
 2. 部署到Heroku
 3. 使用Mongoose
 4. 使用Async
 5. 使用KingEditor

### 说明
- 第六节 **使用Handlebars** 和第七节 **使用Disqus** 代码这里没有
- 第二节部署到Heroku，部署后的网址是http://lengly.herokuapp.com/ 其中也有一些小bug，比如评论为空时会错位，有空的话再去修改
- commit记录是按照以上小节来管理的，所以想要查看某一小节的代码可以直接去看相应的commit
- 本章节代码 **非原创** ，对着书本写这些代码只是以学习为目的，希望在看书的过程中能学到更多，稍微详细一些的学习日志在 [我的博客][1]

  [1]: http://lengly.top/?p=233
