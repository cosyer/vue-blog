
# vue + iview + node + mysql博客

### 前言
项目总体结构就是一个响应式的架构，前台`vue`，`ui`库使用`iview`，后台`nodejs`、数据库`mysql`，可适配多端：`PC`，`移动端`。带后台管理系统，支持：登陆/注册，留言，评论/回复，点赞，记录浏览数
量，带有相册功能，内容丰富，当然也可以发表文章。

#### 项目地址
[cosyer's blog](http://blog.mydearest.cn)

[Many-people-blog](https://github.com/Acmenlei/Many-people-blog)

[codelei](http://codelei.cn/home)

#### 一、首页功能

> 首页使用简约式架构，看上去非常的简约，出场动画是一个移动效果，使用媒体查询对网站大小的不同给出不同的背景，个人觉得还是挺养眼的，不会那么花里胡哨，里面结合了我觉得比较好看的一些`demo`和`c3`动画元素，我把首页图放在下面了：

`lg`尺寸显示的背景：（PC端）
![博客首页](）

`md`尺寸显示的背景：（手机端）

![博客首页]()

#### 二、 文章列表结构

> 使用响应式布局，lg尺寸的话左边显示文章，右边有最近文章。音乐播放器，文章页做的不是很漂亮，看看效果图吧：

![文章列表]()

#### 三、 文章详情页

> 详情页的文章支持`markdown`语法解析，使用了`highlight`进行解析，个人觉得这个插件在使用过程还是有些问题，最大的痛点就是不支持代码块的行号显示， 文章支持分享，与用户评论回复，毕竟是多人博客嘛，这都是必须的。后续会继续完善，有更好建议的朋友欢迎来讨论，虚心接受。下面上图：

![详情页]()

#### 四、 博客留言板

> 留言板的话我封装成了一个组件，因为在文章的评论中也使用到了一样的模板，封装的文件为`replyOrpublish`下的同名文件，详细的话可以看`props`参数,主要就是传入不同的后台地址。下面上效果图：

![博客留言板]()

- 挑选了一些比较常用的模块来展示，还有那么多内容就不多介绍了，感兴趣的朋友可以下载自己详细的去琢磨，觉得好用的话请给一个`star`，谢谢啦笔芯~♥
- 欢迎你们来博客玩耍~

#### 1. 依赖安装

```
npm install
```

#### 2. 项目启动

```
npm run serve
```

#### 3. 项目打包

```
npm run build
```

#### 后台管理页面 /admin/login 
需要管理员账号登录，给`admin`表加数据。

- 本地开发 
1. 前端服务: localhost:8080
后端服务: localhost:3000 
切换开发模式 server/config

2. 也可以build后放到public文件夹访问localhost:3000

- 服务端部署
替换localhost:3000 => ip:3000/域名

