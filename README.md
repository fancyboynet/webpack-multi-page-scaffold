# 基于webpack纯静态多页面解决方案
框架主要实现前端开发中最常用的基础功能，方便扩展。
和[fis推荐目录](https://github.com/fex-team/fis3-solutions/blob/master/intro.md#目录规范-1)不同的是，这里没有规定具体的widget目录，只约定主要的page目录。

## 参考
1. [fis3](http://fex-team.github.io/fis3/index.html)
2. [基于fis3的PC端纯静态解决方案](https://github.com/fancyboynet/fis3-www-demo)

## 实现的功能
1. 自动刷新
2. 数据模拟
3. es6/7语法
4. css-loader
5. file-loader

## todo (欢迎pr)
1. 单元测试

### 目录

```
├── assert // 公共资源目录
│   └── font
│
├── script // npm 脚本
│   └── new.js
│
├── config // 配置
│   ├── webpack.prod.js
│   ├── webpack.dev.js
│   └── webpack.common.js
│
├── mock // 数据模拟
│   └── router.js
│
├── page // 页面目录
│   ├── app
│   │    ├── index.html
│   │    ├── index.js
│   │    ├── style.css
│   │    └── ...
│   ├── home
│
├── test // 测试
│
├── output // 构建目录
│   ├── app.html
│   ├── home.html
│   ├── runtime.bundle.js
│   └── ...
│
├── node_modules // 生态
│
├── anything // 根据项目特征创建

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
请求
```js
axios.get('/data').then(data => {
  console.log(data)
})
```

## 单页应用
1. Vue.js 请切换到vue分支