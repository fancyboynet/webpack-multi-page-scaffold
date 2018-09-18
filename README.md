# 基于webpack纯静态多页面解决方案
框架主要实现前端开发中最常用的基础功能，方便扩展。
和[fis推荐目录](https://github.com/fex-team/fis3-solutions/blob/master/intro.md#目录规范-1)不同的是，这里没有规定具体的widget目录，只约定主要的page目录。

## 参考
1. [fis3](http://fex-team.github.io/fis3/index.html)
1. [基于fis3的PC端纯静态解决方案](https://github.com/fancyboynet/fis3-www-demo)

## 特征
1. 热更新
1. 数据模拟
1. 多页可配置(例如只够建20个页面中的某3个页面)
1. [standard.js](https://standardjs.com/)语法检查


## todo (欢迎pr)
1. 单元测试
### 目录

```
├── src // 源码目录
│       │
│       ├── page // 页面目录
│       │       ├── app
│       │       │       ├── index.html
│       │       │       ├── index.js
│       │       │       ├── style.css
│       │       │       └── ...
│       │       ├── home
│       │       
│       ├── assets // 公共资源目录
│       │       └── font
│       │
│       ├── model // model层
│       │
│       ├── store // 数据管理层
│       │
│       ├── anything // 根据项目特征创建
│
│
├── dist // 构建目录
│       ├── app.html
│       ├── home.html
│       ├── runtime.bundle.js
│       └── ...
│
│     
├── script // npm 脚本
│       └── newpage.js
│
├── config // 配置
│       ├── build.json 
│       ├── webpack.prod.js
│       ├── webpack.dev.js
│       └── webpack.common.js
│
├── mock // 数据模拟
│       └── router.js
│
├── static // 非模块目录，会直接拷贝
│
├── test // 测试
│
├── node_modules // 生态
│


```
## 安装

```
$ npm install
    
```

## 开发/调试
```$xslt
$ npm run start
$ open http://localhost:8081/app.html
```

## 构建
```$xslt
$ npm run build
```

## 创建新页面
```$xslt
$ npm run new pageName
```

## 相对源码根目录引入模块
目前默认把源码根目录(src)加入到模块搜寻目录中
`webpack.common.js`
```js
{
  resolve: {
      modules: [srcRoot, "node_modules"]
    }
}

```
```js
import moduleA from 'widget/a'
import moduleB from 'widget/b'
```

## 数据模拟
`mock/router.js`下定义数据接口
```js
module.exports = function (app) {
  app.get('/data', function (req, res) {
    res.json({
      'data': 'hello webpack'
    })
  })
}
```
代理其他数据接口
```js
const request = require('request')
module.exports = function (app) {
  app.use('/api/', function(req, res) {
    let url = `http://localhost:3000/api${req.url}`
    req.pipe(request(url)).pipe(res)
  })
}

```
请求
```js
axios.get('/data').then(data => {
  console.log(data)
})
```

## 构建配置
```
{
  "outputName": "dist",
  "staticName": "static",
  "templateName": "",
  "publicPath": "/",
  "includePage": [],
  "host": "localhost",
  "port": 8081,
  "openStandardJs": true,
  "pageTemplateWithoutHtmlLoader": false,
  ...
}
```
[完成配置](./config/build.json)

### pageTemplateWithoutHtmlLoader
有时候我们想在编译阶段往页面模板传变量，[html-webpack-plugin已经支持](pageTemplateWithoutHtmlLoader)，但是由于默认所有`.html`文件
都会再被`html-loader`编译一次，而`html-loader`是会忽略`html-webpack-plugin`定义的变量的，所以增加了这个配置来
满足一些特殊需求

### 6