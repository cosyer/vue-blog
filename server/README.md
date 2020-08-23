#### 说一下主要的几个目录

`mysql表结构`中的`sql`直接在客户端进行导入就行了。

`routes`为接口路由文件，可以不做修改。

`sendmailer`为注册账号时候发送验证码的脚本。（需要在里面进行修改发送者以及stmp密钥）。

差不多了主要的文件就这么几个

#### 1. 安装依赖

```js
npm install // 安装后台依赖
```

#### 2.启动服务

```js
node ./bin/www
```

也可以安装`nodemon`来启动项目，后台的热更新，本地开发推荐使用此方法。

##### 2.1 nodemon的安装

```js
npm install -g nodemon
```

##### 2.2 使用nodemon启动项目

```js
nodemon ./bin/www
```

想看接口地址的话具体看`app.js `和路由文件

over~ 

