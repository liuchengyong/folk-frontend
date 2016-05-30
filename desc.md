### 项目简介
***

这是一个使用ractjs开发的前端项目，这个项目主要是解决协助app解决微信分享的内容，
相当于在微信内出一套app的实现。另外实现还包括了指点主页，网页注册点师等等。

### 项目环境
***
1. 生产环境： www.zhid58.com/		
2. 测试环境： wetest.zhid58.com/		
3. 开发环境： localhost：80/

### 项目结构
－cfg: webpack的配置文件		
－node_modules: 项目的依赖文件		
－deploy.sh: 生产环境的部署脚本		
－update.sh: 项目编译脚本		
－server.js: webpack－dev－server的入口		
－webpack.config.js: webpack配置文件的入口		
－desc.md: 项目说明文档		
－index-tmp.ejs: index.html模版		
－src：项目源代码		

###### 源代码结构
－index.js reactjs的入口文件		
－actions: 项目的所有请求		
－common: 公用js方法		
－components: 所有的组件		
－config：项目的常量		
－container：所有页面的容器		
－reducers：reactjs状态管理		
－styles：样式
－images：图片

### 项目的部署
开发环境：npm run start		
测试环境：			
	1. 提交代码到gitlab 自动部署		
生产环境：（确定测试环境没有问题）		
	1. 更改项目版本号	
	2. 提交项目到gitlab		
	3. 本地运行deploy.sh脚本 （bash deploy.sh）		


### 项目内容列表()
***
1. 微信项目
	- activity 活动专场
	- broke 爆料详情
	- college 学校详情
	- consultation 资讯详情
	- dynamic 动态详情
	- expert 个人主页
	- found 名校列表
	- home 未知
	- topic 话题详情
	- applyExpert  网页版注册成为点师
	- register 注册页面
	- login 登录页面
	
	

2. sada
