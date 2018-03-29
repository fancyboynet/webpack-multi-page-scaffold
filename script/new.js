const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

let pages = path.join(__dirname, '../page')
let page = process.argv.slice(2)[0]
if (!page) {
  console.log(chalk.red('请输入页面名称 $ npm run new pageName'))
} else {
  let dir = path.join(pages, page)
  if (fs.existsSync(dir)) {
    console.log(chalk.red(`已存在页面${page}`))
  } else {
    let html = `<!doctype html>
<html>
<head>
    <title>Hello</title>
</head>
<body>
</body>
</html>
    `
    fs.mkdirSync(dir)
    fs.writeFileSync(path.join(dir, 'index.js'), '')
    fs.writeFileSync(path.join(dir, 'index.html'), html)
    console.log(chalk.green(`成功创建页面${page}，请重启服务查看`))
  }
}
